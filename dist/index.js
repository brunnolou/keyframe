(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rebound"));
	else if(typeof define === 'function' && define.amd)
		define(["rebound"], factory);
	else if(typeof exports === 'object')
		exports["relatify"] = factory(require("rebound"));
	else
		root["relatify"] = factory(root["rebound"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rebound__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rebound___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rebound__);


var el = document.getElementById('logo');
console.log('el: ', el);

// create a SpringSystem and a Spring with a bouncy config.
var springSystem = new __WEBPACK_IMPORTED_MODULE_0_rebound___default.a.SpringSystem();
var spring = springSystem.createSpring(50, 3);

// Add a listener to the spring. Every time the physics
// solver updates the Spring's value onSpringUpdate will
// be called.
spring.addListener({
  onSpringUpdate: function (spring) {
    var val = spring.getCurrentValue();
    val = __WEBPACK_IMPORTED_MODULE_0_rebound___default.a.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
    scale(el, val);
  }
});

// Listen for mouse down/up/out and toggle the
//springs endValue from 0 to 1.
el.addEventListener('mousedown', function () {
  spring.setEndValue(1);
});

el.addEventListener('mouseout', function () {
  spring.setEndValue(0);
});

el.addEventListener('mouseup', function () {
  spring.setEndValue(0);
});

// Helper for scaling an element with css transforms.
function scale(el, val) {
  el.style.mozTransform = el.style.msTransform = el.style.webkitTransform = el.style.transform = 'scale3d(' + val + ', ' + val + ', 1)';
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("rebound");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map