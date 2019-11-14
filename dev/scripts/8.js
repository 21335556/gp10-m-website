(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./src/router/hash.js":
/*!****************************!*\
  !*** ./src/router/hash.js ***!
  \****************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"router\", function() { return router; });\nvar router = {\n  renderView: function renderView() {\n    var hash = location.hash;\n\n    switch (hash) {\n      case '#position':\n        $('main').html('position');\n        break;\n\n      case '#search':\n        $('main').html('search');\n        break;\n\n      case '#profile':\n        $('main').html('profile');\n        break;\n    }\n\n    $(\"nav a[href='\".concat(hash, \"']\")).closest('li').addClass('active').siblings().removeClass('active');\n  },\n  init: function init() {\n    window.addEventListener('load', this.renderView);\n    window.addEventListener('hashchange', this.renderView);\n  }\n};\n\n\n//# sourceURL=webpack:///./src/router/hash.js?");

/***/ })

}]);