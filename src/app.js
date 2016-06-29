'use strict';

var Server = require('home').Server;

var Display = require('./display.js');

var READ_INTERVAL = 1000;
var MAX_DATA_LENGTH = 128;
var PORT = 80;

function App(sensor, lcd) {
    this._sensor = sensor;
    this._display = new Display(lcd, 4, 'lx');

    this._data = [];
    this._disposed = false;

    this._readNext();

    this._setupServer();
}

App.prototype._setupServer = function () {
    var that = this;

    var server = new Server();

    server.use('/', Server.static('static'));

    server.get('/api/data', function (req) {
        var timestamp = Number(req.query.timestamp) || 0;

        var values = [];
        var data = that._data;

        for (var i = data.length - 1; i >= 0; i--) {
            var item = data[i];

            if (timestamp >= item.timestamp) {
                break;
            }

            values.unshift(item.value);
        }

        return {
            timestamp: Date.now(),
            values: values
        };
    });

    server
        .listen(PORT)
        .then(function () {
            console.log('Listening on port ' + PORT + '...');
        }, function (reason) {
            console.error(reason);
        });

    this._server = server;
};

App.prototype._push = function (value) {
    this._data.push({
        timestamp: Date.now(),
        value: value
    });

    if (this._data.length > MAX_DATA_LENGTH) {
        this._data.shift();
    }

    this._display.value = value;
    this._display.push(value);
    this._display.refresh();
};

App.prototype._readNext = function () {
    var that = this;

    var timestamp = Date.now();

    this._sensor.getIlluminance(function (error, value) {
        if (that._disposed) {
            return;
        }

        that._push(value || 0);
        setTimeout(that._readNext.bind(that), READ_INTERVAL + timestamp - Date.now());
    });
};

App.prototype.dispose = function () {
    this._data.length = 0;
    this._display.clear();
    this._disposed = true;
};

module.exports = App;
