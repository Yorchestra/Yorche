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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fragmentShader.frag":
/*!*********************************!*\
  !*** ./src/fragmentShader.frag ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"precision highp float;\\n\\nuniform float uTime;\\n\\nvarying vec3 vPosition;\\nvarying vec4 vColor;\\n\\nvoid main() {\\n\\n    vec4 color = vec4( vColor );\\n    // vec4 color = vec4( 0.0, 0.0, 0.0, 1.0 );\\n    color.r += sin( vPosition.x * 10.0 + uTime ) * 0.5;\\n    // color.g += sin( vPosition.y * 10.0 + uTime ) * 0.5;\\n\\n    gl_FragColor = color;\\n\\n}\");\n\n//# sourceURL=webpack:///./src/fragmentShader.frag?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stats_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats.module.js */ \"./src/stats.module.js\");\n/* harmony import */ var _vertexShader_vert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vertexShader.vert */ \"./src/vertexShader.vert\");\n/* harmony import */ var _fragmentShader_frag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fragmentShader.frag */ \"./src/fragmentShader.frag\");\n\n// import { GUI } from './dat.gui.module.js';\n\n\n\n\nvar container, stats;\nvar camera, scene, renderer;\nvar mouse = new THREE.Vector2();\nvar a_mouse = [];\nvar movement = [];\n\nvar instances = 10000;\nvar size = 0.01;\n\n// window.addEventListener('load', init);\n// window.addEventListener('load', animate);\ninit();\nanimate();\n\nfunction init() {\n    container = document.getElementById( 'container' );\n\n    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );\n    camera.position.z = 2;\n\n    scene = new THREE.Scene();\n    \n\n    var vector = new THREE.Vector4();\n\n    var positions = [];\n    var offsets = [];\n    var colors = [];\n    var orientationsStart = [];\n    var orientationsEnd = [];\n\n    positions.push( size, - size, 0 );\n    positions.push( - size, size, 0 );\n    positions.push( 0, 0, size );\n    // positions.push( 0, 0, 1 );\n\n\n    for ( var i = 0; i < instances; i ++ ) {\n        \n        offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ); // -0.5から0.5補正\n        // offsets.push( Math.random() * 0.1 + 1, Math.random() * 0.1 + 1, 0 );\n\n\n        colors.push( Math.random(), Math.random(), Math.random(), Math.random() );\n\n        // orientation start\n        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 ); // -1から1補正\n        // vector.set( Math.random() * 2 - 1, Math.random() * 0.5 + 1, Math.random() * 0.5 + 1, Math.random() * 0.5 + 1 );\n        vector.normalize();\n\n        orientationsStart.push( vector.x, vector.y, vector.z, vector.w );\n\n        // orientation end\n        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );\n        vector.normalize();\n\n        orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );\n        \n        a_mouse.push( 0.5, 0.5 );\n        movement.push( nonlinear(Math.random()) );\n\n    }\n    \n    // console.log(offsets.length);\n\n    var geometry = new THREE.InstancedBufferGeometry();\n    // geometry.maxInstancedCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise\n\n    // すべてのインスタンスで変わらない属性にはBufferAttributeを使用\n    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) ); // array, itemSize\n    // インスタンスごとに変わる可能性のある属性にはInstancedBufferAttributeを使用\n    geometry.setAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );\n    geometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );\n    geometry.setAttribute( 'orientationStart', new THREE.InstancedBufferAttribute( new Float32Array( orientationsStart ), 4 ) );\n    geometry.setAttribute( 'orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array( orientationsEnd ), 4 ) );\n\n\n    var material = new THREE.RawShaderMaterial( {\n\n        uniforms: {\n            \"uTime\": { value: 1.0 },\n            \"uSineTime\": { value: 1.0 }\n            // \"uMouse\": { value: new THREE.Vector2() }\n        },\n        vertexShader: _vertexShader_vert__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n        fragmentShader: _fragmentShader_frag__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n        side: THREE.DoubleSide,\n        transparent: true\n\n    } );\n\n\n    var mesh = new THREE.Mesh( geometry, material );\n    scene.add( mesh );\n    // console.log(scene.children[0]);\n\n\n    renderer = new THREE.WebGLRenderer();\n    renderer.setPixelRatio( window.devicePixelRatio );\n    renderer.setSize( window.innerWidth, window.innerHeight );\n    container.appendChild( renderer.domElement );\n\n    if ( renderer.extensions.get( 'ANGLE_instanced_arrays' ) === null ) {\n\n        document.getElementById( 'notSupported' ).style.display = '';\n        return;\n\n    }\n\n\n    // var gui = new GUI( { width: 350 } );\n    // gui.add( geometry, 'maxInstancedCount', 0, instances );\n\n\n    stats = new _stats_module_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    container.appendChild( stats.dom );\n\n\n    window.addEventListener( 'resize', onWindowResize, false );\n    \n    document.addEventListener( 'mousemove', event => {\n        mouse.x = (event.pageX / window.innerWidth - 0.5) * 2.5;\n        mouse.y = (- event.pageY / window.innerHeight + 0.5) * 2.0;\n    })\n\n}\n\n// 非線形な乱数\nfunction nonlinear(x) {\n    return (1.0 - Math.pow(Math.abs(Math.sin(Math.PI * x / 2.0)), 0.05)) * 0.9 + 0.01;\n}\n\nfunction onWindowResize() {\n\n    camera.aspect = window.innerWidth / window.innerHeight;\n    camera.updateProjectionMatrix();\n\n    renderer.setSize( window.innerWidth, window.innerHeight );\n\n}\n\n\nfunction animate() {\n\n    requestAnimationFrame( animate );\n\n    render();\n    stats.update();\n\n}\n\nfunction render() {\n\n    var time = performance.now();\n\n    var object = scene.children[ 0 ];\n\n    // object.rotation.y = uTime * 0.0005;\n    object.material.uniforms[ \"uTime\" ].value = time * 0.01;\n    object.material.uniforms[ \"uSineTime\" ].value = Math.sin( object.material.uniforms[ \"uTime\" ].value * 0.05 );\n\n    // object.material.uniforms[ \"uMouse\" ].value.lerp(mouse, 0.8);\n\n    var next_mouse = [];\n    var now_mouse;\n    for( var i = 0; i < instances; i ++ ) {\n        now_mouse = new THREE.Vector2(a_mouse[ i*2 ], a_mouse[ i*2+1 ]);\n        //console.log(now_mouse.x);\n        now_mouse.lerp(mouse, movement[i]);\n        next_mouse.push( now_mouse.x, now_mouse.y );\n    }\n    a_mouse = next_mouse;\n    object.geometry.setAttribute( 'aMouse', new THREE.InstancedBufferAttribute( new Float32Array( a_mouse ), 2 ) );\n\n    // console.log(object.material.uniforms[ \"mouse\" ].value.x);\n\n    renderer.render( scene, camera );\n\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/stats.module.js":
