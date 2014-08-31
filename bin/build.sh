#!/bin/bash
BASEDIR=$(dirname $0)
cd $BASEDIR
cd ..
export PATH=$PATH:./node_modules/.bin

browserify -o dist/ezslider.js jQuery/ezslider.js &&
uglifyjs -c -o dist/ezslider.min.js dist/ezslider.js &&

browserify -o dist/ezslider.bullets.js jQuery/ezslider.bullets.js &&
uglifyjs -c -o dist/ezslider.bullets.min.js dist/ezslider.bullets.js &&

browserify -o dist/ezslider.all.js jQuery/ezslider.all.js &&
uglifyjs -c -o dist/ezslider.all.min.js  dist/ezslider.all.js &&

jade -o dist/ examples/
