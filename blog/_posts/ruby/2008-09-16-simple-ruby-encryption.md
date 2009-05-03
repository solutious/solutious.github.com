---
layout: post
title: Simple Encryption (in Ruby)
who: delano
---

I occasionally get questions on how we do authentication in Ruby so I thought I'd write this post so I could direct people here. A lot of the authentication stuff we do is based on this simple implementation of [RSA key support](http://blog.leetsoft.com/2006/03/14/simple-encryption). There were a couple minor syntax errors in their [crypto-key.rb](http://blog.leetsoft.com/files/crypto-key.rb.txt) though so here's a fixed version:

{% highlight ruby %}
require 'openssl' 
require 'base64'	# Added 

module Crypto
  
  def self.create_keys(priv = "rsa_key", pub = "#{priv}.pub", bits = 1024)
    private_key = OpenSSL::PKey::RSA.new(bits)
    File.open(priv, "w+") { |fp| fp << private_key.to_s }
    File.open(pub,  "w+") { |fp| fp << private_key.public_key.to_s }    
    private_key
  end
  
  class Key
    def initialize(data)
      @public = (data =~ /^-----BEGIN (RSA|DSA) PRIVATE KEY-----$/).nil?
      @key = OpenSSL::PKey::RSA.new(data)
    end
  
    def self.from_file(filename)    
      self.new File.read( filename )
    end
  
    def encrypt(text)
      Base64.encode64(@key.send("#{key_type}_encrypt", text))
    end
    
    def decrypt(text)
      @key.send("#{key_type}_decrypt", Base64.decode64(text))
    end
  
 def private?()  !@public; end # Added () and ;

 def public?()   @public;  end # Added () and ;
    
    def key_type
      @public ? :public : :private
    end
  end
end
{% endhighlight %}