/*!*****************************!*\
  !*** ./src/stats.module.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n/**\n * @author mrdoob / http://mrdoob.com/\n */\n\nvar Stats = function () {\n\n\tvar mode = 0;\n\n\tvar container = document.createElement( 'div' );\n\tcontainer.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';\n\tcontainer.addEventListener( 'click', function ( event ) {\n\n\t\tevent.preventDefault();\n\t\tshowPanel( ++ mode % container.children.length );\n\n\t}, false );\n\n\t//\n\n\tfunction addPanel( panel ) {\n\n\t\tcontainer.appendChild( panel.dom );\n\t\treturn panel;\n\n\t}\n\n\tfunction showPanel( id ) {\n\n\t\tfor ( var i = 0; i < container.children.length; i ++ ) {\n\n\t\t\tcontainer.children[ i ].style.display = i === id ? 'block' : 'none';\n\n\t\t}\n\n\t\tmode = id;\n\n\t}\n\n\t//\n\n\tvar beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;\n\n\tvar fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );\n\tvar msPanel = addPanel( new Stats.Panel( 'MS', '#0f0', '#020' ) );\n\n\tif ( self.performance && self.performance.memory ) {\n\n\t\tvar memPanel = addPanel( new Stats.Panel( 'MB', '#f08', '#201' ) );\n\n\t}\n\n\tshowPanel( 0 );\n\n\treturn {\n\n\t\tREVISION: 16,\n\n\t\tdom: container,\n\n\t\taddPanel: addPanel,\n\t\tshowPanel: showPanel,\n\n\t\tbegin: function () {\n\n\t\t\tbeginTime = ( performance || Date ).now();\n\n\t\t},\n\n\t\tend: function () {\n\n\t\t\tframes ++;\n\n\t\t\tvar time = ( performance || Date ).now();\n\n\t\t\tmsPanel.update( time - beginTime, 200 );\n\n\t\t\tif ( time >= prevTime + 1000 ) {\n\n\t\t\t\tfpsPanel.update( ( frames * 1000 ) / ( time - prevTime ), 100 );\n\n\t\t\t\tprevTime = time;\n\t\t\t\tframes = 0;\n\n\t\t\t\tif ( memPanel ) {\n\n\t\t\t\t\tvar memory = performance.memory;\n\t\t\t\t\tmemPanel.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\treturn time;\n\n\t\t},\n\n\t\tupdate: function () {\n\n\t\t\tbeginTime = this.end();\n\n\t\t},\n\n\t\t// Backwards Compatibility\n\n\t\tdomElement: container,\n\t\tsetMode: showPanel\n\n\t};\n\n};\n\nStats.Panel = function ( name, fg, bg ) {\n\n\tvar min = Infinity, max = 0, round = Math.round;\n\tvar PR = round( window.devicePixelRatio || 1 );\n\n\tvar WIDTH = 80 * PR, HEIGHT = 48 * PR,\n\t\t\tTEXT_X = 3 * PR, TEXT_Y = 2 * PR,\n\t\t\tGRAPH_X = 3 * PR, GRAPH_Y = 15 * PR,\n\t\t\tGRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;\n\n\tvar canvas = document.createElement( 'canvas' );\n\tcanvas.width = WIDTH;\n\tcanvas.height = HEIGHT;\n\tcanvas.style.cssText = 'width:80px;height:48px';\n\n\tvar context = canvas.getContext( '2d' );\n\tcontext.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';\n\tcontext.textBaseline = 'top';\n\n\tcontext.fillStyle = bg;\n\tcontext.fillRect( 0, 0, WIDTH, HEIGHT );\n\n\tcontext.fillStyle = fg;\n\tcontext.fillText( name, TEXT_X, TEXT_Y );\n\tcontext.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );\n\n\tcontext.fillStyle = bg;\n\tcontext.globalAlpha = 0.9;\n\tcontext.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );\n\n\treturn {\n\n\t\tdom: canvas,\n\n\t\tupdate: function ( value, maxValue ) {\n\n\t\t\tmin = Math.min( min, value );\n\t\t\tmax = Math.max( max, value );\n\n\t\t\tcontext.fillStyle = bg;\n\t\t\tcontext.globalAlpha = 1;\n\t\t\tcontext.fillRect( 0, 0, WIDTH, GRAPH_Y );\n\t\t\tcontext.fillStyle = fg;\n\t\t\tcontext.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );\n\n\t\t\tcontext.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );\n\n\t\t\tcontext.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );\n\n\t\t\tcontext.fillStyle = bg;\n\t\t\tcontext.globalAlpha = 0.9;\n\t\t\tcontext.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );\n\n\t\t}\n\n\t};\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Stats);\n\n//# sourceURL=webpack:///./src/stats.module.js?");

/***/ }),

