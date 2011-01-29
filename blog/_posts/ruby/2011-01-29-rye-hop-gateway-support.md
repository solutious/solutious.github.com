---
layout: post
title: Gateway support for Rye, via Rye::Hop
who: delano
---

Thanks to a fork from [Vincent Batts](http://hashbangbash.com/), Rye now has gateway support!

    rhop = Rye::Hop.new('firewall.lan')
    rbox = Rye::Box.new('filibuster', :via => rhop)
    rbox.uptime     # => 20:53  up 1 day,  1:52, 4 users
    
Or:
    
    rbox = Rye::Box.new 'filibuster', :via => 'firewall.lan'

Gateway support allows you to access machines through a tunnelled connection (similar to [Net::SSH::Gateway](https://github.com/net-ssh/net-ssh-gateway)). This functionality is available in the [0.9.3 release](https://github.com/delano/rye/tree/v0.9.3).


### Installation ###

    gem install rye --version 0.9.3


### About Rye ###

Rye is a Ruby library that provides a safe, simple way to access Unix shells. You create an instance of Rye::Box and the methods you call against it are mapped to shell commands over SSH. 

    rbox = Rye::Box.new('hostname')
    rbox.pwd                               # => "/home/rye"
    rbox.uname :a                          # => "Darwin rye-stage 9.7.0 ..."

With the block syntax, Rye looks a lot like a shell script.

    rbox.batch do
      cd 'redis-2.0.0-rc3'
      configure
      make
      make 'install'
    end

See the [Github repo](https://github.com/delano/rye/) for more examples.


