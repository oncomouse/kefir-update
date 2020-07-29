(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

var _kefir = _interopRequireDefault((typeof window !== "undefined" ? window['Kefir'] : typeof global !== "undefined" ? global['Kefir'] : null));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var asFunction = function asFunction(f) {
  return typeof f === 'function' ? f : function () {
    return f;
  };
};

var isArray = function isArray(xs) {
  return xs instanceof Array;
};

var isRawPattern = function isRawPattern(xs) {
  return isArray(xs[0]);
};

function extractPattern(pattern) {
  if (!isArray(pattern)) {
    return _kefir["default"].never;
  }

  if (isRawPattern(pattern)) {
    return pattern;
  }

  return [pattern.slice(0, -1), asFunction(pattern.slice(-1)[0])];
}

var append = function append() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return [].concat(args);
};

_kefir["default"].update = function (initValue) {
  for (var _len2 = arguments.length, patterns = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    patterns[_key2 - 1] = arguments[_key2];
  }

  return _kefir["default"].merge(patterns.map(extractPattern).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        sources = _ref2[0],
        f = _ref2[1];

    return _kefir["default"].combine(sources, append).map(function (e) {
      return {
        event: e,
        mutation: f
      };
    });
  })).scan(function (prev, _ref3) {
    var event = _ref3.event,
        mutation = _ref3.mutation;
    return mutation.apply(undefined, [prev].concat(event));
  }, initValue);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
