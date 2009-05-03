---
layout: post
title: Installing sys-cpu 0.6.0 on OS X 10.5 Leopard
who: delano
---

I was trying to install the 
<a href="http://rubyforge.org/projects/sysutils" title="sysutils at Rubyforge">sys-utils</a> Ruby libraries today and got an error while building sys-cpu on OX 10.5 Leopard. sys-cpu is a multi-platform Ruby library for accessing information about the CPUs and it contains a native extension which needs to be compiled during them installation. This is the error:

    $ sudo gem install sys-cpu
      Building native extensions.  This could take a while...
      ERROR:  Error installing sys-cpu:
      ERROR: Failed to build gem native extension.
      ...
      cpu.c:14:17: error: kvm.h: No such file or directory
      cpu.c:14:17: error: kvm.h: No such file or directory
      cpu.c: In function 'cpu_load_avg':
      ...
      make: *** [cpu.o] Error 1

OS X 10.5 seems to be missing a C header file, kvm.h, that's required by sys-cpu. Here's how you can solve the problem:

* Download a <a href="http://rubyforge.org/frs/download.php/20065/sys-cpu-0.6.0.tar.gz" title="sys-cpu tar.gz">non-gem version</a> and unpack it. 
* Get a copy of kvm.h. If you're running OS X 10.5 that was upgraded from 10.4, you can find it in `/Developer/SDKs/MacOSX10.4.sdk/usr/include`. If not, you can download it from here: <a href="http://solutious.com/r/kvm.h">http://solutious.com/r/kvm.h</a>.
* Copy kvm.h in to sys-cpu-0.6.0/ext
* Inside of sys-cpu-0.6.0, run: `rake test` then `sudo rake install`
* The following command should now run without errors: `ruby -r'sys/cpu' -e 1`. 

That's it!