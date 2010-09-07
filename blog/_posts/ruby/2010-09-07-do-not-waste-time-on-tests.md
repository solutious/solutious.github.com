---
layout: post
title: Don't waste your time writing tests
who: delano
---

I don't enjoy wasted effort. Not many people do. When it comes to testing software, I've often felt like I was wasting my time. And sometimes I was. Not often, but enough that I thought to myself, *there's got to be a better way.*

## Some problems I have with tests and testing ##

* **Writing tests for volatile code doesn't help anyone.** Names are going to change. Entire namespaces will be added or removed. You want to feel free to do make those changes. 

* **Test code looks nothing like the how the code is actually used.** Most test files look like crap. I'm sorry, but it's true. Your code gets intertwined with stuff that has nothing to do with your project. There's also a lot of repetition. 

* **It's difficult to determine whether the time was well spent.** You definitely know when you should have spent more time testing (when something breaks) but it's difficult to know when you've spent too much time. Or just enough. Or in the worst case scenario, you wrote a lot of tests, but not necessarily on the right areas. 

* **Maintaining a test suite is a pain in the junk.** If you're working on a large, well-established project then yeah, you're going to need lots and lots of tests. That's how you institutionalize quality and you probably have enough people to handle the workload. But if you have a small team or a rapidly changing project, that testing suite is going to bog you down.


## My solution: treat tests as sample code ##

It's the most simple solution I can think without going over: write code exactly as it's used in the wild and put the test definitions in comments so they don't get in the way. That way all the code you see is code that could appear IRL. Even in the worst case scenario where I have no way to know whether the time was well spent, *the work doubles as documentation.* That's a huge win.

To get this to work in Ruby, I wrote a library called [Tryouts](http://github.com/delano/tryouts). (Thanks to [Martin Aumont](http://mynyml.com/) and [Alexis Sellier](http://cloudhead.io/) for working on various implementation ideas with me.)

Here's an example:

{% highlight ruby %}
require 'rye'

# Setup
@local_sandbox = File.join(Rye.sysinfo.tmpdir, 'rye-tryouts')
@lbox = Rye::Box.new 'localhost'
Rye::Cmd.add_command :rm


## sandbox should not exist
@lbox.file_exists? @local_sandbox
#=> false

## create sandbox
@lbox.mkdir :p, @local_sandbox
@lbox.file_exists? @local_sandbox
#=> true

## upload file
@lbox.file_upload 'README.rdoc', @local_sandbox
@lbox.file_exists? @local_sandbox
#=> true

## download file
@downloaded_file = File.join(Rye.sysinfo.tmpdir, 'localfile')
@lbox.file_download File.join(@local_sandbox, 'README.rdoc'), @downloaded_file 
@lbox.file_exists? @downloaded_file
#=> true

## download to StringIO
content = @lbox.file_download File.join(@local_sandbox, 'README.rdoc')
content.class
#=> StringIO

## downloaded StringIO matches file content
file = @lbox.file_download File.join(@local_sandbox, 'README.rdoc')
file.rewind
file.read == File.read(File.join(@local_sandbox, 'README.rdoc'))
#=> true

## destroy sandbox
Rye::Cmd.add_command :rm
@lbox.rm :r, :f, @local_sandbox
@lbox.file_exists? @local_sandbox
#=> false


# Teardown
@lbox.rm @downloaded_file
Rye::Cmd.remove_command :rm
{% endhighlight %}
<span class="graphicSubtext">An example of the <a href="http://github.com/delano/tryouts" title="Don't waste your time writing tests">Tryouts</a> test syntax that doubles as sample code. <a href="http://github.com/delano/rye/tree/master/try/" title="Rye: Safe, parallel access to Unix shells from Ruby">More examples</a>.</span>

And yes, it runs:

<span class="graphic" href="/blog/assets/2010-q3/running-tryouts.png"><img src="/blog/assets/2010-q3/running-tryouts.png" alt="Running Tryouts on the command line" border="0" /></span>
<br/>






