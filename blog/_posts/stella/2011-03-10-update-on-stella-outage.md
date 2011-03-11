---
layout: post
title: An update on yesterday's Stella outage (it was the Redis configuration)
who: delano
---

After I reported on the [blamestella.com](http://blamestella.com) outage yesterday, I did a bit more investigation and made a few changes to the operations of the site. To recap, yesterday at 9am PST the site became unresponsive and the background workers stopped running. I also couldn't SSH in to the main backend machine and ultimately had to reboot it to get back in. After looking into it further, it looks like there were multiple factors at play.


## Root Cause, revisited ##

*Memory swapping and blocking*. There was a conflict between the hourly backup process and the regular operation of the site. The hourly cronjob is simple: it copies the `redis.rdb` file, gzips it, encrypts it, and uploads it to S3. The conflict arose during the copy. Redis was configured to run a background save every 5 minutes to the same `redis.db`. What I didn't realize is that redis blocks the bgsave while that file is being copied. That file had grown a lot with the additional traffic over the past few weeks. I didn't notice this issue previously because the cp and bgsave commands ran pretty quickly. With so much more data, both take longer so it was only a matter of time that this would happen. 


## Operational Changes ##

I made the following changes:

- Disabled background saves in Redis
- Enabled append only persistence
- Rewrote the hourly backup to run explicitly run a Redis background save
- Added an hourly process to tidy unneeded data to keep the backups smaller
- Added a nightly process to run bgrewriteaof to keep the append only file tidy

### The SSH issue ###

There was still the issue of the hanging SSH connection. Before the outage and after I rebooted the machine, SSH was fine. Also, I was able to open a connection to the redis server the entire time so it wasn't the network. I'm not 100% sure but I have a suspicion that it was a kernel problem. That suspicion is based entirely on several modprobe errors in the system console (missing modules). The machine was running an EBS instance type. I have had miscellaneous boot and connection problems with the EBS instance types so I decided to go back to a trusty old instance-store machine image. I built a new machine image and launched a new instance that replaced the previous machine. 


These changes have been in production for the past few hours. I'll report back if I need to make any further modifications.


