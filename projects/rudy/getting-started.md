---
layout: default
title: Getting Started with Rudy
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

# Getting Started 


This document takes you through all steps required to get started with Rudy. By the end, you'll be able to launch multiple EC2 machines with EBS volumes from a single command. 

*Note: The current release of Rudy (0.9) is in BETA status. That means Rudy is not ready for production use! See [Project Status](http://wiki.github.com/solutious/rudy/project-status).*


This document covers the following steps:

* _Create an Amazon Web Services account_
* _Install Rudy_
* _Create Accounts Configuration_
* _Create Project Configuration_
* _Launch a Machine Group_
* _SSH into the machine_
* _Shutdown the Machine Group_


##  Create an Amazon Web Services account

_Skip to this step if you have already signed up for EC2, S3, and SimpleDB._

1. Go to <a href="http://aws.amazon.com/">Amazon Web Services</a> and click, "Sign up now"
2. Fill out the form to create your account.
3. Sign up for each of the following services: <a href="http://aws.amazon.com/ec2/">EC2</a>, <a href="http://aws.amazon.com/s3/">S3</a>, <a href="http://aws.amazon.com/simpledb/">SimpleDB</a>
4. Go to the <a href="https://aws-portal.amazon.com/gp/aws/developer/account/index.html?ie=UTF8&amp;action=access-key">Access Indentifiers</a> page, and collect the following: Account Number, Access Key ID, Secret Key
5. At the bottom of the page, click the "Create New" button to create your private key and certificate. _Make sure you download the private key because Amazon does not keep a copy._

You should now have the following identifiers:
* Amazon Account Number
* Access Key ID
* Secret Key
* X.509 Private Key (<tt>pk-XXXX.pem</tt>)
* X.509 Certificate (<tt>cert-XXXX.pem</tt>)

*NOTE: Your Access Identifiers are the keys to your castle. Keep them safe. If you suspect someone may have them, you can go back to the Access Identifiers page at any time to generate a new secret key. And don't forget to update your Rudy config!*

##  Install Rudy

You can install Rudy via Rubygems with the command below or download as a <a href="http://github.com/solutious/rudy/tarball/latest">tar</a> or <a href="http://github.com/solutious/rudy/zipball/latest">zip</a>. 

<pre><code>  $ sudo gem install rudy
  Successfully installed rudy
  1 gem installed</code></pre>

##  Create Accounts Configuration

Rudy stores configuration in two places: your home directory and your project directory. This allows you to keep your Amazon Access Identifiers and private keys in a secure place (`~/.rudy`). Your project configuration, which we create in the next step, can be kept inside your project directory so it can be versioned with your application.

In this step, we'll create the accounts configuration file.

<pre><code>  $ rudy generate-config
  Creating /Users/delano/.rudy
  Creating /Users/delano/.rudy/config
  Add your AWS credentials to /Users/delano/.rudy/config</code></pre>

The accounts section of your `~/.rudy/config` file should look like this:

<pre><code>  accounts {
    aws {
      name "Account Name"
      accountnum "123456789012"
      accesskey "ACCESSACCESSACCESSACCESS"
      secretkey "SECRETSECRETSECRETSECRET"
      privatekey "path/2/pk-****.pem"
      cert "path/2/cert-****.pem"
    }
  }</code></pre>

Rudy stores metadata about your machines and disks in SimpleDB. The <tt>init</tt> command creates a SimpleDB domain called <tt>rudy_state</tt> to store this metadata.

<pre><code>  $ rudy init
  Creating SimpleDB domain rudy_state
  Authorizing public keys for user@localhost</code></pre>


##  Create Project Configuration

The project configuration tells Rudy about the machine groups you want to create. Machine groups are named after the current environment and role. In this example, we'll configure the default machine group called <tt>stage-app</tt>.

First, we'll generate a skeleton configuration file:

<pre><code>  $ rudy config --project > Rudyfile</code></pre>

If you take a look at <tt>Rudyfile</tt>, you can see that the project configuration is organized into two sections: <tt>machines</tt> and <tt>routines</tt>. The machines configuration describes the "physical" characteristics of your machine groups. The routines configuration describes what happens when you startup and shutdown a machine group (Rudy refers to these as _routines_).

We'll use the configuration in the next section to launch a machine group within EC2.

### What about security groups and keypairs?

Rudy creates these for you based on the same naming convention as machines. The default group will get a key called <tt>key-stage-app</tt> and a security group called <tt>g-stage-app</tt>. 

### Can I use my own keypair?

Yep! You can specify your own keypairs in the machines config. You can find an example in the <tt>Rudyfile</tt> we generated above. Note: if you're specifying a launch keypair, the filename will need to match the name of the keypair that's registered with EC2. i.e. If the path is, /path/2/defaultkey it must be registered as defaultkey with EC2.

##  Launch a Machine Group

Rudy now has all everything it needs to launch the default machine group. To launch a machine group, you call the _startup_ routine:

<pre><code>$ rudy startup
  Authorizing group: 70.49.123.222 (22, 22)
  Starting m-us-east-1d-stage-app-01........
  Waiting for SSH on port 22.....
  Creating volume... 
  Attaching vol-0023c869 to i-e523298c... 
  Creating ext3 filesystem for /dev/sdr... 
  Mounting at /rudy/disk1... 

  The following machines are now available:
  m-us-east-1d-stage-app-01</code></pre>

Using the `machines` command we can list the machines running in the default machine group. 

<pre><code>  $ rudy machines
  m-us-east-1d-stage-app-01</code></pre>

##  SSH into the machine

You can log into the default machine with the following command:

<pre><code>  $ rudy -u root ssh
  Connecting root@ec2-11-22-33-44.compute-1.amazonaws.com
  Linux domU-12-31-39-03-48-D4 2.6.21.7-2.fc8xen #1 SMP Fri Feb 15 12:39:36 i686
  
  root@m-us-east-1d-stage-app-01:~# </code></pre>

The <tt>-u root</tt> tells Rudy to open a connection as the root user. If you create an account on that instance, you can login as that user too. If you don't provide <tt>-u</tt> Rudy will attempt to login with the name of the current user. 


##  Shutdown the Machine Group

When you want to shutdown the machine, you use the _shutdown_ routine:


<pre><code>$ rudy shutdown
  All machines in stage-app will be shutdown
  The following filesystems will be destroyed:
  /rudy/disk1
  Unmounting /rudy/disk1... 
  Detaching vol-0023c869.....
  Destroying disk-us-east-1d-stage-app-01-rudy-disk1
  
  The following instances have been destroyed:
  m-us-east-1d-stage-app-01 i-e523298c </code></pre>


##  Built-in Help

The Rudy command line tool has plenty of built-in documentation. 

* `$ rudy -h`
* `$ rudy show-commands`
* `$ rudy COMMAND -h`


## More Examples

* [EBS volume tests](http://github.com/solutious/ebstest) for testing the performance of Amazon EC2 disks. 



