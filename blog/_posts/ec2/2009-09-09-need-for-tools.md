---
layout: post
title: A need for virtualized infrastructure tools
who: delano
---

Virtualized infrastructure is packed with surprises. There was an interesting post on the [Boxed Ice](http://boxedice.com/) blog yesterday titled, [Why we moved away from "the cloud" to a "real" server](http://blog.boxedice.com/2009/09/08/why-we-moved-away-from-the-cloud-to-a-real-server/), that highlights two important surprises:

1. *Virtualized infrastructure is not a direct replacement for physical hardware.*
2. *Moving to "the cloud" can introduce development overhead.*

I'm going to talk about the opportunities that are made available with virtualized infrastructure (and Infrastructure as a Service or IaaS specifically) and put a call out for the next generation of tools to realize those opportunities.


## Not a direct replacement, but a new opportunity (or two) ##

The primary business cases for utilizing IaaS today are ad-hoc environments and batch processing. 

**Ad-hoc Environments:** Consider a testing environment that arrives just-in-time and only for the time that you need it. Instead of owning and maintaining physical machines for testing, you or your team can create the machines on-the-fly, run your tests, and then shut the machines down. The advantage being you're only paying for the time the tests are running. There are also technical advantages in installing and configuring your application from scratch because it can help you find bugs that you wouldn't find on permanent test machines.

Another example is rapid-prototyping. If your development or marketing team has an idea, you can spend a few days or a week building a prototype, then throw it up on EC2 for internal and external feedback without having to plan and budget for the ongoing costs.

**Batch Processing:** Small to medium sized companies now have access to a massive amount of processing power. Before the IaaS model -- that is, paying for computing power by the hour -- this kind of power was available only large organizations which had the resources to purchase and maintain their own data centers. 

These examples just scratch the surface of what's possible, but they have one important thing in common: *these are opportunities that you can employ today with minimal impact to your existing processes.* 


## Development overhead, a need for tools ##

But to effectively take advantage of the opportunities presented by IaaS, you need to the right tools. Every major language has library support for all IaaS vendors. There are 












