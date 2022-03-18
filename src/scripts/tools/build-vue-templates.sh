#!/bin/bash
set -e

function find-templates {
	find app -name "*.html"
}

function template-outfile {
	echo "$1" | sed -E "s/\.html/\.js/g"
}

function build-template {
	if needs-build $1 $2; then
		case $PLATFORM in
			linux)
				npx --no-install vue-compiler-dom-cli --infile $1 --outfile $2 --custom-element-regexp dport- --mode module
				;;
			windows)
				cmd.exe /C "npx --no-install vue-compiler-dom-cli --infile $1 --outfile $2 --custom-element-regexp dport- --mode module"
				;;
		esac

		if [ -n "$VERBOSE" ]; then echo "Build template to vue render function for $1"; fi
	else
		if [ -n "$VERBOSE" ]; then echo "Already built $1"; fi
	fi
}

function needs-build {
	test -f $2 || return 0
	test `date +%s -r $1` -gt `date +%s -r $2`
}

for template in `find-templates`; do
	build-template $template `template-outfile $template`
done
