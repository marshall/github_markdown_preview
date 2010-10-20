Description
============
The purpose of this project is to make it easy to preview [Github Flavor Markdown][] while offline using the same stylesheets and parsing that Github uses.

Requirements
============
- A recent version of [node.js][] (tested with 0.2.3)

Installation
============
No automated installation yet, simply run preview.js from this directory for now

Usage
=====
<pre>Usage: node ./preview.js &lt;markdown file&gt; [-o &lt;html out&gt;] [--bottom]
	By default, HTML output gets printed to stdout
	To read stdin, use "-" as the markdown file
	When --bottom is used, Javascript will be generated to scroll to the bottom of the view when shown in a browser</pre>

Integration with Textmate
=========================

Create a new Command under a Bundle, and use this as the script:
<pre>node=/path/to/node
$node /path/to/preview.js $TM_FILEPATH --bottom</pre>

[node.js]: http://nodejs.org
[Github Flavor Markdown]: http://github.github.com/github-flavored-markdown/