#!/bin/bash
set -e

# generate config
npx --no-install tauri init --ci > $LOG_OUTPUT

# merge with personnal settings
jq -s '.[0] * .[1]' src-tauri/tauri.conf.json tauri.conf.json > tmp.json
mv tmp.json src-tauri/tauri.conf.json

# grab version from package.json
jq -s '[.[0], {package: {version: "v\(.[1].version)" }}] | .[0] * .[1]' src-tauri/tauri.conf.json package.json > tmp.json
mv tmp.json src-tauri/tauri.conf.json

# set icon
npx --no-install tauri icon icon.png > $LOG_OUTPUT
