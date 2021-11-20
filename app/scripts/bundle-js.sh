#!/bin/bash
set -e

while [[ $# -gt 0 ]]; do
	key="$1"

	case $key in
		--bundler)
			value="$2"

			case $value in
				tauri)
					BUNDLER=tauri
					;;
				electron)
					BUNDLER=electron
					;;
				*)
					echo "Error: unknown bundler !"
					exit -1
					;;
			esac

			shift
			shift
			;;
	esac
done

if test -z "$BUNDLER"; then
	echo "Error: bundler must be specified with the --bundler option !"
	exit -1
fi

function find-files-to-replace {
	grep -rl --exclude-dir=node_modules __BUNDLER__
}

function replace-expression {
	sed -i -E "s/$2/$3/g" $1
}

for mr in `find-files-to-replace`; do
	replace-expression $mr __BUNDLER__ "$BUNDLER"
done

npx --no-install esbuild --bundle src/index.js \
	--target=chrome80 \
	--external:electron \
	--outfile=dist/bundle.js
