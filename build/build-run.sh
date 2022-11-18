#!/usr/bin/env bash
# this build script assumes linux environment with node installed

BLDDIR="../build"

cd ../src && npx browserify dashboard/.js -o $BLDDIR/firefox/.js
cp dashboard/.html $BLDDIR/firefox/.html
cp dashboard/.png $BLDDIR/firefox/.png
cp dashboard/.woff $BLDDIR/firefox/.woff