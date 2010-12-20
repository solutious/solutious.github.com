---
layout: post
title: Introducing Bone and the Bonery
who: delano
---

*Whoa, whoa, whoa, whoa, whoa. There's still plenty of meat on that bone. Now you take this home, throw in in a pot, add some broth, a potato. Baby you got a stew goin'.* -- Carl Weathers

<img src="https://github.com/solutious/bone/raw/gh-pages/bone.png" width="220" height="186" align="right" border="0" style="margin-left: 20px" />

Configuration management is hard. A lot of stuff is hard, but you don't mind because you expect it. Managing configuration on the other hand seems like such an innocent and simple problem. However, the solutions often turn to be horrible, debilitating nightmares. Part of the problem for me is that the tools are really complicated. That's a bit unfair to say because at some point there is a reason for that complexity (large projects, large teams, etc). 

For about a year now, I've been using something a little more inline with Carl Weathers' philosophy. It's a command-line tool and Ruby library called [Bone](https://github.com/solutious/bone/). I've been using it internally to store configuration and what I like to call *remote environment variables*. It's only version 0.3 so it's very basic, almost to a fault. However, what it lacks in features in makes up for by endeavouring to never ruin your day. 

Here's a taste:

{% highlight shell %}
delano@localhost$ bone set dbmaster=192.168.1.1
192.168.1.1

delano@prodfe$ bone dbmaster
192.168.1.1
{% endhighlight }

{% highlight ruby %}
require 'bone'

# The values you set on the command-line are available
# in your Ruby code like regular environment variables.
Bone[:dbmaster]      #=> 192.168.1.1
{% endhighlight %}


## Behind the scene ##

It works by communicating with an HTTP server 


## The Bonery ##


