#!/usr/bin/env bash

esbuild src/assets/js/main.js --outfile=public/js/main.js --bundle "$@"
