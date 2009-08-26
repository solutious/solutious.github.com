---
layout: post
title: "Restore, Work, Destroy: An EC2 lifecycle"
who: delano
---

Most of the buzz around virtualized IT infrastructure focuses on dynamic scaling -- that is, increasing the number of machines when load is high and decreasing when load is low. There is huge value in being able to do this so the attention is justified. But there are other opportunities which are practically begging to be exploited. The one that I am most excited about is *temporary infrastructures.* 

Now, temporary infrastructures [haven't](http://open.blogs.nytimes.com/2008/05/21/the-new-york-times-archives-amazon-web-services-timesmachine/) [gone](http://aws.typepad.com/aws/2009/08/pig-latin-high-level-data-processing-with-elastic-mapreduce.html) [unnoticed](http://selenium-grid.seleniumhq.org/run_the_demo_on_ec2.html)  but again the focus is limited -- in this case to batch processing. I'd like to suggest another possibility: launching applications only for the time that you need them. 


### A Just-in-time Issue Tracker ###

Launching an application, using it, and shutting it down is interesting but it's hardly mind blowing. I'm going to kick it up a notch by demonstrating how to routinely persist an application and its data between machine instances using [Amazon EC2](http://aws.amazon.com/ec2/), [EBS volumes](http://aws.amazon.com/ebs/), and [Rudy](http://solutious.com/projects/rudy/). 

I chose [JIRA](http://www.atlassian.com/software/jira/) for this example because it is a popular bug and issue tracker that's familiar to many people.

#### What you need ####

* Some experience running tools on the command-line
* An Amazon Web Services (AWS) account and credentials
* [Rudy installed](http://solutious.com/projects/rudy/getting-started/) on your machine
* 5 minutes




