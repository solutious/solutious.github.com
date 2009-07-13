---
layout: post
title: Command-line Twitter with Bash
who: delano
---

    $ tweet "The sun is out and I am going to make a sandwich. #montreal #food"
<span class="graphicSubtext"><a href="http://twitter.com/solutious/status/2620100947">Some minutes ago</a> from web</span>

I found a [gist](http://gist.github.com/143067) the other day by [defunkt](http://github.com/defunkt) with a bash function for posting to Twitter from the command-line. It's a cute hack but it was insecure so I updated it to work securely over HTTPS.

### Step 1: Update ~/.bashrc

{% highlight bash %}
# $ tweet "your message"
#
# See: http://solutious.com/blog/2009/07/13/bash-twitter/
#
# Contributors
# * @defunkt for the initial version
# * @anildigital and @grundprinzip for curl-fu
# * @solutious for the SSL sexytime

# See: http://curl.netmirror.org/docs/caextract.html
CERTS_URI=http://curl.haxx.se/ca/cacert.pem

# SHA1 digest for file: Thu Mar 26 21:23:06 2009 UTC
# NOTE: This needs to be updated when cacert.pem is updated
CERTS_DIGEST=331b7e928bd758146ef4a17fee59a63e6ad6b10a

# Path to local copy of CA extract 
CERTS_FILE=~/.cacerts.pem

function tweet {
  verifycerts || return 1
  if [ ! "$*" ]; then
    echo 'Nothing to tweet!'
    return 1
  fi
  curl --cacert $CERTS_FILE -n -d status="$*" https://twitter.com/statuses/update.xml > /dev/null 2>&1
  echo "tweet'd '$*'"
} 

# Download extract of CA certs from mozilla.org 
function updatecerts {
  curl $CERTS_URI > $CERTS_FILE 2> /dev/null
  verifycerts
  echo "Saved to $CERTS_FILE"
}

# Make sure the CA certs match the sha1 digest
function verifycerts {
  if [ ! -f $CERTS_FILE ]; then
    echo "$CERTS_FILE does not exist."
    echo "Try running: updatecerts"
    return 1
  fi

  openssl sha1 $CERTS_FILE | grep $CERTS_DIGEST > /dev/null
  if [ $? != 0 ]; then
    echo "Digest mismatch for $CERTS_FILE (maybe it was updated?)"
    return 1
  fi
  return 0
}
{% endhighlight %}

### Step 2: Update ~/.netrc ###

Put your twitter credentials into `~/.netrc`. This file is read by curl.  

    # put this in ~/.netrc
    machine twitter.com
    login USERNAME
    password PASSWORD

Then update the file permissions so only you can read it:

    $ chmod 600 ~/.netrc
  
### Step 3: Update SSL certs ###

    $ source ~/.bashrc
    $ updatecerts

This downloads a copy of the Mozilla SSL [certificate authority bundle](http://curl.netmirror.org/docs/caextract.html) to ~/.cacerts.pem. curl uses this file to verify the SSL certificate for http://twitter.com/

### Step 4: Tweet! ###

    $ tweet "Anything at all"

### Errors ###

    Digest mismatch for $CERTS_FILE (maybe it was updated?)

This probably means that the Mozilla SSL [certificate authority bundle](http://curl.netmirror.org/docs/caextract.html) has been updated. First check that the date in the [bundle](http://curl.haxx.se/ca/cacert.pem) is later than "Thu Mar 26 2009". If it is, then you need to do the following:

* Download the latest copy of the bundle by running `updatecerts` (ignore the error)
* Update `CERTS_DIGEST` in `~/.bashrc` with the output from: `openssl sha1 $CERTS_FILE`

If the date has not changed, the `~/.cacerts.pem` file has been modified. It may have been tampered with or corrupted. Delete it an run `updatecerts` again.


### Contributors ###

* [@defunkt](http://twitter.com/defunkt)
* [@anildigital](http://twitter.com/anildigital)
* [@grundprinzip](http://twitter.com/grundprinzip)
* [@solutious](http://twitter.com/solutious)

If I missed anyone, please let me know!

