#!/bin/bash
set -e

while [ $# -ne 0 ]
do
    arg="$1"
    case "$arg" in
        --build-rust-cache)
            buildRustCache=true
            ;;
    esac
    shift
done


# generate config
npm run tauri init

# merge with personnal settings
jq -s '.[0] * .[1]' src-tauri/tauri.conf.json tauri.conf.json > tmp.json
mv tmp.json src-tauri/tauri.conf.json

# grab version from package.json
jq -s '[.[0], {package: {version: .[1].version }}] | .[0] * .[1]' src-tauri/tauri.conf.json package.json > tmp.json
mv tmp.json src-tauri/tauri.conf.json

# set icon
npm run tauri icon --icon icon.png

# validate config
npm run tauri info

# prebuild Rust cache
if [ "$buildRustCache" == true ]; then
	mkdir -p dist
	touch dist/index.html
	npm run tauri build
	npm run tauri build --debug
	rm -r /dport/app/dist
fi