/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _util_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util_loader__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var UploadcareImage = function UploadcareImage(props) {
  return /*#__PURE__*/React.createElement((next_image__WEBPACK_IMPORTED_MODULE_0___default()), _extends({
    loader: _util_loader__WEBPACK_IMPORTED_MODULE_1__.uploadcareLoader
  }, props));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UploadcareImage);

/***/ }),
/* 2 */
/***/ ((module) => {

"use strict";
module.exports = next/image;

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(4),
    DEFAULT_PARAMS = _require.DEFAULT_PARAMS,
    NOT_PROCESSED_EXTENSIONS = _require.NOT_PROCESSED_EXTENSIONS,
    DEFAULT_CDN_DOMAIN = _require.DEFAULT_CDN_DOMAIN;

var _require2 = __webpack_require__(5),
    trimTrailingSlash = _require2.trimTrailingSlash,
    mergeParams = _require2.mergeParams,
    getMaxResizeWidth = _require2.getMaxResizeWidth,
    convertToUploadcareQualityString = _require2.convertToUploadcareQualityString,
    getFilename = _require2.getFilename,
    getExtension = _require2.getExtension,
    isProduction = _require2.isProduction,
    isCdnUrl = _require2.isCdnUrl,
    generateDefaultProxyEndpoint = _require2.generateDefaultProxyEndpoint,
    parseUserParamsString = _require2.parseUserParamsString,
    isDotenvParamEmpty = _require2.isDotenvParamEmpty;

function uploadcareLoader(_ref) {
  var src = _ref.src,
      width = _ref.width,
      quality = _ref.quality;
  var publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || null;
  var userParamsString = process.env.NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS || '';
  var cdnDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_CDN_DOMAIN || DEFAULT_CDN_DOMAIN;
  var customProxyDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN || null;
  var customProxyEndpoint = customProxyDomain ? generateDefaultProxyEndpoint(customProxyDomain) : null;
  var proxyEndpoint = customProxyEndpoint || generateDefaultProxyEndpoint(publicKey);
  var root = trimTrailingSlash(proxyEndpoint);
  var isOnCdn = isCdnUrl(src, cdnDomain);

  if (!isProduction() && !isOnCdn) {
    var isPublicKeySet = !isDotenvParamEmpty(publicKey);
    var isCustomProxyEndpointSet = !isDotenvParamEmpty(customProxyEndpoint);

    if (!isPublicKeySet && !isCustomProxyEndpointSet) {
      throw new Error("Both NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY and NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN are not set. Please set either one.");
    }

    if (src.startsWith("/")) {
      throw new Error("Failed to parse \"".concat(src, "\" in \"uploadcareLoader\", Uploadcare loader doesn't support relative images."));
    }
  }

  var filename = getFilename(src);
  var extension = getExtension(filename); // Some extensions are not processed by Uploadcare, e.g. SVG.

  if (NOT_PROCESSED_EXTENSIONS.includes(extension)) {
    // @todo: Test non-CDN urls.
    return isOnCdn ? src : "".concat(root).concat(src);
  }

  var qualityString = convertToUploadcareQualityString(quality);
  var maxResizeWidth = getMaxResizeWidth(width); // Demo: https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/resize/300x/vercel.png

  var userParams = parseUserParamsString(userParamsString);
  var basicParams = DEFAULT_PARAMS.concat(["resize/".concat(maxResizeWidth, "x"), "quality/".concat(qualityString)]);
  var params = mergeParams(basicParams, userParams);
  var apiParamsString = "/-/" + params.join("/-/") + "/";

  if (isOnCdn) {
    var withoutFilename = src.slice(0, src.lastIndexOf("/"));
    return "".concat(withoutFilename).concat(apiParamsString).concat(filename);
  }

  return "".concat(root).concat(apiParamsString).concat(src);
}

module.exports = uploadcareLoader;

/***/ }),
/* 4 */
/***/ ((module) => {

var MAX_OUTPUT_IMAGE_DIMENSION = 3000;
var NOT_PROCESSED_EXTENSIONS = ["svg", "gif"];
var DEFAULT_PARAMS = ["format/auto", "stretch/off", "progressive/yes"];
var DEFAULT_CDN_DOMAIN = 'ucarecdn.com';
module.exports = {
  MAX_OUTPUT_IMAGE_DIMENSION: MAX_OUTPUT_IMAGE_DIMENSION,
  NOT_PROCESSED_EXTENSIONS: NOT_PROCESSED_EXTENSIONS,
  DEFAULT_PARAMS: DEFAULT_PARAMS,
  DEFAULT_CDN_DOMAIN: DEFAULT_CDN_DOMAIN
};

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(4),
    MAX_OUTPUT_IMAGE_DIMENSION = _require.MAX_OUTPUT_IMAGE_DIMENSION;
/**
 * Merge user parameters with default parameters, so that user parameters have higher priority.
 * 
 * @param {Array} defaultParams 
 * @param {Array} userParams 
 * @returns {Array}
 */


function mergeParams(defaultParams, userParams) {
  var resultParams = defaultParams;

  for (var i = 0; i < userParams.length; i++) {
    var _parseUploadcareTrans = _parseUploadcareTransformationParam(userParams[i]),
        _parseUploadcareTrans2 = _slicedToArray(_parseUploadcareTrans, 1),
        userParam = _parseUploadcareTrans2[0];

    var hasBeenReplaced = false;

    for (var j = 0; j < resultParams.length; j++) {
      if (resultParams[j].startsWith(userParam)) {
        resultParams[j] = userParams[i];
        hasBeenReplaced = true;
        break;
      }
    } // If the param is new, just add it.


    if (!hasBeenReplaced) {
      resultParams.push(userParams[i]);
    }
  }

  return resultParams;
}

function getExtension(filename) {
  return filename.toLowerCase().split("?")[0].split("#")[0].split(".")[1];
}

function getFilename(url) {
  return url.substring(1 + url.lastIndexOf("/"));
}

function trimTrailingSlash(url) {
  return url.replace(/\/$/, "");
}

function convertToUploadcareQualityString(requestedQuality) {
  // If any particular quality has not been requested, we use the smart quality mode.
  if (!requestedQuality) {
    return "smart";
  } // Uploadcare doesn't support integer-based quality modificators,
  // so we need to map them onto uploadcare's equivalents


  var names = ["lightest", "lighter", "normal", "better", "best"];
  var intervals = [0, 38, 70, 80, 87, 100];
  var nameIdx = intervals.findIndex(function (min, idx) {
    var max = intervals[idx + 1];
    return min <= requestedQuality && requestedQuality <= max;
  });
  return names[nameIdx];
}
/**
 * Get max resize width.
 *
 * Output image dimension is limited to 3000px,
 * but it can be increased by explicitly setting /format/jpeg/ through API params.
 */


function getMaxResizeWidth(requestedWidth) {
  return Math.min(Math.max(requestedWidth, 0), MAX_OUTPUT_IMAGE_DIMENSION);
}

function generateDefaultProxyEndpoint(publicKey) {
  return "https://".concat(publicKey, ".ucr.io");
}

function generateCustomProxyEndpoint(customProxyDomain) {
  return "https://".concat(customProxyDomain);
}

function isCdnUrl(url, cdnDomain) {
  var escapedCdnDomain = cdnDomain.replace('.', '\.');
  var regexp = new RegExp("^https?://".concat(escapedCdnDomain));
  return regexp.test(url);
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function parseUserParamsString(paramsString) {
  if (paramsString == null || paramsString === "") {
    return [];
  }

  var params = paramsString.split(",");
  return params.map(function (param) {
    return param.trim();
  });
}

function isDotenvParamEmpty(param) {
  return param == null || param.trim() === "";
}

function _parseUploadcareTransformationParam(param) {
  return param.split('/');
}

module.exports = {
  mergeParams: mergeParams,
  getExtension: getExtension,
  getFilename: getFilename,
  trimTrailingSlash: trimTrailingSlash,
  convertToUploadcareQualityString: convertToUploadcareQualityString,
  getMaxResizeWidth: getMaxResizeWidth,
  generateDefaultProxyEndpoint: generateDefaultProxyEndpoint,
  generateCustomProxyEndpoint: generateCustomProxyEndpoint,
  isCdnUrl: isCdnUrl,
  isProduction: isProduction,
  parseUserParamsString: parseUserParamsString,
  isDotenvParamEmpty: isDotenvParamEmpty
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_UploadcareImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _util_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _util_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util_loader__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  uploadcareLoader: _util_loader__WEBPACK_IMPORTED_MODULE_1__.uploadcareLoader,
  UploadcareImage: _components_UploadcareImage__WEBPACK_IMPORTED_MODULE_0__["default"]
});
})();

/******/ })()
;