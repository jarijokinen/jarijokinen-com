#!/usr/bin/env bash

esbuild src/assets/js/main.js --outfile=public/js/main.js --bundle "$@" &
esbuild node_modules/@jarijokinen/consent/src/consent-loader.js \
  --outfile=public/js/consent-loader.js --bundle "$@" &

wait
