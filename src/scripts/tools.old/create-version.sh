#!/bin/bash
set -e
echo `date --iso-8601=seconds --utc` > dist/version
