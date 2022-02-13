#!/bin/bash
set -e

function find-files-to-replace {
	grep -rl \
		--exclude-dir=node_modules \
		--exclude-dir=src-tauri \
		--exclude=*.sh \
		$1
}

function replace-expression {
	if [ -n "$VERBOSE" ]; then echo "Replacing $2 for $1"; fi
	sed -i -E "s/$2/$3/g" $1
}

for file in `find-files-to-replace __BUNDLER__`; do
	replace-expression $file __BUNDLER__ "$BUNDLER"
done

for file in `find-files-to-replace __DESIGN_SYSTEM__`; do
	replace-expression $file __DESIGN_SYSTEM__	"$DESIGN_SYSTEM"
done

case $PLATFORM in
	linux)
		npx --no-install esbuild --bundle app/index.ts \
			--log-level=$ESBUILD_LOG_LEVEL \
			--target=chrome80 \
			--external:electron \
			--outfile=dist/bundle.js \
			--sourcemap
		;;
	windows)
		cmd.exe /C "npx --no-install esbuild --bundle app/index.ts \
			--log-level=$ESBUILD_LOG_LEVEL \
			--target=chrome80 \
			--external:electron \
			--outfile=dist/bundle.js \
			--sourcemap"
		;;
esac
