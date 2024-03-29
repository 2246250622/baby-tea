#!/bin/bash

cp src/u.js dist/
uglifyjs dist/u.js > dist/u.min.js
rsync -Cavz --progress dist/* less.ly:www/tire.less.ly/hacking/ujs/

