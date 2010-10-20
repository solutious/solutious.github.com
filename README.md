# solutious.com -- README

***NOTE: Use Ruby 1.8.x (something is broken with syntax highlighting in 1.9)***

## First-run

### Install the gems

     gem sources -a http://gems.github.com
     sudo gem install mojombo-jekyll -V --no-ri --no-rdoc
     sudo gem install rdiscount -V --no-ri --no-rdoc 

### Optional dependencies:

1. http://pypi.python.org/pypi/Pygments
2. http://www.gnu.org/software/gsl/#downloading
3. http://rb-gsl.rubyforge.org/ (doesn't compile with Ruby 1.9)


## Running

### Build the site

Check the configuration in _config.yml and from the main project directory, run:

    $ jekyll

The generated site is built under `_site`. 


### Preview the build

    $ jekyll --server

Open in your browser: `http://localhost:8000/`


## Add Post

Make a new file under `blog/_posts`. Copy the filename syntax and YAML content from another post. Then build the site. That's it!

## Templating

The templates are in the `_layouts` directory. 

* `default.html` is the main template for all pages
* `post.html` is a template for the blog posts. It fits inside `default.html`.


See: 

* [Template variables](http://github.com/mojombo/jekyll/blob/master/README.textile)
* [Liquid for Designers](http://wiki.github.com/tobi/liquid/liquid-for-designers)
* [A blog using Jekyll](http://www.oiledmachine.com/posts/)
* [The blog source codes](http://github.com/baz/posts/tree/master)

There's no prohibition on performance.  
  
  