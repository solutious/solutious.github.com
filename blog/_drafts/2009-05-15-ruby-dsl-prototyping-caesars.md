---
layout: post
title: Rapid DSL prototyping with Caesars
who: delano
---

DSLs are a hot button topic. 

{% highlight ruby %}
class Flavour < Caesars 
end

extend Flavour::DSL     # Bring the DSL into the current namespace. 
                        # This module is created dynamically based
                        # on the name of the subclass.
                             
flavour do              # Start drinking! I mean, start writing your
  spicy true            # domain specific language! 
  clamy true            # Use any attribute name you want.
  salty true
  vodka :very_true      # And any value you want. 
end
{% endhighlight %}


[Rudy](http://solutious.com/projects/rudy/) implements Caesars for all configuration. 




