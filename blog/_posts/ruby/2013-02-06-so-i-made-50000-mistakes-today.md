---
layout: post
title: So I made over 52,000 mistakes today
who: delano
---

Earlier today I [updated](/blog/2013/02/06/net-ssh-gem-code-signed/) the net-ssh family of Ruby gems and I broke one of the rules of [semantic versioning](http://semver.org/). Rule #8:

    8. Minor version Y (x.Y.z | x > 0) MUST be incremented if new,
    backwards compatible functionality is introduced to the public API.

I broke [Chef](tickets.opscode.com/browse/CHEF-3835). I broke [Vagrant](https://github.com/mitchellh/vagrant/issues/1355). net-ssh is pretty far upstream so in just a couple hours there were over 52,000 installs of the offending gems, *much to the chagrin of sysadmins and devops folks everywhere.*

*Note: If you have any of the following gems installed on your system, you should remove them: net-ssh-gateway-1.1.1, net-ssh-gateway-1.1.2, net-ssh-multi-1.1.1, net-ssh-multi-1.1.2, net-scp-1.0.5, and net-scp-1.0.6. See my [previous post](/blog/2013/02/06/net-ssh-gem-code-signed/).*

## The err of my ways

I released three gems with the PATCH incremented instead of the MINOR version number. This makes a huge difference downstream because of the "[twiddle-wakka](http://twiddlewakka.com/)":

    # Meanwhile, in chef.gemspec
    s.add_dependency "net-ssh", "~> 2.2.2"
    s.add_dependency "net-ssh-multi", "~> 1.1.0"

The `~>` will [fuzzily match](http://robots.thoughtbot.com/post/2508037841/rubys-pessimistic-operator) any gems less than `1.2` but greater than or equal to `1.1.0`. This feature strikes a balance between `">= 1.1.0"` (which is too loose) and `"= 1.1.0"` (which is too strict). The problem is that net-ssh-multi-1.1.2 *changed the net-ssh dependency to 2.6.5* which made Chef uninstallable due to the conflict between chef.gemspec and net-ssh-multi.gemspec (2.2.x vs 2.6.5). Feels bad man.

**So if I ruined your day, [send me](https://onetimesecret.com/feedback) your email, Twitter, Skype, or phone number and I will reply with a personal apology.**

<p style="color: #999; font-size: 80%">(Offer expires Feb 12th at 07:59 UTC).</p>

## On a more positive note

**A big thank you to everyone who emailed, tweeted, and opened issues to help get this resolved quickly.** Although regrettable, this is the only significant issue with net-ssh and friends in the [4 years](http://solutious.com/blog/2009/06/19/net-ssh-repository/) (and [18M downloads](https://rubygems.org/profiles/delano)) that I've been maintaining them. I feel pretty good about that.

Incidentally, I updated the [THANKS.txt](https://github.com/net-ssh/net-ssh/blob/v2.6.5/THANKS.txt) that's part of every net-ssh release today too. I added the names of all the people who contributed code since I've been maintaining it. Here they are:

* GOTOU Yuuzou
* Guillaume Marçais
* Daniel Berger
* Chris Andrews
* Lee Jensen
* Hiroshi Nakamura
* Andreas Wolff
* mhuffnagle
* ohrite
* iltempo
* nagachika
* Nobuhiro IMAI
* arturaz
* dubspeed
* Andy Brody
* Marco Sandrini
* Ryosuke Yamazaki
* muffl0n
* pcn
* musybite
* Mark Imbriaco
* Joel Watson
* Woon Jung
* Edmund Haselwanter
* robbebob
* Daniel Pittman
* Markus Roberts
* Gavin Brock
* Rich Lane
* Lee Marlow
* xbaldauf
* Delano Mandelbaum
* Miklós Fazekas
* Andy Lo-A-Foe
* Jason Weathered
* Hans de Graaff
* Travis Reeder
* Akinori MUSHA
* Alex Peuchert
* Daniel Azuma
* Will Bryant
* Gerald Talton
* ckoehler
* Karl Varga
* Denis Bernard
* Steven Hazel
* Alex Holems
* Andrew Babkin
* Bob Cotton
* Yanko Ivanov
* Angel N. Sciortino
* arilerner@mac.com
* David Dollar
* Timo Gatsonides
* Matthew Todd
* Brian Candler
* Francis Sullivan
* James Rosen
* Mike Timm
* guns
* devrandom
* kachick
* Pablo Merino
* thedarkone
* czarneckid
* jbarnette
* watsonian
* Grant Hutchins
* Michael Schubert
* mtrudel
* and of course, [Jamis Buck](https://twitter.com/jamis).

I know I'm not the only one who appreciates your time and effort. Thank you for making net-ssh better!
