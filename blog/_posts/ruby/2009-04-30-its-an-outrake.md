---
layout: post
title: It's an outrake!
who: delano
---

This is a story about Ruby mixins, Rake, and hell. After releasing <a href="http://github.com/solutious/rudy" title="Rudy: not your grandparents' deployment tool">Rudy</a> 0.6 last week, I started immediately on 0.7. This next version has a rebuilt DSL for the routines configuration, including a new syntax for running shell commands. The new syntax makes it possible to specify shell commands like methods. You can probably see where this is heading. First, a comparison of the old and new syntax:

**Old, 0.6 syntax**
{% highlight ruby %}
routines do
  startup do
    after :root => "mkdir -p /path/2/create"
  end
end
{% endhighlight %}

**New, 0.7 syntax**
{% highlight ruby %}
routines do
  startup do
    after :root do
      mkdir :p, "/path/2/create"
    end
  end
end
{% endhighlight %}

There are several advantages to using the new syntax which I'll cover in a future post. Right now, I'll cut to the hellish chase. 

Both DSLs produce a configuration hash. Nothing else should happen when they're parsed. And nothing else did happen until I tried running the tests with rake. The old syntax was fine, but I was getting some strange errors with the new syntax. Stuff like

    Error in test/10_config/30_machines_test.rb: can't convert Fixnum into String
    /usr/local/lib/ruby/1.9.1/fileutils.rb:1386:in `path'

FileUtils? That's weird, I don't use FileUtils. Or do I?

`rake-0.8.4/lib/rake.rb` includes [FileUtils](http://www.ruby-doc.org/core/classes/FileUtils.html) into the RakeFileUtils module and later includes RakeFileUtils *into the global namespace*. My criminy!

**Offensive ruby code**
{% highlight ruby %}
module RakeFileUtils
  include FileUtils       # Nothing wrong here
end
# ... later on
include RakeFileUtils     # Noooooooo
{% endhighlight %}

That means when I'm running rake the following methods are accessible from everywhere: `cd`, `mkdir`, `touch`, `rm`, ...! The `mkdir` in the DSL was *being executed as it was parsed*. That's insane. Thank the Great Scott I wasn't testing `rm`. 


