---
layout: default
title: Stella
bodyid: products stella
cotype: product
subnav: 
- name: "getting started"
  link: /projects/stella/getting-started/
- name: "repository"
  link: http://github.com/solutious/stella
- name: "issues"
  link: http://github.com/solutious/stella/issues
- name: "rdocs"
  link: /stella/
---


<div class="left">
	<div class="stellaPageOverview">
		<h2>Stella</h2>
		<p class="reparte">FANCY A TEST?</p>	
		<a class="details" href="http://github.com/solutious/stella">
			<span class="beta">Version 0.8</span>
			<span class="git">Follow on GitHub</span>
		</a>
		<a class="download" href="http://github.com/solutious/stella/tarball/latest">Download</a>
		<p class="getStarted">... and then <a href="/projects/stella/getting-started">get started</a>!</p>
		<p>&nbsp;<!-- or the moustache gets trimmed --></p>
	</div>
  
  <!--
	<a class="screencast" href="/projects/stella/screencast">
		<h3>WATCH THE SCREENCAST</h3>
		<p>LEARN ALL ABOUT STELLA</p>
	</a>
  -->
</div>
<div class="right">
	<h4>Blame Stella for breaking your web application</h4>
	<p>Stella is an agile testing tool for web applications. Software development has changed in a way that demands a new kind of toolset. Stella integrates quickly into your existing development process to help you run functional and performance tests throughout your product lifecycle.</p> 

	
	<div class="snippetTitle">Sample Test Plan<span class="snippetSubtitle">A simple business finder search</span></div>
	

{% highlight ruby %}
usecase "Simple search" do

  get "/search", "Search Results" do
    wait 2..5
    param :what  => 'Big Al'
    param :where => 'Toronto'
    response 200 do
      listing = doc.css('div.listing').first
      set :lid, listing['id'].match(/(\d+)/)[0]
    end
  end
  
  get "/listing/:lid" do      # URIs can contain
    desc "Selected listing"   # variables. See
    wait 1..8                 # the one set in 
                              # the first request? 
    response 200 do           
      status                  # => 200
      headers['Content-Type'] # => ['text/html']
      body                    # => <html>...
      doc                     # => Nokigiri doc
    end                      
  end                              

end
{% endhighlight %}
	
</div>
