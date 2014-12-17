
var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;
var util = require('util');

module.exports.spawn_roys = spawn_roys;
module.exports.events = new EventEmitter;

function log(data) {
    console.log(data.toString());
};

function spawn_roys() {
    var cmd = 'rcc.py'; /* needs to be in path */
    console.log('Calling', cmd);
    var roys = spawn(cmd);

    roys.stdout.on('data', log);
    roys.stderr.on('data', log);

    roys.on('close', function(return_code) {
        module.exports.events.emit('roys_done');
    });
}
