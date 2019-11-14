(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./src/router/history.js":
/*!*******************************!*\
  !*** ./src/router/history.js ***!
  \*******************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"router\", function() { return router; });\nvar router = {\n  renderView: function renderView() {\n    var state = history.state || '/position'; // console.log(hash);\n\n    switch (state.path) {\n      case '/position':\n        $('main').html('position');\n        break;\n\n      case '/search':\n        $('main').html('search');\n        break;\n\n      case '/profile':\n        $('main').html('profile');\n        break;\n    }\n\n    $(\"nav a[href='\".concat(state.path, \"']\")).closest('li').addClass('active').siblings().removeClass('active');\n  },\n  init: function init() {\n    var that = this;\n    $('nav a').on('click', function (event) {\n      event.preventDefault();\n      var path = $(this).attr('href');\n      history.pushState({\n        path: path\n      }, null, path);\n      that.renderView(); // $(this).closest('li').addClass('active').siblings().removeClass('active')\n    });\n    window.addEventListener('popstate', this.renderView);\n    window.addEventListener('load', this.renderView);\n  }\n};\n\n\n//# sourceURL=webpack:///./src/router/history.js?");

/***/ })

}]);