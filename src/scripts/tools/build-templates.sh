#!/bin/bash
set -e

function find-templates {
	find -name template.html | grep -v node_modules
}

function template-outfile {
	echo "$1" | sed -E "s/\.html/\.js/g"
}

function nix-path-to-windows-path {
	wslpath -w $1 | sed 's/\\/\//g'
}

function build-template {
	if needs-build $1 $2; then
		case $PLATFORM in
			linux)
				npx --no-install esbuild --log-level=$ESBUILD_LOG_LEVEL --loader:.html=text $1 --outfile=$2
				;;
			windows)
				wpathin=`nix-path-to-windows-path $1`
				touch $2
				wpathout=`nix-path-to-windows-path $2`
				rm $2
				cmd.exe /C "npx --no-install esbuild --log-level=$ESBUILD_LOG_LEVEL --loader:.html=text $wpathin --outfile=$wpathout"
				;;
		esac
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
