---
layout: post
title: Releasing with Rudy
who: delano
---

I have about [10 active](http://github.com/delano/) [opensource projects](http://github.com/solutious/). I'm lucky because most of them aren't that popular so there's not a lot of overhead. Beyond other people using your work there are some significant advantages in maintaining projects as opensource (I'll talk more about that in a future post). That said, there is additional effort involved so I've automated some tasks with [Rudy](/projects/rudy/) to reduce the repetitive tasks. One such task is the release process. 

*Minor warning: The following is specific to Ruby development on Linux/Unix with git because that where I do most of my work. If you've created configurations for other languages (including projects on Windows) let me know and I'll post them or include them in [the arcade](http://github.com/rudy/arcade/).*


## My Rudy Configuration ##

One of the core features of Rudy is the *routines* configuration. A routine is like a really concise Rake task that can be associated to a particular machine role. A little known fact is that Rudy also supports defining global routines which are available to all machines. 

Rudy looks for global routines in two places: 

* `~/.rudy/`
* `/etc/` (linux only)

I put the following configuration into a file called `~/.rudy/release-routines.rb`.

{% highlight ruby %}
commands do
  allow :rm
end

routines do
  
  publish do
    before :package_test, :publish_docs
    local do
      project = File.basename pwd.first
      puts "PUBLISH #{project}", $/
    end
    after :publish_github, :publish_gem
  end
  
  package_test do
    local do
      puts 'Creating Test package...'
      rake 'package', 'clean'
    end
  end
  
  publish_docs do
    before :publish_rubyforge_docs, :publish_github_docs
  end
  
  publish_rubyforge_docs do
    local do
      puts 'Updating Rubyforge docs...'
      rake 'publish:rdoc', 'clean'
    end
  end
  
  publish_github_docs do
    local do
      rake 'rdoc'
      if file_exists?('doc')
        puts 'Updating Github Pages...'
        git 'checkout', 'gh-pages'
        rm :r, :f, 'files', 'classes' 
        unsafely { mv 'doc/*', '.' }
        rm :r, :f, 'doc'
        git 'add', '.'
        git 'commit', :a, :m, 'Updated docs'
        
        git 'checkout', 'master'
        git 'push'
      else
        puts 'No docs directory'
      end
    end
  end
  
  publish_github do
    local do
      puts 'Pushing to GitHub...'
      git 'tag', :f, 'latest'
      git 'push', '--all'
      git 'push', '--tags'
    end
  end
  
  publish_gem do
    local do
      puts 'Publishing Rubyforge gem...'
      rake 'publish:gem', 'clean'
    end
  end
  
end
{% endhighlight %}
<span class="graphicSubtext">The Rudy configuration I use to create releases of my open source projects. </span>


## My Release Process ##

With the configuration above in place, I can run the release routines I created from any directory on my machine. But before I run anything, I get the project into a consistent state. 

* Update the change log (usually `CHANGES.txt`)
* Commit all my local changes. 
* Update file manifest and dependencies in the gemspec file (if necessary)
* Increment the release number in all appropriate locations and check in the changes with an appropriate message. 

Then I run the following simple command from the project directory:

    $ rudy publish

There's huge value in being able to define a routine in one location yet be able to run it from each individual project directory. It establishes a standard process for all of your projects which reduces overhead (including the mental workload) and increases consistency. 

For example, you'll note the `publish_github` routine creates a tag called "latest". That allows me to refer to that tag in long-running or rarely updated documentation when I talk about the most recent release. It's little things like that that make a big difference over the long run. Both in terms of my time and the visible consistency of a project. 






