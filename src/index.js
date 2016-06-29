'use strict';

var App = require('./app.js');

var app;

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var sensor = $('#sensor');
    var lcd = $('#lcd');

    app = new App(sensor, lcd);
});

$.end(function () {
    app.dispose();
});
