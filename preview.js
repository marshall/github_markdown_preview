/* github_markdown_preview
 * Licensed under the Apache License, Version 2.0, see LICENSE
 *
 * Modified for node.js from:
 *   http://github.github.com/github-flavored-markdown/scripts/preview.js
 */

var path = require('path'),
	fs = require('fs');

require.paths.unshift(path.join(__dirname, 'lib'))

var usageString = 'Usage: $0 <markdown file> [-o <html out>] [--bottom]\n';
usageString += '  By default, HTML output gets printed to stdout\n';
usageString += '  To read stdin, use "-" as the markdown file\n';
usageString += '  When --bottom is used, HTML will be generated to scroll to the bottom of the view when shown in a browser\n';

var argv = require('optimist').usage(usageString).demandCount(1).argv;
var markdownFile = argv._[0]
var Showdown = require('showdown').Showdown;
var converter = new Showdown.converter();
var markdown = "";

function generateHtml() {
	var markdownHtml = converter.makeHtml(markdown);
	markdownHtml = markdownHtml.replace(/>/g, ">\n")
		.replace(/</g, "\n<").replace(/\n{2,}/g, "\n\n")

	var cssPath = path.join(path.dirname(__filename), 'markdown.css');
	cssPath = cssPath.replace('\\', '/');
	
	html = "<html><head>\n";
	if (markdownFile != '-') {
		basepath = path.dirname(markdownFile);
		html += '<base href="file://' + basepath + '/"/>\n'
	}
	html += '<link href="file://' + cssPath + '" media="screen" rel="stylesheet" type="text/css"/>\n';
	html += '</head><body><div class="wikistyle">\n'
	html += markdownHtml
	if (argv.bottom) {
		html += '<a name="_markdown_bottom"></a><script type="text/javascript">window.location.href += "#_markdown_bottom";</script>\n';
	}
	html += '\n</div></body></html>';

	if (!('o' in argv)) {
		process.stdout.write(html);
	} else {
		var htmlOut = argv.o;
		fs.writeFile(htmlOut, html, function(err) {
			if (err) throw err;
			console.log('HTML output saved to: ' + htmlOut);
		});
	}
}

if (markdownFile == '-') {
	var stdin = process.openStdin();
	stdin.setEncoding('utf8');
	stdin.on('data', function(chunk) {
		markdown += chunk.toString()
	});
	stdin.on('end', function(chunk) {
		generateHtml();
	});
} else {
	markdown = fs.readFileSync(markdownFile, 'utf8');
	generateHtml();
}
