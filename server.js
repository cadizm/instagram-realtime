
var _ = require('underscore');
var express = require('express');
var util = require('util');
var crypto = require('crypto');
var secret = require('./lib/_secret');
var roys = require('./lib/roys');
var pkg_json = require('./package.json');

var server = express()
    .use(express.logger('dev'));

var roys_running = false;
var DEBUG = pkg_json.config.debug;

process.title = pkg_json.name;

process.on('SIGHUP', function() {
    console.log(Date(), 'SIGHUP, exiting');
    process.exit(0);
});

process.on('exit', function() {
    console.log(Date(), 'Exit with uptime', process.uptime(), 'sec');
});

server.get(pkg_json.config.subscription_url, function(request, response) {
    var params = {
        'hub.mode': 'subscribe',
        'hub.challenge': undefined,
        'hub.verify_token': secret.verify_token,
    };
    var challenge = undefined;

    _.each(params, function(val, key) {
        if (!(key in request.query)) {
            var err_str = 'Insufficient parameters';
            console.log(err_str);
            return response.send(403, err_str);
        }
        else {
            switch (key) {
                case 'hub.mode':
                case 'hub.verify_token':
                    if (request.query[key] != params[key]) {
                        var err_str  = util.format("Bad parameter `%s' with val `%s'",
                                key, request.query[key]);
                        console.log(err_str);
                        return response.send(403, err_str);
                    }
                    break;
                case 'hub.challenge':
                    challenge = request.query[key];
                    console.log('Respond to challenge:', challenge);
                    break;
            }
        }
    });

    response.send(challenge);
});

server.post(pkg_json.config.subscription_url, function(request, response) {
    console.log(request.headers);

    var x_hub_signature = request.headers['x-hub-signature'];
    var buf, digest = undefined;
    var arr = [];

    request.on('data', function(chunk) {
        arr.push(chunk);
    });

    request.on('end', function() {
        buf = Buffer.concat(arr);
        try {
            var obj = JSON.parse(buf.toString());

            digest = crypto.createHmac('sha1',
                    secret.client_secret).update(buf).digest('hex');

            console.log('roys_running', roys_running);
            console.log('x-hub-signature', x_hub_signature);
            console.log('computed digest', digest);
            console.log('DEBUG', DEBUG);

            if (!roys_running && (x_hub_signature == digest || DEBUG)) {
                console.log('Calling spawn_roys()');
                roys_running = true;
                roys.spawn_roys();
            }
            else {
                console.log('Skipped spawn_roys()');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    response.send(200);
});

roys.events.on('roys_done', function() {
    console.log('roys_done');
    roys_running = false;
});

server.listen(pkg_json.config.port);
console.log(Date(), process.title, 'pid', process.pid, 'listening on port', pkg_json.config.port);
