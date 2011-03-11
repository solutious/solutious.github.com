---
layout: post
title: Some cool uses of Git-like hashes in Ruby (with Gibbler)
who: delano
---

Cryptographic hashes are pretty cool. They're often used as checksums for large files because they're fast, consistent, and well, secure. A lot of opensource software packages are distributed with the MD5 or SHA1 hash so that you can verify that all the bits are in the correct place (i.e. that the file you downloaded is identical to the one being served). If you've used Mercurial or Git, you've seen them used there too to track commits, objects, and trees. 

Hashes can also be a useful tool in your code and I wrote [Gibbler](https://github.com/delano/gibbler) to make it easy to do that. Why not use Ruby's `hash` method? Because the return values are inconsistent between runs.

{% highlight ruby %}
t1 = Time.now
t2 = t1.clone
t1.hash                       #=> -2827223250544534006
t2.hash                       #=> -2827223250544534006 (the same!)
t1.object_id                  #=> 2170505820
t2.object_id                  #=> 2170481360

# Later on, with another instance of Ruby
t1 = Time.now
t1.hash                       #=> 2265941047042223117 (different!)
t1.object_id                  #=> 2168957700
{% endhighlight %}


But as it turns out, you can do some neat stuff when you can rely on the values between runs, using different versions and implementations of Ruby. I'm going to point a few, but first a quick introduction.

### A quick intro to Gibbler ###

When you require gibbler, you get a `gibbler` method installed into most rudimentary Objects like [String](https://github.com/delano/gibbler/blob/v0.8.9/lib/gibbler.rb#L365), [Symbol](https://github.com/delano/gibbler/blob/v0.8.9/lib/gibbler.rb#L365), [Hash](https://github.com/delano/gibbler/blob/v0.8.9/lib/gibbler.rb#L400), [Array](https://github.com/delano/gibbler/blob/v0.8.9/lib/gibbler.rb#L440), etc. 

{% highlight ruby %}
require 'gibbler'

'tea'.gibbler                 #=> 6ef1ccef723f8f6c048399cfa5f46a781f559137
:tea.gibbler                  #=> 4f7721e1a1e0a02f87b196fd78f94358293793c1
{:count => 100}.gibbler       #=> 19322962506419bd16d9de2ab3d1e5ec0772c4e6
[4, 3, 2, '1'].gibbler        #=> b05b4fada2105f0f9547ae320423deba729abe53
{% endhighlight %}

Gibbler works similarly to Git: for complex objects, it dives depth-first and creates digests for each object and at each level creates a summary digest. The final digest is based on the summaries for each element.

{% highlight ruby %}
[4, 3, 2, 1].gibbler          #=> d1cf67fb93ec51885e7c74e4b3a3d5ef3aad2bf9
[3, 2, 1].gibbler             #=> 18410df1574242b2730144ed483930072e49bd23
[3, [2, 1]].gibbler           #=> a05a76617a3b848060e6e8024e9c38a264dbd31b
[3, [2, [1]]].gibbler         #=> b32e17d4bf10eb7101153703511d08de4509e0ce
{% endhighlight %}

You can also include gibbler in your own objects with `Gibbler::Complex` which will create the hash based on the values of the instance variables:

{% highlight ruby %}
class Email
  include Gibbler::Complex
  attr_accessor :to, :from, :subject, :content
  def initialize *args
    @to, @from, @subject, @content = *args
  end
end

msg1 = Email.new             
msg2 = Email.new 'd@example.com', 't@example.com', 'Hello', 'Long time no see!'

msg1.gibbler                  #=> 2667ed303e2e2cc307d49301acd7575ea3f90f2e
msg2.gibbler                  #=> 328dfe801c2563e31aa9a2b4831fa182f5e41dfd
{% endhighlight %}

By the way, if you prefer literal method names, you can require `gibbler/aliases`.

{% highlight ruby %}
require 'gibbler/aliases'
'tea'.digest                  #=> 6ef1ccef723f8f6c048399cfa5f46a781f559137
{% endhighlight %}


## A few examples of using hashes in your code ##

### Know when a complex object has changed ###

When you store a record to your database, keep track of the latest hash. Later on, you can check that value to determine whether the contents of the object have changed without checking each field individually. You can also use the value of the hash to detect and prevent duplicate content. Here's one example:

{% highlight ruby %}
class Article
  include Gibbler::Complex
  attr_accessor :author, :title, :content, :checksum
  gibbler :author, :title, :content
  def initialize *args
    @author, @title, @content = *args
  end
  def changed?
    @checksum != gibbler
  end
end
article = Article.new 'jodie', 'Chicken Soup', '...'
article.checksum = article.gibbler
article.save

# Later on, in another process... 
article.content << "and it was delicious."
article.changed?              #=> true
{% endhighlight %}

### Detect duplicate messages ###

You don't need to store copies of an object to know if you've seen them before:

{% highlight ruby %}
from = 't@example.com'
seen = []
['cust1@example.com', 'cust2@example.com', 'cust1@example.com'].each do |to|
  msg = Email.new to, from, 'A catchy subject', 'Some interesting content.'
  if seen.member?(msg.gibbler)
    # cust1 has already received that specific email
    next
  end
  seen << msg.gibbler
end
{% endhighlight %}


### Find data without storing an index ###

I use this approach extensively for [Stella](https://www.blamestella.com/) (my web monitoring service). When a customer runs a checkup, it creates a testplan to represent the site and page being tested. I create a new instance of the object every time, but because the digest for a given testplan is always the same I know where the object is stored without looking it up the based on the URI. As well, I include the customer ID in the digest calculation so that a each customer has their own instance of the testplan. You can see an example of that here:

* A testplan created from [my account](https://www.blamestella.com/plan/599070ec766959286b71).
* A testplan created by an [anonymous customer](https://www.blamestella.com/plan/e64fa9d4e3d24ce60440). 

Notice that the list of recent checkups is different for each. I don't need to do anything special for this. It's just a freebie that comes along with using these hashes. 

### Know which local objects to sync remotely ###

If you have data in one location that you need to synchronize remotely (database records, files, etc) you can use the hashes to determine which objects need to be sent over. This is exactly how git determines what it needs to send to or receive from a remote repo. Of course you could simply keep track of the record IDs (in the case of a database) but by using hashes you get duplicate detection for free.


### Maintain an index pointer for an Array without storing the contents ###

This example can seem arcane but I've found it useful on more than one occasion. Let's say you have a list of values and you want to always process them in sequence. And for whatever reason you don't store the values locally but every time you see this array of values you want to continue processing at the appropriate element. 

With hashes it's simple: create an index using the gibbler hash of the array. It will always be the same as long as the values and the order of the values are the same (you could optionally create the hash after sorting the array).

{% highlight ruby %}
indexes = {}
5.times do
  people = %w[dave john candace]  # inside the loop to simulate different arrays
  indexes[people.gibbler] ||= -1
  indexes[people.gibbler] += 1
  indexes[people.gibbler] = 0 if indexes[people.gibbler] >= people.size
  current_idx = indexes[people.gibbler] 
  puts people[ current_idx ]
end
# Output:
# dave
# john
# candace
# dave
# john
{% endhighlight %}


There are many more uses for hashes in your Ruby codes. I'm interested to hear some. Do you implement them in your projects?

## Installing Gibbler ##

    gem install gibbler

* [code](https://github.com/delano/gibbler) at Github
* [gem](https://rubygems.org/gems/gibbler) on Rubyforge
* [documentation](http://goldensword.ca/gibbler/) via RDocs
* [screencast](http://www.rubypulse.com/episode-0.3-gibbler.html) by Alex Peuchert


## Mini-F.A.Q. ##

***Can digests be made unique per application?***

Yep. Set `Gibbler.secret` to anything, preferably something long. 

{% highlight ruby %}
:kimmy.gibbler                #=> 52be7494a602d85ff5d8a8ab4ffe7f1b171587df

Gibbler.secret = '4cea880a75df6c8b1fa2'

:kimmy.gibbler                #=> 0f71d5813687cb07f8b6be5389e636962f49e213
{% endhighlight %}


***What if attributes are added or removed to a field?***

Use the `gibbler` class method to explicitly define the names and order of variables you want to use for the digest.

{% highlight ruby %}
class Email
  include Gibbler::Complex
  gibbler :to, :subject, :content   # only these fields will be considered
end

msg = Email.new 'd@example.com', 't@example.com', 'Hello', 'Long time no see!'
msg.gibbler                   #=> 7f68056cf34cd42cbb3dee1f81535100ae783fe9

msg.from = 't2@example.com'
msg2.gibbler                  #=> 7f68056cf34cd42cbb3dee1f81535100ae783fe9
{% endhighlight %}


