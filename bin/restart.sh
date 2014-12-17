#!/bin/bash

BASE_DIR=`dirname $0`"/.."

"${BASE_DIR}/bin/shutdown.sh"
"${BASE_DIR}/bin/startup.sh"
