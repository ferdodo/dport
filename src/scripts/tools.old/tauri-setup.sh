#!/bin/bash
set -e

# generate config
case $PLATFORM in
	linux)
		npx --no-install tauri init --ci > $LOG_OUTPUT
		;;
	windows)
		cmd.exe /C "npx --no-install tauri init --ci"
		;;
esac


# merge with personnal settings
jq -s '.[0] * .[1]' src-tauri/tauri.conf.json tauri.conf.json > tmp.json
mv tmp.json src-tauri/tauri.conf.json
rm tauri.conf.json

# grab version from package.json
jq -s '[.[0], {package: {version: "\(.[1].version)" }}] | .[0] * .[1]' src-tauri/tauri.conf.json package.json > tmp.json
mv tmp.json src-tauri/tauri.conf.json
