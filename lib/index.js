"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = keyframes;

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

var sort = function sort(a, b) {
    return a - b;
};

var toFloat = function toFloat(x) {
    return parseFloat(x, 10);
};

var noop = function noop() {};

var chunk2 = function chunk2(value) {
    var arr = [];
    for (var i = 0; i < value.length; i += 2) {
        arr.push(value.slice(i, i + 2));
    }
    return arr;
};

var onceDifferent = function onceDifferent(func, value) {
    var memo = value;
    return function(newVal) {
        if (memo === newVal) return memo;
        func(newVal);
        memo = newVal;
        return memo;
    };
};

var getProgressFromValue = function getProgressFromValue(from, to, value) {
    return (value - from) / (to - from);
};

var getValueFromProgress = function getValueFromProgress(from, to, progress) {
    return -progress * from + progress * to + from;
};

var interpolate = function interpolate(input, output, rangeEasing) {
    var rangeLength = input.length;
    var finalIndex = rangeLength - 1;
    return function(v) {
        if (v <= input[0]) {
            return output[0];
        }
        if (v >= input[finalIndex]) {
            return output[finalIndex];
        }
        var i = 1;
        for (;i < rangeLength; i++) {
            if (input[i] > v || i === finalIndex) {
                break;
            }
        }
        var progressInRange = getProgressFromValue(input[i - 1], input[i], v);
        var easedProgress = rangeEasing ? rangeEasing[i - 1](progressInRange) : progressInRange;
        return getValueFromProgress(output[i - 1], output[i], easedProgress);
    };
};

function keyframes(originalFrames) {
    var frames = Object.assign({}, originalFrames);
    var noZero = false;
    if (!frames[0]) {
        noZero = true;
        frames[0] = noop;
    }
    var framesArray = Object.keys(frames);
    framesArray.forEach(function(key) {
        var func = frames[key];
        frames[key] = onceDifferent(func);
    });
    var keysNumbers = framesArray.map(toFloat);
    keysNumbers = [].concat(_toConsumableArray(keysNumbers), _toConsumableArray(keysNumbers)).sort(sort).slice(1, Infinity);
    var chucks = chunk2(keysNumbers);
    var caller = function caller(progress) {
        frames[0](1);
        chucks.forEach(function(chunk) {
            if (!chunk[1]) {
                return;
            }
            var func = frames[chunk[1]];
            var interpolatedValue = interpolate([ chunk[0], chunk[1] ], [ 0, 1 ]);
            func(interpolatedValue(progress * 100));
        });
        if (progress < 0) frames[framesArray[noZero ? 1 : 0]](progress);
        if (progress > 1) frames[framesArray[framesArray.length - 1]](progress);
    };
    return caller;
}