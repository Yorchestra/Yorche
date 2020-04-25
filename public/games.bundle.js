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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/games/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/games/fragmentShader.frag":
/*!***************************************!*\
  !*** ./src/games/fragmentShader.frag ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"precision mediump float;\\n\\nvarying vec2 vUv;\\n\\nuniform sampler2D uTex;\\nuniform float uPercent;\\n\\nvoid main() {\\n    float shift = uPercent * 0.02;\\n\\n    float r = texture2D( uTex, vUv + vec2( shift, 0.0 )).r;\\n    float g = texture2D( uTex, vUv - vec2( 0.0, shift )).g;\\n    float b = texture2D( uTex, vUv - vec2( shift, 0.0)).b;\\n\\n    vec3 color = vec3( r, g, b );\\n    gl_FragColor = vec4( color, 1.0 );\\n}\");\n\n//# sourceURL=webpack:///./src/games/fragmentShader.frag?");

/***/ }),

/***/ "./src/games/index.js":
/*!****************************!*\
  !*** ./src/games/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vertexShader_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertexShader.vert */ \"./src/games/vertexShader.vert\");\n/* harmony import */ var _fragmentShader_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fragmentShader.frag */ \"./src/games/fragmentShader.frag\");\n\n\n\nvar container, camera, scene, renderer;\nvar mouse = new THREE.Vector2(0.5, 0.5);\n\n// window.addEventListener('load', init);\n// window.addEventListener('load', animate);\ninit();\nanimate();\n\nfunction init() {\n    container = document.getElementById( 'games-container' );\n\n    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1); // left, right, top, bottom, near, far\n\n    scene = new THREE.Scene();\n\n    var geometry = new THREE.PlaneGeometry(2, 2, 1, 1); // width, height, widthSegments, heightSegments\n\n    var loader = new THREE.TextureLoader();\n    var texture = loader.load('./img/games.jpg');\n\n    var material = new THREE.ShaderMaterial( {\n        uniforms: {\n            uTex: { value: texture },\n            uPercent: { value: 0.0 }\n        },\n        // vertexShader: document.getElementById( 'imageEffectVert' ).textContent,\n        // fragmentShader: document.getElementById( 'imageEffectFrag' ).textContent\n        vertexShader: _vertexShader_vert__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n        fragmentShader: _fragmentShader_frag__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    } );\n\n    var mesh = new THREE.Mesh(geometry, material);\n\n    scene.add( mesh );\n\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize( container.clientWidth, container.clientHeight );\n    renderer.setPixelRatio( window.devicePixelRatio );\n    container.appendChild( renderer.domElement );\n\n    document.addEventListener( 'mousemove', event => {\n        mouse.x = (event.pageX / window.innerWidth - 0.5);\n        mouse.y = (- event.pageY / window.innerHeight + 0.5);\n    } )\n\n    container.addEventListener( 'mouseover', () => {\n        material.uniforms[ \"uPercent\" ].value = 1.0;\n    } )\n    container.addEventListener( 'mouseleave', () => {\n        material.uniforms[ \"uPercent\" ].value = 0.0;\n    } )\n}\n\nfunction animate() {\n    requestAnimationFrame( animate );\n\n    render();\n}\n\nfunction render() {\n    renderer.render( scene, camera );\n}\n\n//# sourceURL=webpack:///./src/games/index.js?");

/***/ }),

/***/ "./src/games/vertexShader.vert":
/*!*************************************!*\
  !*** ./src/games/vertexShader.vert ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"precision mediump float;\\n\\nvarying vec2 vUv;\\n\\nvoid main() {\\n    vUv = uv;\\n\\n    gl_Position = vec4( position, 1.0 );\\n}\");\n\n//# sourceURL=webpack:///./src/games/vertexShader.vert?");

/***/ })

/******/ });