---
layout: post
title: Rudy, A Replacement for EC2 API Tools. 
who: delano
---

Rudy is a [development and deployment tool](/2009/04/21/rudy-deployment-introduction/) for EC2. It comes with an executable called `rudy-ec2` that can also be used as a replacement for Amazon's EC2 API tools. The EC2 API tools are a great reference implementation but they're unfriendly and become unwieldily when you have more than a few instances. `rudy-ec2` is an alternative to these tools that can be used on it's own (you don't need to start using Rudy), allowing you to incorporate Rudy into your development process gradually.

## Installation

`rudy-ec2` is included with Rudy so if you've already installed Rudy, you can skip to the next section. 

Download Rudy from [github.com](http://github.com/solutious/rudy) or install it via RubyGems:

    $ sudo gem install rudy
    $ sudo gem install solutious-rudy --source http://gems.github.com/

NOTE: If you are not installing via RubyGems and running Ruby 1.8.x, you need to make sure the Ruby dependencies (see the [README](http://github.com/solutious/rudy/blob/master/README.rdoc)) are installed and in your LOAD_PATH. Ryan Tomayko wrote [a gist](http://gist.github.com/54177) about it.


## Configuration, 3 ways to do it

`rudy-ec2` needs your Amazon Web Services credentials in order to execute commands on EC2. You can configure these in 3 ways: rudy configuration, environment variables or command-line options.


### Rudy Configuration (method 1)

`rudy-ec2` can use the same configuration as `rudy`. If you've already created a Rudy configuration file, you don't need to do anything else. Otherwise, run the following commands:

    $ rudy generate-config
      [edit ~/.rudy/config with your Amazon Web Services credentials] 
    $ rudy init

NOTE: *The above command is **rudy** and not **rudy-ec2**.*

### Environment Variables (method 2)

#### Bash
Add the following to your `~/.bashrc` file:

    AWS_ACCESS_KEY='your_aws_key'
    AWS_SECRET_KEY='your_aws_secret'
    AWS_ACCOUNT_NUMBER=123456789012
    export AWS_ACCESS_KEY AWS_SECRET_KEY AWS_ACCOUNT_NUMBER
    
    EC2_CERT=path/2/cert.pem
    EC2_PRIVATE_KEY=path/2/pk.pem
    export EC2_CERT EC2_PRIVATE_KEY

Then either start working in a new terminal window or run `source ~/.bashrc` to refresh your current one. 

#### Windows/DOS

Set your environment variables from your System Properties menu. 


### Command-line Options (method 3)

    $ rudy-ec2 -A your_aws_key -S your_aws_secret COMMAND

NOTE: *If you use the command-line options, your credentials will appear in your shell history. You can run `history -c` to clear it.*

## rudy-ec2  Commands

A `rudy-ec2` command follows the same convention as `rudy` commands:

    $ rudy-ec2 -h
    USAGE: rudy-ec2 [global options] COMMAND [command options]

The default command displays the current instances

    $ rudy-ec2
    i-8794fcee  ec2-11-22-33-44.compute-1.amazonaws.com  (group-awesome)
    i-9e94fcf7  ec2-55-66-77-88.compute-1.amazonaws.com  (group-awesome)
    i-9394fcfa  terminated  (group-awesome)

When no arguments are given, all commands display information about the object you specify:

    $ rudy-ec2 images
    Images owned by amazon
    aki-46e7002f i386   (aki-linux.2.6.21.7-2.fc8xen-xfs/vmlinuz.manifest.xml)
    aki-9800e5f1 x86_64 (ec2-public-images/vmlinuz-2.6.18-xenU-ec2-v1.0.x86_64.aki.manifest.xml)
    aki-9b00e5f2 i386   (ec2-public-images/vmlinuz-2.6.18-xenU-ec2-v1.0.i386.aki.manifest.xml)
    ...
    
    $ rudy-ec2 groups
    group-awesome (authorized accounts: 123456789012:default)
    11.22.33.44/32 -> tcp(22), tcp(80), tcp(443)
    55.66.77.88/32 -> tcp(22), tcp(80), tcp(443)

With arguments, you can create, modify or destroy all EC2 objects:

    $ rudy-ec2 instances -C -m ami-235fba4a -s m1.small -k keypair-name
    i-9394fcfa  pending  (default)
    
    $ rudy-ec2 groups -A -p 8080,8081 group-awesome
    Authorize access to group-awesome from 11.22.33.44/32
    on tcp ports: 8080, 8081
    default (authorized accounts: 123456789012:default)
       11.22.33.44/32 -> tcp(22), tcp(80), tcp(443), tcp(88), tcp(99)
       11.22.33.44/32 -> tcp(8080), tcp(8081)

## Safety

I'm always a little nervous using the Amazon AMI tools because I feel like I'm one command away from a nightmare. `rudy-ec2` solves this by prompting for user input before executing any potentially destructive actions. 

    $ rudy-ec2 groups -D group-awesome
    Destroying group: group-awesome
    Are you sure? To continue, resolve (7 * 5): 

And you can avoid the annoyance by providing the `-Y` global

    $ rudy-ec2 -Y groups -D group-awesome    # Careful!


## Conclusion

That's `rudy-ec2` in a nutshell. For more information, check out the [RDocs](http://opensource.solutious.com/rudy). 
