---
layout: post
title: Rudy, not your grandparent's deployment tool
who: delano
---

*NOTE: This post is historically accurate but out of date. See: [Rudy 0.9 Released](/blog/2009/08/10/rudy-0.9-released/).* 

[Rudy](http://github.com/solutious/rudy) is a command-line development and deployment tool. It's been in private beta for about two months and today marks the day of the [first public release](http://github.com/solutious/rudy/tree/0.6) `[1]`. The project is still in alpha status and many features have yet to be developed but it's already useful for exploring the features of Amazon EC2. In this post, I'll introduce Rudy's core features and demonstrate how these features can help build and manage environments in EC2.  

## A quick look

It's useful to know what working with Rudy looks like before getting into the details:

    $ rudy startup            # Launch the default machine group, stage-app
    $ rudy -e dev startup     # Launch the dev-app machine group
    $ rudy machines           # List all instances running in stage-app
    $ rudy -u root ssh        # SSH to root@m-us-east-1b-stage-app-01
    $ rudy ssh uptime         # Execute the uptime command on app stage-app machines
    $ rudy shutdown           # Terminate stage-app instances

See also:

    $ rudy -h 
    $ rudy show-commands
    $ rudy COMMAND -h


## Machine Groups

Rudy helps you build and manage machines in EC2 by organizing them into groups of _environments_ and _roles_. These are called _machine groups_. You can run multiple machines with the same role. These are called _positions_. Rudy also supports running machine groups across availability _zones_. When you put all this together, you have a unique name for every machine. The default machine is:

             zone     env  role
              v        v    v   
        m-us-east-1b-stage-app-01
        ^                       ^
     "machine"                position
     

`stage` is the default environment and `app` is the default role, but these can be changed too (see Defaults below). These machine groups are configured using a Ruby DSL (domain-specific language) that looks like this:

{% highlight ruby %}
machines do
  # Define two identical environments
  environment :dev, :stage do
    # Default properties for all roles
    ami "ami-235fba4a"
    positions 1
    
    role :app do
      # Create two identical instances in the :app role. 
      positions 2
      # Elastic IP addresses to be associated on startup
      addresses "11.22.33.44", "55.66.77.88"
    end
    
    role :analyzer do
      # The :analyzer machines can have their own AMI
      ami "ami-********"
      # Define EBS volumes for this machine
      disks do
        path "/data/disk1" do
          size 4
          device "/dev/sdr"
        end
      end
    end
    
  end    
end
{% endhighlight %}


The configuration above describes the properties for 4 machine groups: `dev-app`, `dev-analyzer`, `stage-app`, and `stage-analyzer`. Since we've defined two `app` machines per environment, that makes 6 machines:

* `m-us-east-1b-dev-app-01`
* `m-us-east-1b-dev-app-02`
* `m-us-east-1b-dev-analyzer-01`
* `m-us-east-1b-stage-app-01`
* `m-us-east-1b-stage-app-02`
* `m-us-east-1b-stage-analyzer-01`


## Routines

The machines configuration describes the whats or the "physical" characteristics of the environments. The routines configuration describes the repeatable processes. 

{% highlight ruby %}
routines do
  # Define routines for the stage environment
  environment :stage do

    role :analyzer do
      # Tell Rudy what to do when you run "rudy startup"
      startup do
        # Execute "uname" on the local machine
        before_local Rudy.sysinfo.user => [:git, :commit, 'a', 'm', "Rudy Startup"]
        before_local Rudy.sysinfo.user => [:git, :push]
        disks do
          # Create an EBS volume, attach it, format it, and mount it
          create "/rudy/disk1"
        end
        after :username => ['/a/release/script']
        after :root => ['/etc/init.d/nginx', 'restart']
      end
      shutdown do
        before :root => '/another/custom/script'
        before :root => [:mysqladmin, :u, 'root', 'shutdown']
        disks do
          # Umount the volume, detach it, delete it
          destroy "/rudy/disk1"
        end
        # Rudy.sysinfo.user returns the process' current user (ENV['user'])
        after_local Rudy.sysinfo.user => "date"
      end    
    end
    
  end
end
{% endhighlight %}

This routines configuration describes the processes for the `stage-analyzer` group. 


## Running a Routine

    $ rudy -r analyzer startup
    Starting stage-app
    
    ---  BEFORE SCRIPTS (local)  ------------------------------
    Connecting to localhost
    ...
    Starting m-us-east-1b-stage-app-01
    Associating 11.22.33.44 to i-11111111
    Starting m-us-east-1b-stage-app-02
    Associating 55.66.77.88 to i-22222222
    ....
    
    ---  DISK ROUTINES  ---------------------------------------
    ...
    
    ---  AFTER SCRIPTS  ---------------------------------------
    ...
    
    The following machines are now available:
    m-us-east-1b-stage-app-01  ec2-11-22-33-44.compute-1.amazonaws.com
    m-us-east-1b-stage-app-02  ec2-55-66-77-88.compute-1.amazonaws.com
  

## Defaults

You may be wondering where the `us-east-1b` value comes from. This is an EC2 availability zone and it's one of several default values that Rudy assumes in order to function straight "out of the box". The default values can be changed too:

{% highlight ruby %}
defaults do
  region :"us-east-1" 
  zone :"us-east-1b"
  environment :stage
  role :app
  position "01"
  user ENV['USER'].to_sym
end
{% endhighlight %}



## Conclusion / More to come

As I mentioned, the current release of Rudy (0.6) is in alpha status so it's not ready for production. There's a lot of work to do, including a lot of documentation to write, but hopefully you can already see the value of incorporating Rudy into your development process. For now, the [README](http://github.com/solutious/rudy) contains installation instructions and the [RDocs](http://opensource.solutious.com/rudy) are somewhat helpful too!

## Notes

* `[1]` Rudy has been available on GitHub since the project began, but this release is the first one with documentation.


