---
layout: post
title: From Tumblr to WordPress
who: delano
---


We're currently converting our blog from Tumblr to WordPress. We're literally in the middle of it but I wanted to take a moment to explain why we're moving and why we chose WordPress.

## Why we're moving from Tumblr

We accepted Tumblr's strange management for group blogs and the broken archive page for FireFox. But there is one issue that is not excusable: **extremely poor search engine performance**. This issue was brought up a few months ago by [Melissa Chang](http://www.16thletter.com/2008/05/08/why-im-kissing-tumblr-a-sad-sad-good-bye/), a [flurry of discussion](http://friendfeed.com/e/bf7efe81-48eb-4bdc-629c-ee5c55a4a2f2/Why-I-m-kissing-Tumblr-a-sad-sad-good-bye-16th/) ensued, and Tumblr [made some changes](http://staff.tumblr.com/post/35727451/weve-just-made-a-few-changes-to-make-your) Erik Dafforn posted a [more complete chronology](http://seoblog.intrapromote.com/2008/05/tumblr_and_seo.html)). Seven months have passed and Tumblr search engine performance still sucks. 

## Why WordPress

There's surprisingly few choices. We looked at some Ruby options Mephisto, enki, Feather, all have strange quirks. We tried them all (and others) because we thought, "Hey it's been a few years since we installed a blog there must be a new kid on the block". The shocking answer is, *no, there's not* (if you're looking for something with a reasonable installation process). Mephisto wants Rails 2.2.2. Feather has some issues with Merb and won't install anyway because gems.datamapper.com seems to be down. Enki just wouldn't run on Dreamhost (Passenger returned a vague error message but the logs contained nothing helpful). We thought we were on crazy pills but it appears to be reality!

Why WordPress? *Because it works.*

*Update (2008-12-19): WordPress continues to treat us well. I can't say the same for [Disqus](http://disqus.com) however. The wordpress plugin returns broken HTML for the comments_number function (which is why we don't display the comment count on the left)*.

*Update (2009-04-12): We [changed again](/blog/2009/04/10/wordpress-to-jekyll/). The blog is now powered by the static site generator [Jekyll](http://github.com/mojombo/jekyll). Our comments are now powered by [Intense Debate](http://intensedebate.com/). We finally made it home*! 