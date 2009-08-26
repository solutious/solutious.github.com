---
layout: default
title: Rudy FAQ
bodyid: products rudy
subnav: 
- name: "getting started"
  link: /projects/rudy/getting-started/
- name: "repository"
  link: http://github.com/solutious/rudy
- name: "issues"
  link: http://github.com/solutious/rudy/issues
- name: "rdocs"
  link: http://solutious.com/rudy/
---

# Frequently Asked Questions

## Why does Rudy require SimpleDB and S3 accounts?

Rudy stores metadata for machines and disks in _SimpleDB_. The reason is simple: it allows the state of your environments to be accessible to everyone on your team regardless of location. _S3_ is used by the rudy-s3 command-line tool. It currently supports only creating and deleting buckets, but there are more features planned. 

## Is it possible to store the metadata locally instead?

Not currently, but it's probably a valuable features for people or teams who don't require the distributed nature of SimpleDB. If you're interested in this feature, feel free to <a href="http://github.com/solutious/rudy/issues">create an issue</a> for it labeled "task".

## What about security groups and keypairs?

Rudy creates these for you based on the same naming convention as machines. The default group will get a key called <tt>key-stage-app</tt> and a security group called <tt>g-stage-app</tt>. 

## Can I use my own keypairs?

Yep! You can specify your own keypairs in the machines config. You can find an example in the <tt>Rudyfile</tt> we generated above. Note: if you're specifying a launch keypair, the filename will need to match the name of the keypair that's registered with EC2. i.e. If the path is, <tt>/path/2/defaultkey</tt> it must be registered as defaultkey with EC2.

## Can I use my own security groups?

Not currently. It is possible but I think it would add more complexity than it resolves. However, the discussion is open so email me at delano`solutious.com or start a thread in the <a href="http://groups.google.com/group/rudy-deployment">discussion group</a>

## How do I change the default environment and role?

These values can be changed in the defaults section of `~/.rudy/config`. 

