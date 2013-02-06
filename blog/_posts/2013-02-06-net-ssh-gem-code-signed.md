---
layout: post
title: All future Net-SSH gem releases will now be signed (as of 2.6.5)
who: delano
---

In response to the [recent vulnerabilities](/blog/assets/2013/RubyGems13013IncidentStatus.html) with rubygems.org, I spent the morning signing and re-releasing the [Net-SSH family](https://github.com/net-ssh) of ruby gems. The discussion on [how to properly handle code signing](http://guides.rubygems.org/publishing/#gem-security) is still ongoing so this could be just an interrim measure; however, the severity of the problem makes it necessary to have a solution in place now.

## Current Signed Releases ##

As of today, all net-ssh releases will be [signed](http://docs.rubygems.org/read/chapter/21) and verifiable with the public certificate at the end of this post.

* **net-ssh 2.6.5+** ([rubygems](https://rubygems.org/gems/net-ssh/versions/2.6.5), [github](https://github.com/net-ssh/net-ssh/tree/v2.6.5))
* **net-scp 1.0.6+** ([rubygems](https://rubygems.org/gems/net-scp/versions/1.0.6), [github](https://github.com/net-ssh/net-scp/tree/v1.0.6))
* **net-sftp 2.1.1** ([rubygems](https://rubygems.org/gems/net-sftp/versions/2.1.1), [github](https://github.com/net-ssh/net-sftp/tree/v2.1.1))
* **net-ssh-gateway 1.1.2** ([rubygems](https://rubygems.org/gems/net-ssh-gateway/versions/1.1.2), [github](https://github.com/net-ssh/net-ssh-gateway/tree/v1.1.2))
* **net-ssh-multi 1.1.2** ([rubygems](https://rubygems.org/gems/net-ssh-multi/versions/1.1.2), [github](https://github.com/net-ssh/net-ssh-multi/tree/v1.1.2))


## Installation ##

You can still `gem install net-ssh` like you do already but if you want to verify the gem is authentic, you will now be able to run:

    $ gem install net-ssh -P HighSecurity

To do this, you need to add the public certificate to local trust gem certs (otherwise you'll see an error like `"Couldn't verify data signature"`):

    $ curl -O https://raw.github.com/net-ssh/net-ssh/master/gem-public_cert.pem
    $ gem cert --add gem-public_cert.pem

If you have any trouble let me know and I’ll give you a hand.

***Updated (2013-02-06@11:05PST): Updated gem versions.***

## Public certificate ###

<pre><code>
-----BEGIN CERTIFICATE-----
MIIDNjCCAh6gAwIBAgIBADANBgkqhkiG9w0BAQUFADBBMQ8wDQYDVQQDDAZkZWxh
bm8xGTAXBgoJkiaJk/IsZAEZFglzb2x1dGlvdXMxEzARBgoJkiaJk/IsZAEZFgNj
b20wHhcNMTMwMjA2MTE1NzQ1WhcNMTQwMjA2MTE1NzQ1WjBBMQ8wDQYDVQQDDAZk
ZWxhbm8xGTAXBgoJkiaJk/IsZAEZFglzb2x1dGlvdXMxEzARBgoJkiaJk/IsZAEZ
FgNjb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDg1hMtl0XsMuUK
AKTgYWv3gjj7vuEsE2EjT+vyBg8/LpqVVwZziiaebJT9IZiQ+sCFqbiakj0b53pI
hg1yOaBEmH6/W0L7rwzqaRV9sW1eJs9JxFYQCnd67zUnzj8nnRlOjG+hhIG+Vsij
npsGbt28pefuNZJjO5q2clAlfSniIIHfIsU7/StEYu6FUGOjnwryZ0r5yJlr9RrE
Gs+q0DW8QnZ9UpAfuDFQZuIqeKQFFLE7nMmCGaA+0BN1nLl3fVHNbLHq7Avk8+Z+
ZuuvkdscbHlO/l+3xCNQ5nUnHwq0ADAbMLOlmiYYzqXoWLjmeI6me/clktJCfN2R
oZG3UQvvAgMBAAGjOTA3MAkGA1UdEwQCMAAwHQYDVR0OBBYEFMSJOEtHzE4l0azv
M0JK0kKNToK1MAsGA1UdDwQEAwIEsDANBgkqhkiG9w0BAQUFAAOCAQEAtOdE73qx
OH2ydi9oT2hS5f9G0y1Z70Tlwh+VGExyfxzVE9XwC+iPpJxNraiHYgF/9/oky7ZZ
R9q0/tJneuhAenZdiQkX7oi4O3v9wRS6YHoWBxMPFKVRLNTzvVJsbmfpCAlp5/5g
ps4wQFy5mibElGVlOobf/ghqZ25HS9J6kd0/C/ry0AUtTogsL7TxGwT4kbCx63ub
3vywEEhsJUzfd97GCABmtQfRTldX/j7F1z/5wd8p+hfdox1iibds9ZtfaZA3KzKn
kchWN9B6zg9r1XMQ8BM2Jz0XoPanPe354+lWwjpkRKbFow/ZbQHcCLCq24+N6b6g
dgKfNDzwiDpqCA==
-----END CERTIFICATE-----
</code></pre>
