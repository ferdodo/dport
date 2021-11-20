#!/bin/bash
set -e

function find-templates {
	find -name template.html | grep -v node_modules
}

function template-outfile {
	echo "$1" | sed -E "s/\.html/\.js/g"
}

function build-template {
	npx --no-install esbuild --loader:.html=text $1 --outfile=$2
}

function needs-build { 
	test -f $2 || return 0
	test `date +%s -r $1` -gt `date +%s -r $2`
}

for template in `find-templates`; do
	outfile=`template-outfile $template`

	if needs-build $template $outfile; then
		build-template $template $outfile
	else
		echo "Already built $template"
	fi
done
