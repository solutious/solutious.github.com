---
layout: default
title: Stella
bodyid: products stella
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

# Getting Started 

This document will get you started with Stella in about 5 minutes. By the end you'll be able to run sophisticated tests on your web applications. 

*Note: The current release of Stella (0.7) is in BETA status. That means Stella is still a work in progress, but I wanted to make it available as soon as it was useful.*

This document covers the following steps:

* _Installation_
* _Test Plan Configuration_
* _Running Stella_


## Installation ##

You can download Stella as a <a href="http://github.com/solutious/stella/tarball/latest">tar</a> or <a href="http://github.com/solutious/stella/zipball/latest">zip</a> or install via Rubygems\*:

<pre><code>  $ sudo gem install stella</code></pre>
  
*\*Note: Stella requires [Ruby](http://www.ruby-lang.org/en/downloads/) (1.8 or 1.9), or [JRuby](http://jruby.org/download) 1.3+. *


## Test Plan Configuration ##

Test plans are written in Ruby, using a domain-specific syntax. That means that you can use the full power of Ruby in your configuration which is a critical part of running sophisticated tests. 

The simplest possible usecase looks like this:

{% highlight ruby %}
usecase do
  get "/"
end
{% endhighlight %}

<span class="graphicSubtext">example-1.rb</span>

Here is a more thorough example which combines several usecases into a single plan:

{% highlight ruby %}
desc "Beverage Finder"
usecase 65, "Search" do
  
  get "/", "Homepage" do
    wait 1..3
  end
  
  get "/search", "Search Results" do
    wait 2..3
    param :what  => "Sarsaparilla"
    param :where => "Lexington"
    response 200 do      
      listing = doc.css('div.listing').first
      set :lid, listing['id'].match(/(\d+)/)[0]
    end
    response 404 do 
      quit "No results"
    end
  end
  
  get "/listing/:lid", "Selected beverage"
         
end

usecase 25, "YAML API" do
  
  get '/listings.yaml', "View All" do
    response 200 do    
      listings = doc.collect! { |l|; l[:id]; }
      
      set :listing_ids, listings
    end
  end

  get "/listing/:lid.yaml", "Select Listing" do
    param :lid => rsequential(:listing_ids)    
    response 200 do
      repeat 7
    end
  end
  
end

usecase 10, "Self-serve API" do

  post "/listing/add", "Add a listing" do
    param :name => random(8)
    param :city => random(['Toronto', 'Vancouver', 'Montreal'])
    param :logo => file('logo.png')
    response 302 do
      repeat 3
    end
  end
  
end

{% endhighlight %}
<span class="graphicSubtext">example-2.rb</span>

## Running Stella ##

Stella is run from the command line like so:

    $ stella [global options] COMMAND [command options]

The 3 main commands are: preview, verify, and generate.

### Preview ###

The `preview` command parses and displays a test plan from the eyes of Stella. You use this command to ensure the test plan was written correctly an there are no errors. 

    $ stella preview -p path/2/example-2.rb
     Product Finder  (e66cfb)                                            
      Simple search  (6803c7)                                       65% 
        Homepage  (e374b3)                                            
          GET /
        Search Results  (a54d1e)                                      
          GET /search
        Selected listing  (1d303b)                                    
          GET /listing/:lid
      YAML API  (7adb64)                                            25% 
        View All  (7df521)                                            
          GET /listings.yaml
        Select Listing  (d8cadd)                                      
          GET /listing/:lid.yaml
      Self-serve API  (ba9e05)                                      10% 
        Add a listing  (1a3c2d)                                       


### Verify ###

The `verify` command executes the test plan with a single virtual client (also known as a virtual user). You use this command to verify that your application and the test plan are functioning correctly. 

    $ stella verify -p path/2/example-2.rb hostname:port
     Product Finder  (e66cfb)                                           
     Simple search  (6803c7)                                           
       http://bff.heroku.com:80                                    200
       http://bff.heroku.com:80/search                             200
       http://bff.heroku.com:80/listing/1000                       200
     YAML API  (7adb64)                                                
       http://bff.heroku.com:80/listings.yaml                      200
       http://bff.heroku.com:80/listing/91229.yaml                 200
       http://bff.heroku.com:80/listing/67992.yaml                 200
       http://bff.heroku.com:80/listing/75621.yaml                 200
       http://bff.heroku.com:80/listing/14903.yaml                 200
       http://bff.heroku.com:80/listing/1007.yaml                  200
       http://bff.heroku.com:80/listing/1006.yaml                  200
       http://bff.heroku.com:80/listing/1005.yaml                  200
       http://bff.heroku.com:80/listing/1004.yaml                  200
     Self-serve API  (ba9e05)                                          
       http://bff.heroku.com:80/listing/add                        302
       http://bff.heroku.com:80/listing/add                        302
       http://bff.heroku.com:80/listing/add                        302
       http://bff.heroku.com:80/listing/add                        302
    

See `stella verify -h` for more info.

### Generate ###

The `generate` command executes the test plan with 1 or more concurrent virtual clients. YOu use this command to see how your application performs under realistic load conditions. 

    $ stella generate -c 50 -p path/2/example-2.rb hostname:port
    Preparing 50 virtual clients...
    Generating requests for 1 reps...
    Processing statistics...
    
     Product Finder  (e66cfb)                                                  
      Simple search  (6803c7)                                               65% 
       Homepage  (e374b3)                                                       
        GET /
          do_request                     0.189 <= 0.598s >= 1.492; 0.323(SD) 32(N)
    
       Search Results  (a54d1e)                                                 
        GET /search
          do_request                     0.030 <= 0.062s >= 0.248; 0.062(SD) 32(N)
    
       Selected listing  (1d303b)                                               
        GET /listing/:lid
          do_request                     0.032 <= 0.040s >= 0.061; 0.008(SD) 11(N)
    
       Sub Total:
          Total requests                 75 (200: 54, 404: 21)
           success                       75
           failed                        0
          do_request                     0.288s 0.344(SD)
          response_content_size          71.85KB      (avg:958.03B)
    
      YAML API  (7adb64)                                                    25% 
       View All  (7df521)                                                       
        GET /listings.yaml
          do_request                     0.683 <= 1.027s >= 1.326; 0.215(SD) 12(N)
    
       Select Listing  (d8cadd)                                                 
        GET /listing/:lid.yaml
          do_request                     0.041 <= 0.170s >= 0.356; 0.106(SD) 96(N)
    
       Sub Total:
          Total requests                 108 (200: 108)
           success                       108
           failed                        0
          do_request                     0.266s 0.296(SD)
          response_content_size          15.97KB      (avg:147.89B)
    
      Self-serve API  (ba9e05)                                              10% 
       Add a listing  (1a3c2d)                                                  
        POST /listing/add
          do_request                     0.107 <= 0.469s >= 1.030; 0.363(SD) 20(N)
    
       Sub Total:
          Total requests                 20 (302: 20)
           success                       20
           failed                        0
          do_request                     0.469s 0.363(SD)
          response_content_size          0.00B        (avg:0.00B)
    
      Total:                                                             
          Total requests                 203
           success                       203 (req/s: 19.08)
           failed                        0
          do_request                     0.294s     0.325(SD)
          response_content_size          87.82KB      (avg:432.63B)
    
    Summary: 
      max clients: 49
      repetitions: 1
        test time:      10.64s
        post time:       0.17s
    

This report needs some love but it contains some very useful data. The lines that look like `0.189 <= 0.598s >= 1.492; 0.323(SD) 32(N)` refer to the minimum, mean, and maximum times along with the standard deviation and number samples. 

See `stella generate -h` for more info.

