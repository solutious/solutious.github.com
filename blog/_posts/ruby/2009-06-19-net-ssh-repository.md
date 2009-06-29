---
layout: post
title: A new repository for Net::SSH
who: delano
---

I use [Net::SSH](http://net-ssh.rubyforge.org/) quite extensively in [Rudy](/products/rudy/) and [Rye](http://github.com/delano/rye/) so I was concerned about the future of the project when Jamis Buck [announced his departure](http://weblog.jamisbuck.org/2009/2/25/net-ssh-capistrano-and-saying-goodbye) from the project back in February. It's a great library and without it I would not be able to do this:

{% highlight ruby %}
script :root do
  tar :z, :x, :f, 'bonnie64.tar.gz'
  mv 'bonnie64', '/tmp/bonnie64'
  cd '/tmp/bonnie64'
  make 'SysV'
end
{% endhighlight %} 
<span class="graphicSubtext">A configuration snippet from my <a href="http://github.com/solutious/ebstest/tree/2009-06-19" title="GitHub: EBS Test respository">Amazon EBS test</a> demonstrating Rudy's shell script style DSL.</span>

A few weeks ago I ran into a connection problem with Solaris. The issue was related to the encryption modes supported by Net::SSH and was [first reported](http://rubyforge.org/tracker/index.php?func=detail&aid=23742&group_id=274&atid=1123) back in January. Luckily a patch was recently posted by Denis Bernard which I reviewed and applied to my local copy. Problem solved. 

Well, my initial problem was solved but not the greater problem of Net::SSH maintenance. I really appreciate the time Jamis has put in to Net::SSH and I want to make sure the library continues to be maintained.


### A New Repository ###

I figured other people could benefit from this patch and there will likely be more patches to come so I [forked the Net:SSH repository](http://github.com/net-ssh/net-ssh/) on GitHub with the canonical net-ssh user. I've applied the patch mentioned above, updated the test suite, and incremented the version to 2.0.12. I also added a gemspec file so the gem can be distributed via GitHub:

    $ sudo gem install net-ssh-net-ssh --source=http://gems.github.com/

### An Interim Maintainer ###

I have a hunch there are other developers out there who are willing and able to make contributions to the project. My intent is simply to help organize that effort. I plan to apply pull requests and patches but I do not plan to continue feature development myself at this time. For those interested in contributing, I'm happily accepting patches, pull requests, and even suggestions for minor changes. You can email me at `net-ssh@solutious.com`. If this is successful and/or helpful to the community, I'll fork over Net::SCP and the rest of the crew as well. 

A final note: I am not a security professional so if anyone has experience in this area and is interested in reviewing changes before they're pulled into the repo please contact me.




