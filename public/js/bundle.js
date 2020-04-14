/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Canvas/index.js":
/*!********************************!*\
  !*** ./src/js/Canvas/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\n/* harmony import */ var _shaders_vertexShader_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/vertexShader.vert */ \"./src/js/Canvas/shaders/vertexShader.vert\");\n/* harmony import */ var _shaders_fragmentShader_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/fragmentShader.frag */ \"./src/js/Canvas/shaders/fragmentShader.frag\");\n\n\n\nclass Canvas {\n    constructor() {\n        var container;\n        var camera, scene, renderer;\n        var uniforms;\n\n        init();\n        animate();\n\n        function init() {\n            container = document.getElementById( 'canvas-container' );\n\n            camera = new THREE.Camera();\n            camera.position.z = 1;\n\n            scene = new THREE.Scene();\n\n            var geometry = new THREE.PlaneBufferGeometry( 2, 2 );\n\n            uniforms = {\n                u_time: { type: \"f\", value: 1.0 },\n                u_resolution: { type: \"v2\", value: new THREE.Vector2() },\n                u_mouse: { type: \"v2\", value: new THREE.Vector2() }\n            };\n\n            var material = new THREE.ShaderMaterial( {\n                uniforms: uniforms,\n                //vertexShader: document.getElementById( 'vertexShader' ).textContent,\n                //fragmentShader: document.getElementById( 'fragmentShader' ).textContent\n                vertexShader: _shaders_vertexShader_vert__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n                fragmentShader: _shaders_fragmentShader_frag__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n            } );\n\n            var mesh = new THREE.Mesh( geometry, material );\n            scene.add( mesh );\n\n            renderer = new THREE.WebGLRenderer();\n            renderer.setPixelRatio( window.devicePixelRatio );\n\n            container.appendChild( renderer.domElement );\n\n            onWindowResize();\n            window.addEventListener( 'resize', onWindowResize, false );\n\n            document.onmousemove = function(e){\n            uniforms.u_mouse.value.x = e.pageX\n            uniforms.u_mouse.value.y = e.pageY\n            }\n        }\n\n        function onWindowResize( event ) {\n            renderer.setSize( window.innerWidth, window.innerHeight );\n            uniforms.u_resolution.value.x = renderer.domElement.width;\n            uniforms.u_resolution.value.y = renderer.domElement.height;\n        }\n\n        function animate() {\n            requestAnimationFrame( animate );\n            render();\n        }\n\n        function render() {\n            uniforms.u_time.value += 0.05;\n            renderer.render( scene, camera );\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/js/Canvas/index.js?");

/***/ }),

