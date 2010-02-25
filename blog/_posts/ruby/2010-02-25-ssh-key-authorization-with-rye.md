---
layout: post
title: Automate SSH key authorization with Rye
who: delano
---

I got annoyed with manually uploading my public keys to <tt>~/.ssh/authorized_keys</tt> and <tt>~/.ssh/authorized_keys2</tt> so I added a feature to rye to automate the process. 


    $ rye authorize user@example.com


The expected output looks something like this:

    $ rye authorize user@example.com
    Authorizing user@example.com
    Passwordless login failed for user
    Password: ************
    Added public keys for: 
    /home/user/.ssh/id_dsa
    /home/user/.ssh/id_rsa
    Now try: ssh user@example.com


### Installation ###

    $ gem install -V rye
    
You can generate an SSH keypair with the following command iff you don't already have one (by default they're installed to <tt>~/.ssh/id_rsa</tt> or <tt>~/.ssh/id_dsa</tt>):

    $ ssh-keygen -t rsa
