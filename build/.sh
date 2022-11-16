#!/usr/bin/env bash

# this build script assumes linux environment with node installed

cd ..
npx browserify src/dashboard/.js -o build/firefox/.js
cp src/dashboard/.html build/firefox/.html
cp src/dashboard/.png build/firefox/.png
cp src/dashboard/.woff build/firefox/.woff