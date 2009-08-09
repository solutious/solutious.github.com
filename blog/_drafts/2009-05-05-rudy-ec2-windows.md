---
layout: post
title: Launching a Windows EC2 instance with rudy-ec2
who: delano
---

Rudy is a development and deployment tool for Amazon EC2. I've written a few examples about launching Linux and Solaris instances so in this post I'm going to demonstrate how to launch a Windows instance. Launching a Windows machine image is quite similar to launching other types, but EC2 has a few Windows specific features that you need to be aware of. That's what this post about. Windows EC2 gotchas. 

What you'll need:

* [Rudy](http://wiki.github.com/solutious/rudy/getting-started)
* Remote Desktop Client [for Mac](http://www.microsoft.com/mac/projects/remote-desktop/default.mspx)
* 5 minutes


## Select the AMI

    $ rudy-ec2 images | grep win
    ami-7acae20e i386   (ec2-public-windows-image-eu/EN-Server2003r2-i386-Win-v1.02.manifest.xml)
    ...

## Create a Keypair

You will need an SSH keypair to log in to a Windows instance. Unlike Linux however, the keypair is not used for authentication. It's used to encrypt a randomly generated password. I'll explain how that works in a moment, but for now generate the keypair. NOTE: You can skip this step if you already have a registered keypair. 

    $ rudy-ec2 keypairs -C key-windows
    Name: key-windows
    Fingerprint: 71:d9:bc:ba:42:fd:e8:2c:f8:dd:0a:bb:d6:48:56:20:cc:c0:b4:89
    
    Copy the following private key data into a file.
    Set the permissions to 0600 and keep it safe.
    
    -----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAn6jYHTsQtF1+xXvwBIGO2h6K+R7jCOP1qm0MAbSYswx/odUcZ4KE4RrAbDrZ
    ...
    H1pwVtvlJfUBDdrrEReU/zF4duXN5UO3jkpVQRnLi0Yzc32RHQLC8ZO1eDKFeCwnoUl2
    -----END RSA PRIVATE KEY-----
    

Make sure you save the private key to a file because you won't be able to retrieve it again! 

## Create a Security Group

    $ rudy-ec2 groups -C --ports=22,80,3389 g-windows
    g-windows 
       84.28.52.172/32 -> tcp(22), tcp(80), tcp(3389)


## Launch an instance of Windows
    $ rudy-ec2 instances -C -m ami-7acae20e -g g-windows -k key-windows


