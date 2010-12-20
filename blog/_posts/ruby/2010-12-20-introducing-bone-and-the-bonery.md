---
layout: post
title: Introducing Bone and the Bonery
who: delano
---

*Whoa, whoa, whoa, whoa, whoa. There's still plenty of meat on that bone. Now you take this home, throw in in a pot, add some broth, a potato. Baby you got a stew goin'.* -- Carl Weathers

<img src="https://github.com/solutious/bone/raw/gh-pages/bone.png" width="220" height="186" align="right" border="0" style="padding-left:30px; padding-bottom: 30px;" />

Configuration management is hard. A lot of stuff is hard, but you don't mind because you expect it. Managing configuration on the other hand seems like such an innocent and simple problem. However, the solutions often turn to be horrible, debilitating nightmares. Part of the problem for me is that the tools are really complicated. That's a bit unfair to say because at some point there is a reason for that complexity (large projects, large teams, etc). But when your team is just a few people strong and when you don't have the resources to dedicate to specific tasks, it really helps to have simple, straight-forward tools.

So when it comes to configuration, I use something a little more inline with Carl Weathers' philosophy. It's a command-line tool and Ruby library called [Bone](https://github.com/solutious/bone/). I've been using it internally for about a year to store configuration and what I like to call *remote environment variables*. It's only version 0.3 so it's very basic, almost to a fault. However, what it lacks in features in makes up for by endeavouring to never ruin your day. 

## Bone: Remote Environment Variables ##

It's essentially the simplest possible key-value store. Here's a taste:

{% highlight bash %}
delano@localhost$ bone set dbmaster=192.168.1.1
192.168.1.1

delano@prodfe$ bone dbmaster
192.168.1.1
{% endhighlight %}   

{% highlight ruby %}
require 'bone'

# The values you set on the command-line are available
# in your Ruby code like regular environment variables.
Bone[:dbmaster]      #=> 192.168.1.1
{% endhighlight %}

You can also pass values by STDIN.

{% highlight bash %}
delano@localhost$ <path/2/redis_server.conf bone set redisconf
{% endhighlight %}
<!-- Do not remove this comment -->

I use bone everywhere. Some examples:

* I store all my configuration files in there so I can make one simple command to get a copy. (keys: `redis-server-2.2`, `nginx-0.7`, etc...)
* In backup scripts, I make a call to bone to store the latest path. (`bs-backup-latest`)
* I store the ip addresses of various machines so when I start new machines the scripts that on them will always grab the updated addresses.

## Behind the scenes ##

It works by communicating with an HTTP server, called [Boned](https://github.com/solutious/boned/) using a simple REST API. Since all the data is stored remotely, the values you set can be made available to any machine that can connect to the Boned server. The API is based on two regular environment variables: a token, which is like your username, and a secret which is used to sign each request (the signing is based on the one Amazon uses for EC2, S3, etc). There is a third environment variable to tell bone which server to use. 

{% highlight bash %}
# In your ~/.bashrc or equivalent...
export BONE_SOURCE=https://api.bonery.com/
export BONE_TOKEN=YOURTOKEN
export BONE_SECRET=sUp3R5eKru7
{% endhighlight %}


## The Bonery ##

I've also launched an alpha version of [The Bonery](http://bonery.com/) so you can try it out without running the server yourself. 

<a href="https://api.bonery.com/signup/alpha" title="The Bonery | Remote Environment Variables" style="color: #222; background-color: yellow; padding-left: 5px; padding-right: 5px"> GET YOUR API KEY </a>

It's alpha as a I mentioned, so don't rely on it for production just yet. But get your key, throw in some variables, a file, some configuration, and baby you got a stew goin'!

