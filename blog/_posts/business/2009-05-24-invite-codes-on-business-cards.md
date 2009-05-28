---
layout: post
title: How to put invite codes on business cards
who: delano
---

When I started working on [Stella](/products/stella/) last year, my initial plan was to release it as a for-charge testing service. I figured out a way to put unique invite codes on business cards and about halfway through the project I got them printed and started handing them out to people I met at meetups and other events. It turned out to be a pretty handy way to punctuate a good conversation. The only problem was that about a month before launch I decided to switch gears and release the project as an open source tool. That was a good lesson learned! Don't give out invite codes until the product is up and running <a href="#[1]">[1]</a>. In any case, I thought I'd share the process I used to create them for anyone else that's interested in doing something similar.

### The Process ###

* Generate the invite codes
* Batch create images
* Print the cards with [Moo](http://moo.com/) 

### Generate the Invite Codes ###

I wrote a short Ruby script to generate the invite codes in the format `in-XXXXXX`. I added the `in-` to give them a little context and I chose six characters since it's a good balance between uniqueness (`31^6 = 887,503,681`) and readability. I also removed the potentially ambiguous characters -- i, l, o, 0, and 1 -- which also doubles as a handy quick-check for bogus codes. Here's the script:

{% highlight ruby %}
#!/usr/bin/ruby

# Description: Invite code generator
# Usage: ruby genvites [count] [code length]
# 
# e.g.
#
# $ ruby genvites 6 3
# in-5qgczr
# in-enh4v4
# in-7jjab1

chars = (ARGV.size == 1) ? ARGV[0].to_i : 6
count = (ARGV.size == 2) ? ARGV[1].to_i : 50

def strand(len, str='')
   # An Array with ambiguous characters removed: i, l, o, 0, 1
   chars = [('a'..'z').to_a, ('0'..'9').to_a].flatten - %w[i l o 0 1]
   str << chars[rand(chars.size-1)]
   str.size == len ? str : strand(len, str)
end

count.times do 
  puts "in-#{strand(chars)}"
end
{% endhighlight %}

I created an invite codes file with the following commands:

    $ echo "InviteCode" > invites-2009-05-27.csv
    $ ruby geninvites 6 50 > invites-2009-05-27.csv

### Batch Creates Images ###

I used Photoshop so that's the process I describe here but you can use any method that you prefer. You simply need to make 50 images, each with a unique invite code. Other options include [Gimp](http://www.gimp.org/), online image editors like [Pixlr](http://pixlr.com/) and [Aviary](http://aviary.com/home) or even a Ruby/Perl/Python script.

**Step 1:** Create a CSV file containing the invite codes. The first line of the file should contain the column names. If you're using the script and commands above then you will have a file with one column named "InviteCode" and 50 codes (Moo has a limit of 50 unique images per batch of business cards). However you choose to generate the file, it should look like this:

    InviteCode
    in-92gr41
    in-6imab7
    ...

**Step 2:** Create a new image and add a layer with some text in it. The styling of the text will be used for the invite codes. The dimensions of the image depend on the type of card you want to print. For a business card, I used 1040 by 700 at 300 dpi (see this [discussion on Flickr](http://www.flickr.com/groups/moo/discuss/72157605993507176/)). Check [Moo Help](http://us.moo.com/en/help/index.php) for information on image sizes for all product types. Of course, you'll also need to style the image however you like (with a background image or colour). Mine looked like this:

<a class="graphic" href="http://farm4.static.flickr.com/3354/3572255315_f828787ed4_o.png"><img src="http://farm4.static.flickr.com/3354/3572255315_b97eba8481_m.jpg" alt="Photoshop: Image Example" border="0" /></a>

**Step 3:** Add a variable for that layer using *Image &gt; Variables &gt; Define*. The name of the variable needs to match the name of the column (i.e. "InviteCode"). 

<a class="graphic" href="http://farm4.static.flickr.com/3330/3569725337_f741cac35f_o.png"><img src="http://farm4.static.flickr.com/3330/3569725337_85832200e2_m.jpg" alt="Photoshop -&gt; Image -&gt; Variables -&gt; Define" border="0" /></a>
<br/>
<a class="graphic" href="http://farm4.static.flickr.com/3613/3569725403_7bc9330090_o.png"><img src="http://farm4.static.flickr.com/3613/3569725403_1436288125_m.jpg" alt="Photoshop: Define Variables" border="0" /></a>

**Step 4:** Import the CSV file from *Image &gt; Variables &gt; Data Sets* or click "Next" in the *Define* screen. Click the "Import..." button and make sure the two checkboxes are checked ("Use first column" and "Replace existing datasets"). 

<a class="graphic" href="http://farm4.static.flickr.com/3649/3569725463_922facf613_o.png"><img src="http://farm4.static.flickr.com/3649/3569725463_7e6dd9e25e_m.jpg" alt="Photoshop: Import Data" border="0" /></a>

**Step 5:** Generate the unique PSD files with *File &gt; Export &gt; Data Sets as Files*. The default settings will name the files in the format "original-name_invitecode.psd".

<a class="graphic" href="http://farm4.static.flickr.com/3323/3569725537_c2706cee5e_o.png"><img src="http://farm4.static.flickr.com/3323/3569725537_cc920f2fc3_m.jpg" alt="Photoshop: Export Files" border="0" /></a>

**Step 6:** Convert the PSD files to JPG with *File &gt; Scripts &gt; Image Processor*. Select the input folder containing the PSD files, JPG encoding, and the quality. 

<a class="graphic" href="http://farm4.static.flickr.com/3593/3569852523_955101ee51_o.png"><img src="http://farm4.static.flickr.com/3593/3569852523_1e6a33da4b_m.jpg" border="0" alt="Photoshop: Convert PSD to JPG" /></a>


### Take it to the printers ###

It's now time to [start the printing process](http://www.moo.com/en/products/) with Moo <a href="#[2]">[2]</a>. They're interface is pretty self-explanatory so I'll only mention a few things here. 

If you're going with business cards, they have two batch sizes: 50 and 200. Obviously it's cheaper per card to get 200, but they have a limit of 50 unique images (i.e. invite codes) so you'll end up with duplicates (the other card types, like the mini cards allow up to 100 unique images). 

They have several ways to upload photos, including via Flickr. I chose to go the manual route and upload all 50 photos to Moo. My guess is it's probably easier to use a Flickr upload tool, but I haven't tried it. After you've uploaded the photos, you'll be asked to "Add Text". You can enter your business name and contact info here using one of their preset templates or you can upload another image to use instead. If you're uploading an image, you'll need to use the full landscape template as shown here:

<a class="graphic" href="http://farm3.static.flickr.com/2425/3570537526_3e6a29dbd4_o.png"><img src="http://farm3.static.flickr.com/2425/3570537526_32d0fd2f85_m.jpg" border="0" alt="Moo: Select Template" /></a>

The only remaining choice is the type of paper: "Green" or "Classic". A few observations: the 100% recycled paper is chlorine free and has a flat, matte finish. The classic is "elemental chlorine free" and is a bit shiny and fancier looking. I don't understand the environmental implications of either choice so if I don't consider the environment, I'd choose the classic. If the recycled paper does offer an environmental benefit I'd go with that. It's not that the green is unattractive it's just that the classic is more attractive. 

## Conclusion ##

And that's how I put unique invite codes on business cards. It's a bit of work, but it's cheap and it gives people a reason to keep your card. Just make sure you launch the product!


### Notes ###

<p><a name="[1]">&nbsp;</a> [1] I kept track of the codes that I gave out so they'll still work when we do release a product. It's kind of annoying to keep a business card around for an indefinite period of time so if you have one (or had one) just send me an email whenever the time comes and we'll figure it out.</p>

<p><a name="[2]">&nbsp;</a> [2] I recommend Moo because I don't know of any other printer that can produce business cards with unique images for $21.99 (USD). If there are others, let me know!</p>

