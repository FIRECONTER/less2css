#!/usr/local/bin/node
var exec = require('child_process').exec,
    path = require('path'),
	fs = require('fs')

var public_dir = path.join(__dirname, "..", "public");

var less_dir = path.join(public_dir, "less", "base.less");
var css_dir = path.join(public_dir, "css", "base.css");

function compile_less(input_file, output_file) {
	var cmd = ['lessc ', input_file, ' > ', output_file].join('');
	exec(cmd, {encoding: 'utf-8'}, 
		function(error, stdout, stderr) {
			if(error !== null) {
				console.log(error);
				return;
			}
			console.log(stdout);
		});
}

console.log('compile ' + less_dir + ' once...');
compile_less(less_dir, css_dir);

console.log('watching file ...');
fs.watchFile(less_dir, { 
		persistent: true, 
		interval: 1000 // 1 sec
	}, 
	function(curr, prev) {
		console.log('the file changed, compile ...');
		compile_less(less_dir, css_dir);
	});