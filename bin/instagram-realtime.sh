#!/bin/bash

export DEBUG="express:*"
BASE_DIR=`npm root -g`"/instagram-realtime"
NODE_ENV=production node ${BASE_DIR}"/server.js"
