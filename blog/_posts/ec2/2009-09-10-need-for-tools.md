---
layout: post
title: A need for virtualized infrastructure tools
who: delano
---

Virtualized infrastructure is packed with surprises. There is an interesting post on the [Boxed Ice](http://boxedice.com/) blog titled, [Why we moved away from "the cloud" to a "real" server](http://blog.boxedice.com/2009/09/08/why-we-moved-away-from-the-cloud-to-a-real-server/), that highlights two important ones:

1. *Virtualized infrastructure (and Infrastructure as a Service or IaaS specifically) is not a direct replacement for physical hardware.*
2. *Moving to "the cloud" can increase development overhead.*


## Not a direct replacement, but a new opportunity (or three) ##

So if IaaS is not a direct replacement, how are companies using it today? There are currently three primary business cases for using IaaS (unless you're a startup or otherwise have the luxury of starting new projects from scratch):

**Ad-hoc Environments:** Consider a testing environment that arrives just-in-time and only for the time that you need it. Instead of owning and maintaining physical machines for testing, you or your team can create machines on-the-fly, run your tests, and then shut the machines down. The advantage being you're in control and you're also paying only for the time the tests are running. There are also technical advantages in installing and configuring your application from scratch because it can help you find bugs that you wouldn't find on permanent test machines.

Another example is rapid-prototyping. If your development or marketing team has an idea, you can spend a few days or a week building a prototype, then launch it on EC2 for internal and external feedback without having to plan and budget for the ongoing costs. 

**Batch Processing:** Small to medium sized companies now have access to a massive amount of processing power. Before the IaaS model -- that is, paying for computing power by the hour -- this kind of power was available only large organizations which had the resources to purchase and maintain their own data centres. 

**Pilot projects:** This one is important for development teams and IT managers in small and medium sized business. You now have the ability to provision your own hardware. While the costs can remain on par (in some cases), you will have more control and be more agile. More importantly you're developing a knowledge of virtualized infrastructure within your organization. Just like the transition from on-site electricity generators to pay-by-usage utilities, the computing industry is transforming into a new model. You don't need to move your entire infrastructure to experience this value. All it takes is 1 or 2 machines. 

These examples are just the tip of the iceberg in terms of what's possible, but they have one important thing in common: *these are opportunities that you can employ today with minimal impact to your existing processes.*


## Development overhead, a need for tools ##

Possible? Absolutely. But these opportunities require (sometimes) significant development time to implement. That's a sign that *the ecosystem needs more tools*. 

**Opensource tools:** Most (if not all) programming languages have opensource libraries that implement the IaaS vendor APIs. But there are very few libraries that provide functionality beyond these core APIs. [Rudy](/projects/rudy/) is one example that helps organize complex environments and processes, but there are other approaches. Like [PoolParty](http://poolpartyrb.com/) and [libcloud](http://libcloud.net/). This is a good start, *but we need more*.

**Commercial products:** Products like [RightScale](http://rightscale.com/) and [Cloudkick](http://cloudkick.com/) which provide web-based interfaces to your virtual infrastructures. And there are companies like [SOASTA](http://soasta.com/) and [Devver](http://devver.net/) which provide usage-based services on top of IaaS vendors. These tools are great and I've had success in training clients how to use them. But again, *we need more*.


## The road is paved with experiments ##

How do we get there? How do we get to a place that's brimming with mind-blowingly powerful IaaS tools? We get there with practice, by experimenting with EC2 or Rackspace or RightScale or Cloudkick. If you're a development manager, green light a pilot project. If you're a developer, take a look at a project like [Rudy](/projects/rudy/) or [PoolParty](http://poolpartyrb.com/) and tear it apart. 

We need to expand our knowledge of what works and what doesn't work.