/***/ "./src/js/Canvas/shaders/fragmentShader.frag":
/*!***************************************************!*\
  !*** ./src/js/Canvas/shaders/fragmentShader.frag ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"precision mediump float;\\n\\n#extension GL_OES_standard_derivatives : enable\\n\\nuniform float u_time;\\nuniform vec2  u_resolution;\\nuniform vec2 u_mouse;\\n\\n#define iTime u_time\\n#define iResolution u_resolution\\n#define iMouse u_mouse\\n\\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord );\\n\\nvoid main(void) { mainImage(gl_FragColor, gl_FragCoord.xy); }\\n\\n#define TAU 6.2831852\\n#define MOD3 vec3(.1031,.11369,.13787)\\n#define BLACK_COL vec3(16,21,25)/255.\\n\\nvec3 hash33(vec3 p3)\\n{\\n\\tp3 = fract(p3 * MOD3);\\n    p3 += dot(p3, p3.yxz+19.19);\\n    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));\\n}\\n\\nfloat simplex_noise(vec3 p)\\n{\\n    const float K1 = 0.333333333;\\n    const float K2 = 0.166666667;\\n    \\n    vec3 i = floor(p + (p.x + p.y + p.z) * K1);\\n    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);\\n        \\n    vec3 e = step(vec3(0.0), d0 - d0.yzx);\\n\\tvec3 i1 = e * (1.0 - e.zxy);\\n\\tvec3 i2 = 1.0 - e.zxy * (1.0 - e);\\n    \\n    vec3 d1 = d0 - (i1 - 1.0 * K2);\\n    vec3 d2 = d0 - (i2 - 2.0 * K2);\\n    vec3 d3 = d0 - (1.0 - 3.0 * K2);\\n    \\n    vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);\\n    vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));\\n    \\n    return dot(vec4(31.316), n);\\n}\\n\\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\\n{\\n    vec2 uv = (fragCoord.xy-iResolution.xy*0.5)/iResolution.y;\\n        \\n    float a = sin(atan(uv.y, uv.x));\\n    float am = abs(a-.5)/4.;\\n    float l = length(uv);                         \\n    \\n    float m1 = clamp(.1/smoothstep(.0, 1.75, l), 0., 1.);\\n    float m2 = clamp(.1/smoothstep(.42, 0., l), 0., 1.);\\n    float s1 = (simplex_noise(vec3(uv*2., 1. + iTime*.525))*(max(1.0 - l*1.75, 0.)) + .9);\\n    float s2 = (simplex_noise(vec3(uv*1., 15. + iTime*.525))*(max(.0 + l*1., .025)) + 1.25);\\n    float s3 = (simplex_noise(vec3(vec2(am, am*100. + iTime*3.)*.15, 30. + iTime*.525))*(max(.0 + l*1., .25)) + 1.5);\\n    s3 *= smoothstep(0.0, .3345, l);    \\n    \\n    float sh = smoothstep(0.15, .35, l);\\n    \\n    \\n    float m = m1*m1*m2 * ((s1*s2*s3) * (1.-l)) * sh;\\n    //m = clamp(m, 0., 1.);\\n    \\n    vec3 col = mix(BLACK_COL, (0.5 + 0.5*cos(iTime+uv.xyx*3.+vec3(0,2,4))), m);\\n            \\n    fragColor = vec4(col, 1.);\\n}\");\n\n//# sourceURL=webpack:///./src/js/Canvas/shaders/fragmentShader.frag?");

/***/ }),

/***/ "./src/js/Canvas/shaders/vertexShader.vert":
/*!*************************************************!*\
  !*** ./src/js/Canvas/shaders/vertexShader.vert ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"void main() {\\n    gl_Position = vec4( position, 1.0 );\\n}\");\n\n//# sourceURL=webpack:///./src/js/Canvas/shaders/vertexShader.vert?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page_music__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page_music */ \"./src/js/page_music/index.js\");\n/* harmony import */ var _page_games__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page_games */ \"./src/js/page_games/index.js\");\n/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Canvas */ \"./src/js/Canvas/index.js\");\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const path = location.pathname.split('/')[2];\n    console.log(path);\n    \n    if(path === 'page_music') new _page_music__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n    else if(path === 'page_games') new _page_games__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n});\n\nnew _Canvas__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/page_games/index.js":
/*!************************************!*\
  !*** ./src/js/page_games/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Games; });\nclass Games {\n    constructor() {\n        console.log('Games clicked.');\n    }\n};\n\n/*\nexport default function module2() {\n    return \"game\";\n}\n*/\n\n//# sourceURL=webpack:///./src/js/page_games/index.js?");

/***/ }),

