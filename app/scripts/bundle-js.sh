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
				web)
					BUNDLER=web
					;;
				*)
					echo "Error: unknown bundler !"
					exit -1
					;;
			esac

			shift
			shift
			;;
		--design-system)
			value="$2"

			case $value in
				win98)
					DESIGN_SYSTEM=win98
					;;
				spectre)
					DESIGN_SYSTEM=spectre
					;;
				nes)
					DESIGN_SYSTEM=nes
					;;
				*)
					echo "Error: unknown design system !"
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

if test -z "$DESIGN_SYSTEM"; then
	echo "Error: design system must be specified with the --design-system option !"
	exit -1
fi

function find-files-to-replace {
	grep -rl \
		--exclude-dir=node_modules \
		--exclude-dir=src-tauri \
		--exclude=*.sh \
		$1
}

function replace-expression {
	echo "Replacing $2 for $1"
	sed -i -E "s/$2/$3/g" $1
}

for file in `find-files-to-replace __BUNDLER__`; do
	replace-expression $file __BUNDLER__ "$BUNDLER"
done

for file in `find-files-to-replace __DESIGN_SYSTEM__`; do
	replace-expression $file __DESIGN_SYSTEM__	"$DESIGN_SYSTEM"
done

npx --no-install esbuild --bundle src/index.js \
	--target=chrome80 \
	--external:electron \
	--outfile=dist/bundle.js
