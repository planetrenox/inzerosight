#!/usr/bin/env bash
# this build script assumes linux environment with node installed

BLDDIR="../build"

cd build || exit
cd ../src && npx browserify dash.js -o $BLDDIR/built/dash.js
cp dash.html $BLDDIR/built/
cp icon.png $BLDDIR/built/
cp candara.woff $BLDDIR/built/