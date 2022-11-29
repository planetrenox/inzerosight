#!/usr/bin/env bash
# this build script assumes linux environment with node installed

BLDDIR="../build"

cd build
cd ../src && npx browserify .js -o $BLDDIR/firefox/.js
cp .html $BLDDIR/firefox/.html
cp .png $BLDDIR/firefox/.png
cp .woff $BLDDIR/firefox/.woff