#!/bin/bash
set -e
npm list | grep dport | xargs echo `date --iso-8601=seconds --utc` > version
cat version
