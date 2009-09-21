---
layout: post
title: The Secret of Object#to_s
who: delano
---

There's something about Ruby that I've wanted to know for a long time: *where does the hexadecimal value in `#<Object:0x000001009e60f8>` come from?* Today I finally went looking for the answer.


## When in doubt, look at the code ##

The documentation for `Object#to_s` tells us that the value is based on the object id: "Returns a string representing obj. The default to_s prints the object‘s class and an encoding of the object id."

Looking at the source code for `to_s`, we can see that it's using `sprintf` to create the hexadecimal value. From `object.c`:

{% highlight c %}
/* Ruby 1.9 */
rb_sprintf("#<%s:%p>", cname, (void*)obj);

/* Ruby 1.8 */
snprintf(RSTRING(str)->ptr, len+1, "#<%s:0x%lx>", cname, obj);
{% endhighlight %}
<span class="graphicSubtext">You can find this code in the file ruby-VERSION/object.c</span>

Now, Ruby's sprintf doesn't support `%p` or `%lx` but it does support `%x`. However, there's obviously more to the story because the values still don't match up:

{% highlight ruby %}
obj = Object.new
"#<%s:0x%x>" % [obj.class, obj.object_id]    # => #<Object:0x80813ff4>
obj.to_s                                     # => #<Object:0x101027fe8>
{% endhighlight %} 

So what do we need to do to the object id to get the real hexadecimal value?


## A tiny calculation ##

If we take a look at the hexadecimal values in plain-old decimal, the answer becomes obvious. Can you see it?

{% highlight ruby %}
"0x80813ff4".hex                             # => 2155954164
"0x101027fe8".hex                            # => 4311908328
{% endhighlight %}

All we have to do is double it!


## And the answer is... ##

{% highlight ruby %}
"#<%s:0x%x>" % [obj.class, obj.object_id*2]  # => #<Object:0x101027fe8>
{% endhighlight %}


*Note: I've created a tiny project called [Hexoid](http://github.com/delano/hexoid/) which handles minor formatting differences between Ruby 1.8 and 1.9. JRuby support will be supported in a later version.*




