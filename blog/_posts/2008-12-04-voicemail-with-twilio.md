---
layout: post
title: A Basic Voicemail System using Twilio
who: delano
---


We setup a voicemail system this week using [Twilio](http://twilio.com/). There are [other similar services](http://thethomashowecompany.com/449/twilio-comes-out) but Twilio was the first one we've found that's both available ([CloudVox](http://cloudvox.com/) is in private beta) and *really* simple to get started. 

If you aren't familiar with it, Twilio is a voice communication system with an [HTTP/XML API](http://www.twilio.com/docs/api_reference/TwiML/). You create an account with them and they give you a phone number and an API key. Then you write some code that outputs XML (they have [libraries for Ruby, Java, Python, and PHP](http://www.twilio.com/docs/libraries/) and configure your account to point to an XML resource to handle the initial incoming call.  They charge $0.03 or $0.05 cents per minute depending on whether you're using a local or toll free number. 

We've posted [one of our test configurations](http://gist.github.com/31922) to Gist (we blame the PHP on the intern :p sorry Dave). Here's our initial feedback:

* The XML is based on simple verbs ([Play](http://www.twilio.com/docs/api_reference/TwiML/play), [Say](http://www.twilio.com/docs/api_reference/TwiML/say), [Record](http://www.twilio.com/docs/api_reference/TwiML/record)...) so it's easy to get started. I've read complaints about using XML in this way, usually on the basis that it's over simplified and proprietary, but I disagree. If something can be simplified, simplify it. And if it's easy to work with, the fact that it's a proprietary language doesn't matter. (On a side note, is there a standard, open language for controlling voice communication systems?)
* The debugger is pretty cool. You can look at the recent requests and responses between their system and your web service. We solved two problems like this (XML encoding issues, *again*). 
* The mp3s don't play properly in Safari (we're running 3.2.1). It displays a [black screen that says "No video"](http://farm4.static.flickr.com/3234/3081614839_acdda24cac.jpg?v=0). Sometimes it will play after you hit the spacebar, sometimes not. Firefox is fine. *Update: this looks like it could be related to Flip4Mac, which I updated last week. The same thing is happening with other mp3s.* 
* I somewhat concerned about jerks calling in many times or for long durations to charge up our bill. This is an issue with all similar services but I didn't see anything in the docs or API that would prevent this in Twilio. 
* The prices are reasonable for moderate use but I expect they should decrease as their customer base increases (they should be able to negotiate lower rates from their suppliers). 
* Their customer service is excellent! We experienced it and so did our friends at [Dealer Diagnostics](http://dealerdiagnostics.com/).

We'll be looking at other options and we'll post our findings here.