instagram-realtime
==================

# Overview

instagram-realtime is a nodejs program/library to interact with the instagram
real-time developer api.

Current functionality: subscribe to tags of your choice and respond to
instagram notification callbacks of newly tagged media.

It was originally written to play around with node and the instagram api's
(and tag and display pics of me and friends cycling!).

# Installation

- clone the repo
- npm install
- ./bin/init.sh
- update the following with your instagram developer credentials and your
webhook url
    * ./lib/config.js
    * ./bin/listsubscriptions.sh
    * ./bin/subscribe.sh
    * ./bin/unsubscribe.sh
- update your `response' to media notification (e.g. rcc.py)

# Running

Helper scripts:
    - ./bin/startup.sh
    - ./bin/shutdown.sh
    - ./bin/restart.sh


cadizm // Sun Dec 29 15:03:01 PST 2013
