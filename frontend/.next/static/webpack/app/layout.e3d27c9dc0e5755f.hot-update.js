"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"c8c72b0e7a39\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zdHlsZXMvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9zdHlsZXMvZ2xvYmFscy5jc3M/MTAwZCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImM4YzcyYjBlN2EzOVwiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/styles/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/components/sideBar/SBItems.tsx":
/*!********************************************!*\
  !*** ./src/components/sideBar/SBItems.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ SBItems; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction SBItems(prompt) {\n    _s();\n    const handleClick = ()=>{\n        console.log(\"hello\");\n        const element = document.querySelector(\".hide\");\n        if (element) {\n            element.classList.toggle(\"visible\");\n        }\n    };\n    const [isHide, setIsHide] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n        onClick: handleClick,\n        href: \"/\".concat(prompt.pageName),\n        className: \"flex flex-row px-5 mb-6 border-4 border-transparent  transition ease-in-out delay-100 focus:border-l-white focus:shadow-md \",\n        tabIndex: \"0\",\n        children: prompt.children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Hamza\\\\Desktop\\\\web\\\\Ft_transcendance\\\\frontend\\\\src\\\\components\\\\sideBar\\\\SBItems.tsx\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, this);\n}\n_s(SBItems, \"ZK1j4O3++yscTABgHZ3ditiIqOs=\");\n_c = SBItems;\nvar _c;\n$RefreshReg$(_c, \"SBItems\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3NpZGVCYXIvU0JJdGVtcy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDNkI7QUFDSTtBQUVsQixTQUFTRSxRQUFRQyxNQUcvQjs7SUFDQyxNQUFNQyxjQUFjO1FBQ2xCQyxRQUFRQyxHQUFHLENBQUM7UUFDWixNQUFNQyxVQUFVQyxTQUFTQyxhQUFhLENBQUM7UUFFdkMsSUFBSUYsU0FBUztZQUNYQSxRQUFRRyxTQUFTLENBQUNDLE1BQU0sQ0FBQztRQUMzQjtJQUNGO0lBQ0EsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUdaLCtDQUFRQSxDQUFDO0lBQ3JDLHFCQUNFLDhEQUFDRCxrREFBSUE7UUFDSGMsU0FBU1Y7UUFDVFcsTUFBTSxJQUFvQixPQUFoQlosT0FBT2EsUUFBUTtRQUN6QkMsV0FBVTtRQUNWQyxVQUFTO2tCQUVSZixPQUFPZ0IsUUFBUTs7Ozs7O0FBR3RCO0dBdkJ3QmpCO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3NpZGVCYXIvU0JJdGVtcy50c3g/NTI0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU0JJdGVtcyhwcm9tcHQ6IHtcclxuICBwYWdlTmFtZTogc3RyaW5nO1xyXG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XHJcbn0pIHtcclxuICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oaWRlXCIpO1xyXG5cclxuICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInZpc2libGVcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBbaXNIaWRlLCBzZXRJc0hpZGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8TGlua1xyXG4gICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cclxuICAgICAgaHJlZj17YC8ke3Byb21wdC5wYWdlTmFtZX1gfVxyXG4gICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IHB4LTUgbWItNiBib3JkZXItNCBib3JkZXItdHJhbnNwYXJlbnQgIHRyYW5zaXRpb24gZWFzZS1pbi1vdXQgZGVsYXktMTAwIGZvY3VzOmJvcmRlci1sLXdoaXRlIGZvY3VzOnNoYWRvdy1tZCBcIlxyXG4gICAgICB0YWJJbmRleD1cIjBcIlxyXG4gICAgPlxyXG4gICAgICB7cHJvbXB0LmNoaWxkcmVufVxyXG4gICAgPC9MaW5rPlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkxpbmsiLCJ1c2VTdGF0ZSIsIlNCSXRlbXMiLCJwcm9tcHQiLCJoYW5kbGVDbGljayIsImNvbnNvbGUiLCJsb2ciLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaXNIaWRlIiwic2V0SXNIaWRlIiwib25DbGljayIsImhyZWYiLCJwYWdlTmFtZSIsImNsYXNzTmFtZSIsInRhYkluZGV4IiwiY2hpbGRyZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/sideBar/SBItems.tsx\n"));

/***/ })

});