---
layout: post
title: How to put invite codes on business cards
who: delano
---

When I started working on [Stella](/products/stella/) last year, my initial plan was to release it as a for-charge testing service. I figured out a way to put unique invite codes on business cards and about halfway through the project I started handing them out to people I met at meetups and other events. It turned out to be a pretty handy way to punctuate a good conversation. The only problem was that about a month before launch I decided to switch gears and release the project as an open source tool. That was a good lesson learned! Don't give out invite codes until the product is up and running <a href="#[1]">[1]</a>. In any case, I thought I'd share how I created them for anyone else that's interested in doing something similar.

### The Process ###

* Generate the invite codes
* Batch create images
* Print the cards with [Moo](http://moo.com/)

### Generate the Invite Codes ###

I wrote a short Ruby script to generate the invite codes in the format `in-XXXXXX`. I added the `in-` to give them a little context and I chose six characters since it's a good balance between uniqueness (`31^6 = 887,503,681`) and readability. I also removed the potentially ambiguous characters -- i, l, o, 0, and 1 -- which also doubles as a handy quick-check for bogus codes. Here's the script:

{% highlight ruby %}
#!/usr/bin/ruby

# Description: Invite code generator
# Usage: ruby genvites [count] [code length]
# 
# e.g.
#
# $ ruby genvites 6 3
# in-5qgczr
# in-enh4v4
# in-7jjab1

chars = (ARGV.size == 1) ? ARGV[0].to_i : 6
count = (ARGV.size == 2) ? ARGV[1].to_i : 50

def strand(len, str='')
   # An Array with ambiguous characters removed: i, l, o, 0, 1
   chars = [('a'..'z').to_a, ('0'..'9').to_a].flatten - %w[i l o 0 1]
   str << chars[rand(chars.size-1)]
   str.size == len ? str : strand(len, str)
end

count.times do 
  puts "in-#{strand(chars)}"
end
{% endhighlight %}

I created an invite codes file with the following commands:

    $ echo "InviteCode" > invites-2009-05-27.csv
    $ ruby geninvites > invites-2009-05-27.csv

### Batch Creates Images ###

There are several ways to batch create images. I'll give an example using Photoshop and another using a Ruby script.

#### Photoshop ####

**Step 1:** Create a CSV file containing the invite codes. The first line of the file should contain the column names. If you're using the script and commands above then you should have a file with a single column named "InviteCode". However you choose to generate the file, it should look like this:

    InviteCode
    in-92gr41
    in-6imab7
    ...

**Step 2:** Create a new image and add a layer with some text in it. The styling of the text will be used for the invite codes. The dimensions of the image depend on the type of card you want to print. For a business card, I used 1040 by 700 at 300 dpi (see this [discussion on Flickr](http://www.flickr.com/groups/moo/discuss/72157605993507176/)). Check [Moo Help](http://uk.moo.com/en/help/index.php) for information on image sizes for all product types. Of course, you can also style the image however you like (with a background image or colour). 

<a class="graphic" href="http://farm4.static.flickr.com/3330/3569725337_f741cac35f_o.png"><img src="http://farm4.static.flickr.com/3330/3569725337_85832200e2_m.jpg" alt="Photoshop -&gt; Image -&gt; Variables -&gt; Define" border="0" /></a>

**Step 3:** Add a variable for that layer using *Image &gt; Variables &gt; Define*. The name of the variable needs to match the name of the column (i.e. "InviteCode"). 

<a class="graphic" href="http://farm4.static.flickr.com/3613/3569725403_4a78cedb5d_o.png"><img src="http://farm4.static.flickr.com/3613/3569725403_9830816fc9_m.jpg" alt="Photoshop: Define Variables" border="0" /></a>

**Step 4:** Import the CSV file (*Image &gt; Variables &gt; Data Sets* or click "Next" in the *Define* screen). Make sure the two checkboxes are checked ("Use first column" and "Replace existing datasets"). 

<a class="graphic" href="http://farm4.static.flickr.com/3649/3569725463_922facf613_o.png"><img src="http://farm4.static.flickr.com/3649/3569725463_7e6dd9e25e_m.jpg" alt="Photoshop: Import Data" border="0" /></a>

**Step 5:** Generate the unique PSD files with *File &gt; Export &gt; Data Sets as Files*. The default settings should name the files in the format "original-name_invitecode.psd".

<span class="graphic"><img src="http://farm4.static.flickr.com/3323/3569725537_748e2d197d_o.png" alt="Photoshop: Export Files" border="0" /></span>

**Step 6:** Convert the PSD files to JPG with *File &gt; Scripts &gt; Image Processor*. Select the input folder containing the PSD files, JPG encoding, and the quality. 

<a class="graphic" href="http://farm4.static.flickr.com/3593/3569852523_955101ee51_o.png"><img src="http://farm4.static.flickr.com/3593/3569852523_1e6a33da4b_m.jpg" border="0" ></a>




#### Ruby Script ####


<a name="[1]">&nbsp;</a>
\[1\] I kept track of the codes that I gave out so they'll still work when we do release a product. It's kind of annoying to keep a business card around for an indefinite period of time so if you have one (or had one) just send me an email whenever the time comes and we'll figure it out. 
