---
layout: post
title: EC2 Disk Performance, Linux vs OpenSolaris -- Preliminary Results
who: delano
---

I started playing with the Solaris images on EC2 last week. I'm crazy for disk performance so I got straight to the benchmarking. These are only preliminary results because I'm only testing reading and writing medium to large files and I'm still getting a feel for the performance. In these tests I'm using the dd utility to read and write files to several mounts (local, local swap, and EBS). The test and results are below and I follow up with what will be improved on for the next test. NOTE: I'm currently waiting for a response from Sun's EC2 support before continuing the tests. 

Summary: Reading and writing medium to large files in OpenSolaris in EC2 appears to be slower than Linux. More testing is required. 

##Tests##

**Read/write 10MB, 100MB, 1000MB to /, /mnt/, /data, /tmp**
* / and /mnt are the default "local" disks
* /tmp is the default "local" swap space 
* /data is an EBS volume (ext3 for linux, zfs for solaris)
* See script [disktest1.sh](http://solutious.com/benchmarks/disktest1-sept.17.2008/disktest1.sh.txt)

##Machines##
* m1.small, Fedora 8 Linux 32-bit ([test data](http://solutious.com/benchmarks/disktest1-sept.17.2008/disktest1-linux-small.log))
* m1.small, OpenSolaris 2008.05 32-bit (no test data, killed after 20 minutes)
* m1.large, Fedora 8 Linux 64-bit ([test data](http://solutious.com/benchmarks/disktest1-sept.17.2008/disktest1-linux-large.log))
* m1.large, Solaris Express Community Edition build 79 64-bit ([test data](http://solutious.com/benchmarks/disktest1-sept.17.2008/disktest1-solaris-large.log))
  
##Conclusions##

**Local Disk performance: Linux is much faster.**
* Linux vs OpenSolaris
* OpenSolaris can be up to 30 times slower for 1GB+ files (2s vs 1m)
* About the same for 10MB and 100MB files (~0.02s)
* OpenSolaris swap (/tmp) performance is about 2x slower (2s vs 4s for 1GB)

**Small Linux vs Large Linux**
* Comparable for 10MB files
* m1.small is amall is about 3x slower for 100MB files (0.6s vs 0.2s) 
* m1.small is amall is about 5-8x slower for 1000MB files (12s vs 2s)

**Small OpenSolaris vs Large OpenSolaris**

* The m1.small instance of OpenSolaris is really, really slow for all tests. I stopped the test after 20 minutes (note the m1.large OpenSolaris instance took 6.5 minutes)

**EBS Performance: Linux is faster.**

* Linux vs OpenSolaris
* Solaris performance is about 2.5x slower (2s vs 5s for 1GB)
* Small Linux vs Large Linux
* m1.small is about 2x slower for 10MB (0.05s vs 0.025s)
* m1.small is about 2-3x slower for 100MB (0.6s vs 0.2s)
* m1.small is about 7x slower for 1GB (14s vs 2s)
* Small Solaris vs Large Solaris
* m1.small is REALLY slow. 
  
##Notes##

* The times grew longer for each of the 3 runs (the first run was always the fastest). Try again with a delay in between to account for some kind of background EC2/EBS process to finish.
* There are occasional writes which are very slow for both platforms regardless of which test was being run. 
* The Solaris Express Community Edition is not supported. 

##What you can look forward to in the next test##

* Use standard public EC2 images. Include the ami ID and uname output for each test to be clear in the systems used. 
* Track the total run time for all tests (note: above I only have times for the two large instances).
* Use bonnie-64 test to test caching / swapping performance.
* Use bonnie++ for testing small file performance.
* Restart instances between tests, define warm-up procedure. 

