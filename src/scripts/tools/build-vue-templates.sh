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
		COMMAND="process.stdout.write(require('@vue/compiler-sfc').compileTemplate({source: require('fs').readFileSync('$1').toString(), id: '0', compilerOptions: {isCustomElement: tag => tag.startsWith('dport-') }}).code)"

		case $PLATFORM in
			linux)
				echo "$COMMAND"| node > $2
				;;
			windows)
				cmd.exe /C "node -e "$COMMAND" > $2"
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
