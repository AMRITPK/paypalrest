(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["eclipse"] = factory(require("jquery"));
	else
		root["eclipse"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var helpers = {},
    pluralLangs = {};

pluralLangs.en = function (singular, plural1, plural2, remainder, n) {
  if (n === 1) {
    return singular;
  }

  return plural1;
};
pluralLangs.ru = function (singular, plural1, plural2, remainder, n) {
  if (remainder >= 2 && remainder <= 4 && (n < 5 || n > 21)) {
    return plural2;
  } else if (remainder === 1 && n !== 11) {
    return singular;
  }

  return plural1;
};

helpers.getClass = function (arg) {
  return Object.prototype.toString.call(arg).slice(8, -1);
};

helpers.extend = function (deep, target) {
  var stack = [],
      start = Date.now();

  for (var _len = arguments.length, sources = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    sources[_key - 2] = arguments[_key];
  }

  stack.push(target, sources);

  var _loop = function _loop() {
    var args = stack.pop(),
        o = stack.pop();

    args.forEach(function (arg) {
      Object.keys(arg).forEach(function (key) {
        if (arg[key] !== target) {
          if (!deep) {
            o[key] = arg[key];
          } else {
            if (helpers.getClass(arg[key]) !== 'Object') {
              o[key] = arg[key];
            } else {
              if (helpers.getClass(o[key]) !== 'Object') {
                o[key] = {};
              }

              stack.push(o[key], [arg[key]]);
            }
          }
        }
      });
    });
  };

  while (stack.length) {
    _loop();
  }

  return target;
};

helpers.inArray = function (arr, value) {
  return arr.some(function (item) {
    return item === value;
  });
};

helpers.removeFromArray = function (arr, value) {
  return arr.filter(function (item) {
    return item !== value;
  });
};

helpers.pushIfMiss = function (arr, value) {
  if (!helpers.inArray(arr, value)) {
    return [].concat(_toConsumableArray(arr), [value]);
  }

  return [].concat(_toConsumableArray(arr));
};

helpers.isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};

helpers.addLeadingZero = function (n) {
  return Math.abs(n) < 10 ? (n < 0 ? '-0' : '0') + Math.abs(n) : n;
};

helpers.getAbsoluteUrl = function () {
  var a;

  return function (url) {
    if (!a) {
      a = document.createElement('a');
    }

    a.href = url || '';

    return a.href;
  };
}();

helpers.plural = function (singular, plural1, plural2, n) {
  var lang = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'ru';

  var remainder;

  if (arguments.length < 4) {
    throw new TypeError('4 arguments required, but only' + arguments.length + 'present.');
  }

  if (typeof n !== 'number') {
    throw new TypeError('parameter 4 is expected to be a number.');
  }

  n = String(helpers.addLeadingZero(Math.abs(n)));
  n = parseInt(n.slice(-2), 10);
  remainder = n % 10;

  if (pluralLangs.hasOwnProperty(lang)) {
    return pluralLangs[lang](singular, plural1, plural2, remainder, n);
  }

  throw new TypeError('Unknown language — ' + lang);
};

exports.default = helpers;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var color = {};

var HEX_SIGNS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

color.checkRGB = function (colorStr) {
  var result = [],
      i,
      c;

  colorStr = colorStr.split(',');

  if (colorStr.length !== 3) {
    return false;
  }

  for (i = 0; i < colorStr.length; i += 1) {
    c = colorStr[i].trim();

    if (isNaN(c) || String(parseInt(c, 10)).length !== c.length) {
      return false;
    }

    if (parseInt(c, 10) < 0 || parseInt(c, 10) > 255) {
      return false;
    }

    result.push(c);
  }

  return result;
};

color.checkRGBA = function (colorStr) {
  var result = [],
      i,
      c,
      op;

  colorStr = colorStr.split(',');

  if (colorStr.length !== 4) {
    return false;
  }

  for (i = 0; i < colorStr.length - 1; i += 1) {
    c = colorStr[i].trim();

    if (isNaN(c) || String(parseInt(c, 10)).length !== c.length) {
      return false;
    }

    if (parseInt(c, 10) < 0 || parseInt(c, 10) > 255) {
      return false;
    }

    result.push(c);
  }

  op = colorStr[3];

  if (op[0] === ' ') {
    op = op.trim();
  }

  if (parseFloat(op) < 0 || parseFloat(op) > 1 || String(parseFloat(op)).length !== op.length) {
    return false;
  }

  result.push(op);

  return result;
};

color.isRGBLike = function (colorStr) {
  var result = { value: false, type: null };

  if (typeof colorStr !== 'string') {
    return result;
  }
  if (colorStr[0] !== 'r' || colorStr[1] !== 'g' || colorStr[2] !== 'b') {
    return result;
  }
  if (colorStr[3] === 'a') {
    if (colorStr[4] !== '(') {
      return result;
    }
  } else if (colorStr[3] !== 'a') {
    if (colorStr[3] !== '(') {
      return result;
    }
  }

  if (colorStr[colorStr.length - 1] !== ')') {
    return result;
  }

  if (colorStr[3] === 'a') {
    return {
      value: color.checkRGBA(colorStr.slice(5, -1)),
      type: 'rgba'
    };
  }

  return {
    value: color.checkRGB(colorStr.slice(4, -1)),
    type: 'rgb'
  };
};

color.isHexLike = function (colorStr) {
  var len, i;

  if (typeof colorStr !== 'string') {
    return false;
  }

  if (colorStr[0] === '#') {
    colorStr = colorStr.slice(1);
  }

  len = colorStr.length;

  if (len !== 3 && len !== 6) {
    return false;
  }

  for (i = 0; i < len; i += 1) {
    if (!_helpers2.default.inArray(HEX_SIGNS, colorStr[i].toLowerCase())) {
      return false;
    }
  }

  return colorStr;
};

color.change = function (colorStr, percent, action) {
  var parts, red, green, blue, op, startPoint, newColor;

  if (action !== 'lighten' && action !== 'darken') {
    return;
  }

  colorStr = colorStr.trim();

  if (colorStr === 'transparent') {
    parts = { value: [0, 0, 0] };
  } else {
    parts = color.isRGBLike(colorStr);
  }

  if (!parts.value) {
    return;
  }

  parts = parts.value;

  red = parseInt(parts[0], 10);
  green = parseInt(parts[1], 10);
  blue = parseInt(parts[2], 10);
  op = parseFloat(parts[3]);
  newColor = isNaN(op) ? 'rgb(' : 'rgba(';

  percent = percent / 100;

  startPoint = action === 'lighten' ? 255 : 0;

  newColor += Math.round((startPoint - red) * percent) + red + ',';
  newColor += Math.round((startPoint - green) * percent) + green + ',';
  newColor += Math.round((startPoint - blue) * percent) + blue;

  newColor += isNaN(op) ? ')' : ',' + op + ')';

  return newColor;
};

color.hexToRgb = function (hex) {
  var result = [],
      i;

  hex = color.isHexLike(hex);

  if (!hex) {
    return null;
  }

  if (hex.length === 3) {
    for (i = 0; i < hex.length; i += 1) {
      result.push('' + parseInt('' + hex[i] + hex[i], 16));
    }
  } else {
    for (i = 0; i < hex.length; i += 1) {
      if (i % 2 === 1) {
        result.push('' + parseInt('' + hex[i - 1] + hex[i], 16));
      }
    }
  }

  return result;
};

exports.default = color;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOM = {};

DOM.scrollPage = function (target, correction, options) {
  return (0, _jquery2.default)('html, body').animate({
    scrollTop: target.offset().top - (correction || 0)
  }, options || {}).promise();
};

DOM.getMaxHeight = function (blocks) {
  var maxHeight = (0, _jquery2.default)(blocks[0]).outerHeight();

  blocks.each(function () {
    if ((0, _jquery2.default)(this).outerHeight() > maxHeight) {
      maxHeight = (0, _jquery2.default)(this).outerHeight();
    }
  });

  return maxHeight;
};

exports.default = DOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var decorators = {};

decorators.debounce = function (func, delay) {
  var state = null;
  var COOLDOWN = 1;

  return function () {
    var result;

    if (state) {
      return;
    }

    result = func.apply(this, arguments);
    state = COOLDOWN;

    setTimeout(function () {
      state = null;
    }, delay || 100);

    return result;
  };
};

decorators.throttle = function (func, delay) {
  var state = null,
      lastArgs,
      lastContext;
  var COOLDOWN = 1;

  return function wrapper() {
    var result;

    if (state) {
      lastArgs = arguments;
      lastContext = this;

      return;
    }

    result = func.apply(this, arguments);
    state = COOLDOWN;

    setTimeout(function () {
      state = null;
      if (lastArgs) {
        wrapper.apply(lastContext, lastArgs);
        lastContext = lastArgs = null;
      }
    }, delay || 100);

    return result;
  };
};

decorators.smartDraw = function (func, delay, execAsap) {
  var timerID;

  return function () {
    var context = this,
        args = arguments;

    if (timerID) {
      clearTimeout(timerID);
    } else if (execAsap) {
      func.apply(context, args);
    }

    timerID = setTimeout(function () {
      if (!execAsap) {
        func.apply(context, args);
      }

      timerID = null;
    }, delay || 100);
  };
};

decorators.once = function (func, context) {
  var _arguments = arguments;

  var isCalled = false;

  return function () {
    var result;

    if (isCalled) {
      return null;
    }

    result = func.apply(context, _arguments);
    isCalled = true;

    return result;
  };
};

exports.default = decorators;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = __webpack_require__(1);

var _color2 = _interopRequireDefault(_color);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {};

var ANIMATION_SUPPORT = function () {
  var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
      el = document.createElement('div'),
      i;

  if (el.style.animationName !== undefined) {
    return true;
  }

  for (i = 0; i < domPrefixes.length; i += 1) {
    if (el.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
      return true;
    }
  }

  return false;
}();

styles.rippleButton = function () {
  var timerID;

  return function (e) {
    var btn, circle, coords, size, xPos, yPos, action, percent, btnColor, bg;

    if (!ANIMATION_SUPPORT) {
      return;
    }

    btn = (0, _jquery2.default)(this);
    circle = btn.find('.e-ripple-circle');
    coords = btn.offset();
    size = Math.max(btn.width(), btn.height());
    xPos = e.pageX - coords.left;
    yPos = e.pageY - coords.top;
    action = btn.data('e-color-action');
    percent = btn.data('e-percent-change');
    btnColor = getComputedStyle(btn[0]).backgroundColor;

    bg = _color2.default.change(btnColor, percent, action);

    if (circle) {
      circle.remove();
      circle = null;
    }

    circle = (0, _jquery2.default)('<div/>');
    circle.css({
      width: size + 'px',
      height: size + 'px',
      top: yPos - size / 2 + 'px',
      left: xPos - size / 2 + 'px',
      backgroundColor: bg
    });
    circle.addClass('e-ripple-circle');

    btn.append(circle);

    if (timerID) {
      clearTimeout(timerID);
    }

    timerID = setTimeout(function () {
      circle.remove();
    }, btn.data('e-ripple-delay') || 600);
  };
}();

exports.default = styles;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var utils = {};

utils.addMethod = function (namespace, func) {
  var parts = namespace.split('.'),
      parent = this;

  if (parts[0] === 'eclipse') {
    parts = parts.slice(1);
  }

  parts.forEach(function (item, i) {
    if (!(parts[i] in parent) && i !== parts.length - 1) {
      parent[parts[i]] = {};
    } else if (!(parts[i] in parent) && i === parts.length - 1) {
      parent[parts[i]] = func;
    }
    parent = parent[parts[i]];
  });

  return parent;
};

utils.namespace = function (nsString) {
  var parts = nsString.split('.'),
      parent = this;

  if (parts[0] === 'eclipse') {
    parts = parts.slice(1);
  }

  parts.forEach(function (item, i) {
    if (!(parts[i] in parent)) {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  });

  return parent;
};

exports.default = utils;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _styles = __webpack_require__(5);

var _styles2 = _interopRequireDefault(_styles);

var _color = __webpack_require__(1);

var _color2 = _interopRequireDefault(_color);

var _decorators = __webpack_require__(4);

var _decorators2 = _interopRequireDefault(_decorators);

var _DOM = __webpack_require__(3);

var _DOM2 = _interopRequireDefault(_DOM);

var _utils = __webpack_require__(6);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eclipse = {
  globals: {},
  storage: {
    dropdowns: [],
    bundles: [],
    spinners: [],
    staticTabs: [],
    responsiveTabs: [],
    searches: [],
    cache: {}
  },
  helpers: _helpers2.default,
  styles: _styles2.default,
  color: _color2.default,
  decorators: _decorators2.default,
  DOM: _DOM2.default,
  utils: _utils2.default,
  modules: {}
};

eclipse.utils.addMethod = eclipse.utils.addMethod.bind(eclipse);
eclipse.utils.namespace = eclipse.utils.namespace.bind(eclipse);

module.exports = eclipse;

/***/ })
/******/ ]);
});