/***/ "./src/js/page_music/Canvas/index.js":
/*!*******************************************!*\
  !*** ./src/js/page_music/Canvas/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\n/* harmony import */ var _shaders_vertexShader_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/vertexShader.vert */ \"./src/js/page_music/Canvas/shaders/vertexShader.vert\");\n/* harmony import */ var _shaders_fragmentShader_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/fragmentShader.frag */ \"./src/js/page_music/Canvas/shaders/fragmentShader.frag\");\n\n\n\nclass Canvas {\n    constructor() {\n        var container;\n        var camera, scene, renderer;\n        var uniforms;\n\n        init();\n        animate();\n\n        function init() {\n            container = document.getElementById( 'canvas-container-music' );\n\n            camera = new THREE.Camera();\n            camera.position.z = 1;\n\n            scene = new THREE.Scene();\n\n            var geometry = new THREE.PlaneBufferGeometry( 2, 2 );\n\n            uniforms = {\n                u_time: { type: \"f\", value: 1.0 },\n                u_resolution: { type: \"v2\", value: new THREE.Vector2() },\n                u_mouse: { type: \"v2\", value: new THREE.Vector2() }\n            };\n\n            var material = new THREE.ShaderMaterial( {\n                uniforms: uniforms,\n                //vertexShader: document.getElementById( 'vertexShader' ).textContent,\n                //fragmentShader: document.getElementById( 'fragmentShader' ).textContent\n                vertexShader: _shaders_vertexShader_vert__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n                fragmentShader: _shaders_fragmentShader_frag__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n            } );\n\n            var mesh = new THREE.Mesh( geometry, material );\n            scene.add( mesh );\n\n            renderer = new THREE.WebGLRenderer();\n            renderer.setPixelRatio( window.devicePixelRatio );\n\n            container.appendChild( renderer.domElement );\n\n            onWindowResize();\n            window.addEventListener( 'resize', onWindowResize, false );\n\n            document.onmousemove = function(e){\n            uniforms.u_mouse.value.x = e.pageX\n            uniforms.u_mouse.value.y = e.pageY\n            }\n        }\n\n        function onWindowResize( event ) {\n            renderer.setSize( window.innerWidth, window.innerHeight );\n            uniforms.u_resolution.value.x = renderer.domElement.width;\n            uniforms.u_resolution.value.y = renderer.domElement.height;\n        }\n\n        function animate() {\n            requestAnimationFrame( animate );\n            render();\n        }\n\n        function render() {\n            uniforms.u_time.value += 0.05;\n            renderer.render( scene, camera );\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/js/page_music/Canvas/index.js?");

/***/ }),

/***/ "./src/js/page_music/Canvas/shaders/fragmentShader.frag":
/*!**************************************************************!*\
  !*** ./src/js/page_music/Canvas/shaders/fragmentShader.frag ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"precision mediump float;\\nuniform float u_time; // time\\nuniform vec2  u_resolution; // resolution\\nuniform vec2 u_mouse;\\n        \\nvoid main(void){\\n    vec3 destColor = vec3(0.5, 0.4, 0.0);\\n    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y); // 正規化\\n    float l = 0.05 / abs(length(p) - 0.5) * (sin(u_time)*0.5+1.0);\\n    //l += 0.05 / abs(length(p*sin(u_time)) - 0.3);\\n    //l += 0.05 / abs(length(p) - 0.1);\\n    gl_FragColor = vec4(l*destColor, 1.0);\\n}\");\n\n//# sourceURL=webpack:///./src/js/page_music/Canvas/shaders/fragmentShader.frag?");

/***/ }),

/***/ "./src/js/page_music/Canvas/shaders/vertexShader.vert":
/*!************************************************************!*\
  !*** ./src/js/page_music/Canvas/shaders/vertexShader.vert ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"void main() {\\n    gl_Position = vec4( position, 1.0 );\\n}\");\n\n//# sourceURL=webpack:///./src/js/page_music/Canvas/shaders/vertexShader.vert?");

/***/ }),

/***/ "./src/js/page_music/index.js":
/*!************************************!*\
  !*** ./src/js/page_music/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Music; });\n/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ \"./src/js/page_music/Canvas/index.js\");\n\n\nclass Music {\n    constructor() {\n        new _Canvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    }\n};\n\n/*\nexport default function module1() {\n    return \"music\";\n}\n*/\n\n//# sourceURL=webpack:///./src/js/page_music/index.js?");

/***/ })

/******/ });