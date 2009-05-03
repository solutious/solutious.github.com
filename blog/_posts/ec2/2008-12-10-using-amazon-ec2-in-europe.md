---
layout: post
title: Using Amazon EC2 In Europe
who: delano
---

If you're worked with EC2 before, there are a couple things you need to know to get started with launching machine instances in Europe. SSH Keys and AMIs are not shared between regions. We're going to create both of these and then launch an instance in Europe. There's also a new parameter `--region` which you need to use to interact with the new availability zones. Let's giver'.


##Create an S3 bucket in Europe##

AMIs are stored in S3 so you need a bucket in Europe if you don't have one already (you'll probably want a new one for your machine images anyway). There's a Firefox extension called [S3Fox](https://addons.mozilla.org/en-US/firefox/addon/3247) that can help you do this (check the box labeled, "Place this bucket in Europe"). Note that S3Fox is quirky and ugly almost to the point where it's offensive. But it works and it's easier than writing a script. The free version of [RightScale](http://rightscale.com/) can do this too. You can also use [S3Tools](http://s3tools.logix.cz/s3tools) to create buckets but I've never used them so I can't recommend them.  

##Copy an AMI from the US to EU##

You have two choices: re-bundle your running instance(s) or copy your existing images with the `ec2-migrate-bundle` tool. If you choose to re-bundle, follow the steps you normally would (described in the [developer guide](http://docs.amazonwebservices.com/AWSEC2/2008-12-01/DeveloperGuide/index.html?bundling-an-ami-linux.html)) and then upload the bundle to Europe (also in the [developer guide](http://docs.amazonwebservices.com/AWSEC2/2008-12-01/DeveloperGuide/index.html?CLTRG-ami-upload-bundle.html)). 

The easiest approach is to use the `ec2-migrate-bundle` tool. You'll need to install the latest [AMI tools](http://developer.amazonwebservices.com/connect/entry.jspa?externalID=368) to a Linux or Windows machine near you (these *[will not work on OSX](http://developer.amazonwebservices.com/connect/message.jspa?messageID=92712)*). As a side note, the AMI tools are written in Ruby which is interesting because the [API tools](http://developer.amazonwebservices.com/connect/entry.jspa?externalID=351) are written in Java. 

    $ ec2-migrate-bundle --location EU --cert /mnt/cert-*.pem --privatekey /mnt/pk-*.pem \
    --access-key ORANGEJUICE --secret-key SUp0rS3kRu7 \
    --bucket BUCKET-IN-US --destination-bucket BUCKET-IN-EU \ 
    --manifest IMAGE.manifest.xml 

Note: If you're running this command on an EC2 instance, you'll need to upload your encryption keys first:

    $ scp -i PATH/2/private-key PATH/2/cert-*.pem PATH/2/pk-*.pem root@YOURMACHINE:/mnt/

From your local machine, run the follow to tell EC2 that your new Europe image exists:

    $ ec2-register --region eu-west-1 BUCKET-IN-EU/IMAGE.manifest.xml

##Update API Tools##

You won't be able to see your image yet b/c you need to update your [API tools](http://developer.amazonwebservices.com/connect/entry.jspa?externalID=351). You should run these on a *real, physical machine*. Why? Because it's a good rule of thumb for keeping your keys secure. If you copy them to a machine instance, you could forget them and they could end up being available on every instance you startup. 

Now you'll be able to see your machine images in Europe:

    $ ec2-describe-images --region eu-west-1 -o self

You'll be able to see the regions and availability zones:

    $ ec2-describe-regions
    REGION	eu-west-1	eu-west-1.ec2.amazonaws.com
    REGION	us-east-1	us-east-1.ec2.amazonaws.com
    
    $ ec2-describe-availability-zones --region eu-west-1
    AVAILABILITYZONE	eu-west-1a	 available	eu-west-1
    AVAILABILITYZONE	eu-west-1b	 available	eu-west-1
 

You can make Europe your default region by adding the `EC2_URL` variable to your environment:

    # Unix and Unix-like:
    export EC2_URL=https://eu-west-1.ec2.amazonaws.com

    # Windows:
    set EC2_URL=https://eu-west-1.ec2.amazonaws.com


##Create an SSH key in Europe##

Before you can launch an instance in Europe, you need to create a new SSH key:

    $ ec2-add-keypair eu-west-1-key --region eu-west-1

The output of this command is your private key. Save it in a secure location! You'll need to make sure it's only readable by you (`chmod 600 eu-west-1-key`). SSH won't use it otherwise. 

##Create a security group in Europe##

The default security group won't allow you to SSH in to your new instance. You can create a new group with these commands:

    $ ec2-add-group --region eu-west-1 -d "Potato Storage" potato
    GROUP	potato	Potato Storage
    
    $ ec2-authorize --region eu-west-1 -p 22 potato
    GROUP		potato	
    PERMISSION		potato	ALLOWS	tcp	22	22	FROM	CIDR	0.0.0.0/0
		
If security groups are new to you, be sure to check out the [documentation](http://docs.amazonwebservices.com/AWSEC2/2008-12-01/DeveloperGuide/index.html?CLTRG-ami-migrate-bundle.html) and [firewall examples](http://docs.amazonwebservices.com/AmazonEC2/dg/2006-10-01/distributed-firewall-examples.html). [Twenty Rules for Amazon Cloud Security](http://broadcast.oreilly.com/2008/11/20-rules-for-amazon-cloud-security.html) is a good read too. 

##Launch an instance in Europe (finally!)##

    $ ec2-run-instances --region eu-west-1 --availability-zone eu-west-1b \
    --key eu-west-1-key --group potato -t m1.small ami-XXXXXXXX

Use the following command to see when it becomes available:

    $ ec2-describe-instances --region eu-west-1

Once it does, log in and have some fun!

    $ ssh -i PATH/2/eu-west-1-key root@ec2-XX-XXX-XX-XXX.eu-west-1.compute.amazonaws.com

##Don't forget to terminate the instance!##

    $ ec2-terminate-instances --region eu-west-1 i-XXXXXXXX

##Extra Stuff##

There's more information about regions in the [Amazon EC2 Regions Guide](http://developer.amazonwebservices.com/connect/entry.jspa?externalID=1927&categoryID=174). 

Enjoy running your apps in style!

