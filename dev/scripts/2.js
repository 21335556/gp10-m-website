(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/controllers/Name.js":
/*!*********************************!*\
  !*** ./src/controllers/Name.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function getData() {\n  return $.ajax({\n    url: '/api/listmore.json?pageNo=1&pageSize=15',\n    //把接口地址拿到链接\n    type: 'get',\n    success: function success(result) {\n      return result;\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/controllers/Name.js?");

/***/ })

}]);