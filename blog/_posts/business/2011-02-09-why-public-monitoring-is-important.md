---
layout: post
title: "Why public monitoring is important"
who: delano
---

There was an issue on Amazon EC2 yesterday that affected the response times for a non-trivial number of their customers (myself included). I first noticed the issue when [blamestella.com](https://www.blamestella.com/) began to get very slow (around 11:45 PST). I checked Stella's public report for EC2 performance and other sites were having issues as well:

<p class="graphic"><a href="/blog/assets/2011-q1/stella-ec2-status-2011-02-08.png"><img src="/blog/assets/2011-q1/stella-ec2-status-s-2011-02-08.png" alt="Stella EC2 Report for February 8, 2011" border="0" /></a><br/><span class="graphicSubtext"><a href="https://www.blamestella.com/vendor/ec2/report" title="EC2 Status - Stella">Stella EC2 Report</a> on February 8th, 2011</span></p>

The chart represents the average network latency (light grey), application latency (grey), and download time (dark grey) for all monitored sites on EC2 (71 separate sites at the time of this writing). You can see that the service is typically very stable with regards to HTTP response times so the issue yesterday was clearly an anomaly, but there was no information on Amazon's status page:

### Amazon's Status Page ###

<p class="graphic"><a href="/blog/assets/2011-q1/aws-status-2011-02-08.png"><img src="/blog/assets/2011-q1/aws-status-s-2011-02-08.png" alt="Amazon Web Services Status for February 8, 2011" border="0" /></a><br/><span class="graphicSubtext"><a href="http://status.aws.amazon.com/">Amazon Web Services Status</a> page on February 8th, 2011</span></p>

I love Amazon. For them, this was probably an isolated problem that affected a relatively small number of their customers. However, the customers that it did affect were left in the dark. The natural response would be to assume that it's a problem with your application until you start hearing reports for other sites. This is where the value of public monitoring becomes apparent and it's one of the reasons I built Stella.

## Leading by example ##

Heroku is built on EC2 and their service was affected yesterday as well. They do a great job handling operational issues by being responsive and open with their customers. Yesterday was no exception:
<p class="graphic"><a href="/blog/assets/2011-q1/heroku-status-2011-02-08.png"><img src="/blog/assets/2011-q1/heroku-status-s-2011-02-08.png" alt="Heroku Status for February 8, 2011" border="0" /></a><br/><span class="graphicSubtext"><a href="http://status.heroku.com/">Heroku Status</a> page on February 8th, 2011</span></p>

Although they didn't have answers as to the cause, simply demonstrating that they're on top of things is reassuring and a sign of a responsible, well-run company.


## All services go down ##

Public monitoring isn't about highlighting the failures of a site or service. It's about accepting the fact that all services go down from time to time. Public reports help site operators and they keep customers informed.


