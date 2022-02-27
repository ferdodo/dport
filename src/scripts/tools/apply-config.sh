#!/bin/bash
set -e

function find-files-to-replace {
    find -name "*\.dconf\.*"
}

function build-file {
	CONFIG_KEYS+=" DPORT_WINDOW_WIDTH"
	CONFIG_KEYS+=" DPORT_WINDOW_HEIGHT"

	for KEY in $CONFIG_KEYS; do
		token="__"$KEY"__"

		for file in `find-files-to-replace "$token"`; do
	        VALUE="${!KEY}"
	        REPLACE_REGEX+="s/$token/$VALUE/g;"
	        cat $1 | sed -E "$REPLACE_REGEX" > $2
	    done
	done
}

function outfile {
	echo "$1" | sed -E "s/\.dconf//g"
}

CONFIG_DATE=`date +%s -r ./dport.config.env`

function needs-build {
	test -f $2 || return 0
	test `date +%s -r $1` -gt "$CONFIG_DATE" || return 0
	test `date +%s -r $1` -gt `date +%s -r $2`
}

source ./dport.config.env

for file in `find-files-to-replace`; do
	outfile=`outfile $file`

	if needs-build $file $outfile; then
		build-file $file $outfile
    fi
done
