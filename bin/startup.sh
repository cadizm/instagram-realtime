#!/bin/bash

BASE_DIR=`dirname $0`"/.."

APP_DIR="${BASE_DIR}/lib"
APP_FILE="${BASE_DIR}/server.js"

PID_DIR="${BASE_DIR}/var/run"
PID_FILE="${PID_DIR}/roys-ig-rt.pid"

LOG_DIR="${BASE_DIR}/var/log"
LOG_FILE="$LOG_DIR/"`date "+%Y-%m-%d_%H-%M-%S"`".log"
#LOG_FILE="$LOG_DIR/tmp.log"

export DEBUG="express:*"
NODE_ENV=dev
(nohup node $APP_FILE & echo $! > $PID_FILE) >$LOG_FILE &
