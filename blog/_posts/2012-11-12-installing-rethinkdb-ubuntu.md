---
layout: post
title: Installing RethinkDB on Ubuntu
who: delano
---

**Update: The [installation docs](http://www.rethinkdb.com/docs/install/) for Ubuntu have been updated to make the requirements more clear.**

[RethinkDB](http://www.rethinkdb.com/) has been getting some more attention in the past few days, starting with [a Hacker News post last Friday](http://news.ycombinator.com/item?id=4763879). The project (and company) was founded in 2009, [launched the 1.0 release](http://techcrunch.com/2011/06/06/rethinkdb-expands-beyond-ssds-launches-its-speedy-database-to-the-public/) last year, and although there's still some work to do in terms of stability and portability, it looks promising.

In their words:

<blockquote><i>RethinkDB is built to store JSON documents, and scale to multiple machines with very little effort. It has a pleasant query language that supports really useful queries like table joins and group by, and is easy to setup and learn.</i></blockquote>

![The built-in RethinkDB admin interface](/blog/assets/2012/rethink-admin-freshinstall-s.png "The built-in admin Interface")

## Installation Steps for Ubuntu ##

I only just got it running after much trial and error so I documented the experience to help others in the same boat. The team is working full steam on [resolving issues](https://github.com/rethinkdb/rethinkdb/issues) as they arise so my intent here is one of observation rather than to criticize. Here's what I've gathered so far.

#### Requirements/Limitations ####

* Only runs on x86_64 Linux 
* Depends on [kernel 2.6.37](https://github.com/rethinkdb/rethinkdb/issues/6#issuecomment-10263097) or greater 
* No RPM ([soon](https://twitter.com/rethinkdb/status/267785958278176769))
* <strike>Possible issue with ext4 with journaling and/or encrypted partitions</strike> (update from Slava below)
* <strike>Some compilation issues on Debian/CentOS</strike> (working on a Debian post now)

**Update (Nov 12 @ 16:50 PST): Success with ext2 and ext3/ext4 with journaling enabled.**

**Update (Nov 13): Comment from Slava (below):**

* ***We'll be providing binaries for most platforms and even old kernels, though it will take a bit of time to work out. The portability team here is working around the clock to make it happen.***

* ***Rethink doesn't work on encrypted file systems because they don't support direct io. It makes sense in production, but it'd be nice to have a backup mode for trying in dev. See [issue #47](https://github.com/rethinkdb/rethinkdb/issues/47).***

So make sure you're running the 64-bit of version Ubuntu with a non-encrypted ext2, ext3 or ext4 partition and that the kernel version is 2.6.37 or greater. Then:

    $ sudo apt-get install software-properties-common  # installs add-apt-repository
    $ sudo add-apt-repository ppa:rethinkdb/ppa
    $ sudo apt-get update
    $ sudo apt-get install rethinkdb
    
Things are changing almost hourly so be sure to check their [community page](http://www.rethinkdb.com/community/) and [follow RethinkDB on Twitter](https://twitter.com/rethinkdb) for the latest info.


#### Checking whether journaling is enabled ####

Look for the `has_journal` option in the following output:

    $ sudo debugfs -R features /dev/sda1
    debugfs 1.42.5 (29-Jul-2012)
    Filesystem features: filetype sparse_super
    
You may need to change `/dev/sda1` for your disk device which you can get from the output of `mount`.

#### Checking the kernel version ####

The kernel version is displayed immediately to the right of the hostname:

    $ uname -a
    Linux bs-dev-01 3.5.0-17-generic #28-Ubuntu SMP Tue Oct 9 19:31:23 UTC 2012 x86_64 x86_64 x86_64 GNU/Linux
    