/***/ "./src/vertexShader.vert":
/*!*******************************!*\
  !*** ./src/vertexShader.vert ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"precision highp float;\\n\\nuniform float uSineTime;\\n\\nuniform mat4 modelViewMatrix; //ローカル座標から視点系座標への変換\\nuniform mat4 projectionMatrix; //視点系座標からクリッピング座標への変換\\n\\n// attribute: CPUから頂点シェーダへ、頂点ごとに異なる情報を渡すための修飾子。頂点シェーダでしか使えない\\n// 組み込みではない、geometry.setAttributeで定義されている\\nattribute vec3 position;\\nattribute vec3 offset;\\nattribute vec4 color;\\nattribute vec4 orientationStart;\\nattribute vec4 orientationEnd;\\nattribute vec2 aMouse;\\n\\n// varying: 頂点シェーダからフラグメントシェーダへ変数を渡すためのもの\\nvarying vec3 vPosition;\\nvarying vec4 vColor;\\n\\nvoid main(){\\n\\n    vPosition = offset * max( abs( uSineTime * 2.0 + 1.0 ), 0.1 ) + position;\\n    // vPosition = offset * 0.5 + position;\\n    vec4 orientation = normalize( mix( orientationStart, orientationEnd, uSineTime ) );\\n    // vec4 orientation = vec4(0.5, 0.5, 0.5, 0.5);\\n    vec3 vcV = cross( orientation.xyz, vPosition );\\n    vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );\\n\\n    vPosition += vec3(aMouse, 0.0);\\n\\n    vColor = color;\\n\\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );\\n\\n}\");\n\n//# sourceURL=webpack:///./src/vertexShader.vert?");

/***/ })

/******/ });