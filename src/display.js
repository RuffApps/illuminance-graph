'use strict';

var SCREEN_WIDTH = 16;
var GRAPH_PADDING = 1;
var SCREEN_HEIGHT = 2;

var LEVEL_CHARS_GROUPS = [
    [' ', '_'],
    [' ', '-'],
    ['_', ' '],
    ['-', ' ']
];

function Display(lcd, valueColumns, unit) {
    if (unit.length > valueColumns) {
        throw new Error('Length of unit cannot be larger than value columns');
    }

    this._lcd = lcd;

    this._valueColumns = valueColumns;

    this.value = 0;
    this._maxDisplayValue = Math.pow(10, valueColumns) - 1;

    this._unit = unit;

    this._maxDataNumber = SCREEN_WIDTH - GRAPH_PADDING - valueColumns;
    this._data = [];
}

Display.prototype.push = function (value) {
    this._value = value;
    this._data.push(value);

    if (this._data.length > this._maxDataNumber) {
        this._data.shift();
    }
};

Display.prototype.refresh = function () {
    var lcd = this._lcd;
    var data = this._data;

    var exceedValue = 100;

    var i;
    var value;

    for (i = 0; i < data.length; i++) {
        value = data[i];

        if (value > exceedValue) {
            exceedValue = value;
        }
    }

    var graphPadding = Array(this._maxDataNumber - data.length + GRAPH_PADDING + 1).join(' ');

    var lines = [
        padLeft(this.value, this._valueColumns) + graphPadding,
        padLeft(this._unit, this._valueColumns) + graphPadding
    ];

    for (i = 0; i < data.length; i++) {
        value = data[i];
        var level = Math.floor(value / (exceedValue + 1) * LEVEL_CHARS_GROUPS.length);

        var chars = LEVEL_CHARS_GROUPS[level];

        for (var j = 0; j < lines.length; j++) {
            lines[j] += chars[j];
        }
    }

    for (i = 0; i < lines.length; i++) {
        lcd.setCursor(0, i);
        lcd.print(lines[i]);
    }
};

Display.prototype.clear = function () {
    this._value = 0;
    this._data.length = 0;

    this._lcd.clear();
};

module.exports = Display;

function padRight(object, length) {
    return (object + new Array(length).join(' ')).substr(0, length);
}

function padLeft(object, length) {
    return (new Array(length).join(' ') + object).substr(-length);
}
