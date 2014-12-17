#!/bin/bash

BASE_DIR=`dirname $0`"/.."

PID_DIR="${BASE_DIR}/var/run"
PID_FILE="${PID_DIR}/roys-ig-rt.pid"

if [[ -f "$PID_FILE" ]]; then
    PID=`cat $PID_FILE`
    echo "Killing process $PID"
    kill -SIGHUP $PID
    if [[ $? -eq "0" ]]; then
        rm -f $PID_FILE;
    fi
else
    echo "No pid found, possible processes:"
    ps aux | grep 'roys-ig-rt'
fi
