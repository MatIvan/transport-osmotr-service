/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./html/main/main.js":
/*!***************************!*\
  !*** ./html/main/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst UI = __webpack_require__(/*! ../ui */ \"./html/ui.js\");\n\nconst information = document.getElementById('info');\ninformation.innerText = `Chrome ${versions.chrome()}; Node.js ${versions.node()}; Electron ${versions.electron()}`;\n\nwindow.handlers.onReady((event, data) => {\n    //event.sender.send('event-name', data) //respose\n    console.log('onReady: ', data);\n    //window.service.db.getCars();\n    UI.echo(\"sd\");\n})\n\nwindow.handlers.onError((event, err) => {\n    console.log('onError: ', err);\n})\n\nwindow.handlers.db.onCars((event, cars) => {\n    console.log('onCars: ', cars);\n    buildTableCars(cars);\n})\n\nwindow.service.ready();\nconsole.log('Renderer is loaded.');\n\n/**\n * \n * @param {[]} cars \n */\nfunction buildTableCars(cars) {\n    const tableBody = document.getElementById('cars-table-body');\n    let rows = '';\n    for (let i = 0; i < cars.length; i++) {\n        const car = cars[i];\n        rows += `\n            <tr class=\"button\">\n              <td>${car.id}</td>\n              <td>${car.uid}</td>\n              <td>${car.marka}</td>\n            </tr>\n        `;\n    }\n    tableBody.innerHTML = rows || '<tr><td>no data</td><td></td><td></td></tr>';\n}\n\n\n//# sourceURL=webpack://tos/./html/main/main.js?");

/***/ }),

/***/ "./html/ui.js":
/*!********************!*\
  !*** ./html/ui.js ***!
  \********************/
/***/ ((module) => {

eval("//@ts-check\n\n\nmodule.exports = {\n\n    div: function (className) {\n        let div = document.createElement('div');\n        div.className = className;\n        return div;\n    },\n\n    echo: function (params) {\n        console.log('ECHO: ', params);\n    }\n\n}\n\n\n//# sourceURL=webpack://tos/./html/ui.js?");

/***/ })

/******/ 	});
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./html/main/main.js");
/******/ 	
/******/ })()
;