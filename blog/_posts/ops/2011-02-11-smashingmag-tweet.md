---
layout: post
title: How I handled the traffic from a single Smashing Magazine tweet
who: delano
---

Smashing Magazine [tweeted about Stella](http://twitter.com/smashingmag/status/35736314334814208) yesterday. It generated a lot of traffic and quality feedback ([around 130 tweets](/blog/assets/2011-q1/backtype-2011-02-10.png)) so I wanted to write a bit about what I learned. I was away from the helm at the time so there were definitely a few lessons learned!

<p class="graphic"><a href="http://twitter.com/smashingmag/status/35736314334814208"><img src="/blog/assets/2011-q1/smashingmagtweet.png" alt="Smashing Magazine Tweet - February 10th, 2011" border="0" /></a><br/><span class="graphicSubtext">A tweet by <a href="http://www.smashingmagazine.com/" title="Smashing Magazine">Smashing Magazine</a> on February 10th, 2011</span></p>

## The Numbers! ##

I was surprised by how much activity can be generated from a single tweet. 

#### In the first 24 hours ####

* 2629 visitors.
* 4018 checkups.
* 54 signups (2% conversion).

#### The next day (so far, midday) ####

* 449 visitors.
* 889 checkups.
* 9 signups. (2% conversion)

The 2% conversion rate is consistent with the burst of traffic last month from [Hacker News](http://news.ycombinator.com/item?id=2092155). You can see both spikes below in the chart from [Reinvigorate](http://reinvigorate.net/). Stella was also on [Designfridge.co.uk](http://designfridge.co.uk) earlier this week. 

<p class="graphic"><a href="/blog/assets/2011-q1/visitors-2011-02-10.png"><img src="/blog/assets/2011-q1/visitors-s-2011-02-10.png" alt="Reinvigorate Stats - February 10th, 2011" border="0" /></a><br/><span class="graphicSubtext"></span></p>

## What went well ##

* It only took me about 15 minutes to get the site in order once I was able to get in front of my laptop. In that time, I added another front-end machine and added a couple more background workers. 
* Morton and Tucker are working really well in multiple ways. I tried to respond to every criticism and I spread the effort between [Morton](http://twitter.com/mortonblamey), [Tucker](http://twitter.com/tucker1927), [@blamestella](http://twitter.com/blamestella), and [my account](http://twitter.com/solutious) so that I wouldn't overwhelm any one feed with a stream of replies. I (or Morton, rather) successfully turned, ["It takes a while to load. How's that for #irony?"](http://twitter.com/bibinex/status/35736991966433280) into:

<p class="graphic"><a href="http://twitter.com/bibinex/status/35789702397169664"><img src="/blog/assets/2011-q1/bibinextweet-2011-02-10.png" alt=" - February 10th, 2011" border="0" /></a><br/><span class="graphicSubtext"></span></p>

* Short, interesting tag lines are affective. It seems obvious now but "is your site fast?" is the result of about 6 months of iteration. It's a good tagline because it's very short but it's immediately apparent whether Stella would be useful to you. By making your own strong tagline, you're also making it easier for people to tell your story. 

* *Edit*: I also need to give a huge shout out to the guys at [the Still Brandworks](http://stillbrandworks.com). They're the heavy-duty muscle behind the UI/UX which is generating a lot of the positive attention!


## What could have gone better ##

* Well, the ideal scenario involves the site remaining fast and responsive! The site was grinding for about an hour before I could tend to it. There were also a number of precautionary rate limiters that were set too conservatively (eg. the number of checkups that can be run over a given period of time). I applied a couple short-terms fixes for both issues and have a longer-term plan in the works.

<p class="graphic"><a href="/blog/assets/2011-q1/status-2011-02-10.png"><img src="/blog/assets/2011-q1/status-s-2011-02-10.png" alt="Status for www.blamestella.com - February 10th, 2011" border="0" /></a><br/><span class="graphicSubtext"></span></p>

* I got caught [away from the helm](http://twitter.com/solutious/status/35775534579322880). *Someone should always be near the helm.* Of course this is a challenge for a one-man shop and although I don't expect this to be the case for long, I'm going to upgrade to a smartphone soon so I can make quick changes regardless of where I am. My [Samsung x820](http://en.wikipedia.org/wiki/Samsung_SGH-X820) has served me well over the years, but every journey must end.

* Most of the signups were for the free plan. I need to do a better job getting people to the paid plans.

## In summary ##

I had a great time yesterday handling the new traffic and responding to feedback. Welcome to everyone who [signed up](https://www.blamestella.com/pricing) and thanks to all the people who tweeted, [sent feedback](https://www.blamestella.com/feedback) to Tucker, and ran checkups. And thank you [@smashingmag](http://twitter.com/smashingmag)!

You can also [comment on the Hacker News thread](http://news.ycombinator.com/item?id=2208556).
