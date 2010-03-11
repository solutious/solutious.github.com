---
layout: default
title: "Rudy: Not your grandparents' EC2 deployment tool"
bodyid: products rudy
cotype: product
subnav:
- name: "getting started"
  link: /projects/rudy/getting-started/
- name: "repository"
  link: http://github.com/solutious/rudy
- name: "issues"
  link: http://github.com/solutious/rudy/issues
- name: "rdocs"
  link: http://solutious.com/rudy/
---

<div class="left">
	<div class="rudyPageOverview">
		<h2>Rudy</h2>
		<p class="reparte">TO THE SERVERS, PLEASE!</p>	
		<a class="details" href="http://github.com/solutious/rudy">
			<span class="beta">Version 0.9</span>
			<span class="git">Follow on GitHub</span>
		</a>
		<a class="download" href="http://github.com/solutious/rudy/tarball/latest">download</a>
		<p class="getStarted">... and then <a href="/projects/rudy/getting-started/">get started</a>!</p>
	</div>
  
	<!--a class="screencast" href="/projects/rudy/screencast">
		<h3>WATCH THE SCREENCAST</h3>
		<p>LEARN ALL ABOUT RUDY AND CHEESE</p>
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="437" height="370" id="viddler_1d37bfab"><param name="movie" value="http://www.viddler.com/player/1d37bfab/" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><embed src="http://www.viddler.com/player/1d37bfab/" width="437" height="370" type="application/x-shockwave-flash" allowScriptAccess="always" allowFullScreen="true" name="viddler_1d37bfab"></embed></object>
	</a-->

</div>
<div class="right">
	<h4>Not your grandparents' EC2 deployment tool</h4>
	<p>Rudy is a development and deployment tool for Amazon EC2. Define infrastructure and processes using a powerful Ruby DSL* and Rudy takes care of the rest (like creating security groups and keypairs).</p> 

	
	<div class="snippetTitle">Sample Machine Configuration<span class="snippetSubtitle">Create your environment</span></div>

{% highlight ruby %}
env :stage do         # Define an environment
  ami 'ami-e348af8a'         
                             
  role :app do        # Define a role
    addresses '11.22.33.44'  # Use elastic IPs
                             
    disks do          # Define EBS volumes
      path "/rudy/disk1" do  
        size 100             
        device "/dev/sdr"     
      end                       
    end
  end
end
{% endhighlight %}
	

	<div class="snippetTitle">Sample Routine Configuration<span class="snippetSubtitle">Define your processes</span></div>



{% highlight ruby %}
startup do            # $ rudy startup
  adduser :rudy       
  authorize :rudy     # Enable passwordless login
                             
  disks do                   
    create "/rudy/disk1"     # Create an EBS volume 
  end                       
                            
  remote :rudy do     # Run remote SSH commands
    mkdir :p, "great"        # $ mkdir -p great
    touch "great/scott"      # $ touch great/scott
    ls :l, :a                # $ ls -l -a
  end                          
end
{% endhighlight %}
  	
</div>
