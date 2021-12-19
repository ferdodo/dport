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
    echo "Replacing $2 for $1"
    sed -i -E "s/$2/$3/g" $1
}

source ./dport.config.env

CONFIG_KEYS+=" DPORT_WINDOW_WIDTH"
CONFIG_KEYS+=" DPORT_WINDOW_HEIGHT"

for KEY in $CONFIG_KEYS; do
	token="__"$KEY"__"

    for file in `find-files-to-replace "$token"`; do
        value="${!KEY}"
        replace-expression $file $token $value
    done
done
