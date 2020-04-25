import Stats from './stats.module.js';
// import { GUI } from './dat.gui.module.js';

import vertexShader from './vertexShader.vert';
import fragmentShader from './fragmentShader.frag';

var container, stats;
var camera, scene, renderer;
var mouse = new THREE.Vector2();
var a_mouse = [];
var movement = [];

var instances = 10000;
var size = 0.01;

// window.addEventListener('load', init);
// window.addEventListener('load', animate);
init();
animate();

function init() {
    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    

    var vector = new THREE.Vector4();

    var positions = [];
    var offsets = [];
    var colors = [];
    var orientationsStart = [];
    var orientationsEnd = [];

    positions.push( size, - size, 0 );
    positions.push( - size, size, 0 );
    positions.push( 0, 0, size );
    // positions.push( 0, 0, 1 );


    for ( var i = 0; i < instances; i ++ ) {
        
        offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ); // -0.5から0.5補正
        // offsets.push( Math.random() * 0.1 + 1, Math.random() * 0.1 + 1, 0 );


        colors.push( Math.random(), Math.random(), Math.random(), Math.random() );

        // orientation start
        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 ); // -1から1補正
        // vector.set( Math.random() * 2 - 1, Math.random() * 0.5 + 1, Math.random() * 0.5 + 1, Math.random() * 0.5 + 1 );
        vector.normalize();

        orientationsStart.push( vector.x, vector.y, vector.z, vector.w );

        // orientation end
        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
        vector.normalize();

        orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );
        
        a_mouse.push( 0.5, 0.5 );
        movement.push( nonlinear(Math.random()) );

    }
    
    // console.log(offsets.length);

    var geometry = new THREE.InstancedBufferGeometry();
    // geometry.maxInstancedCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise

    // すべてのインスタンスで変わらない属性にはBufferAttributeを使用
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) ); // array, itemSize
    // インスタンスごとに変わる可能性のある属性にはInstancedBufferAttributeを使用
    geometry.setAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );
    geometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );
    geometry.setAttribute( 'orientationStart', new THREE.InstancedBufferAttribute( new Float32Array( orientationsStart ), 4 ) );
    geometry.setAttribute( 'orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array( orientationsEnd ), 4 ) );


    var material = new THREE.RawShaderMaterial( {

        uniforms: {
            "uTime": { value: 1.0 },
            "uSineTime": { value: 1.0 }
            // "uMouse": { value: new THREE.Vector2() }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide,
        transparent: true

    } );


    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    // console.log(scene.children[0]);


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    if ( renderer.extensions.get( 'ANGLE_instanced_arrays' ) === null ) {

        document.getElementById( 'notSupported' ).style.display = '';
        return;

    }


    // var gui = new GUI( { width: 350 } );
    // gui.add( geometry, 'maxInstancedCount', 0, instances );


    stats = new Stats();
    container.appendChild( stats.dom );


    window.addEventListener( 'resize', onWindowResize, false );
    
    document.addEventListener( 'mousemove', event => {
        mouse.x = (event.pageX / window.innerWidth - 0.5) * 2.5;
        mouse.y = (- event.pageY / window.innerHeight + 0.5) * 2.0;
    })

}

// 非線形な乱数
function nonlinear(x) {
    return (1.0 - Math.pow(Math.abs(Math.sin(Math.PI * x / 2.0)), 0.05)) * 0.9 + 0.01;
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

}

function render() {

    var time = performance.now();

    var object = scene.children[ 0 ];

    // object.rotation.y = uTime * 0.0005;
    object.material.uniforms[ "uTime" ].value = time * 0.01;
    object.material.uniforms[ "uSineTime" ].value = Math.sin( object.material.uniforms[ "uTime" ].value * 0.05 );

    // object.material.uniforms[ "uMouse" ].value.lerp(mouse, 0.8);

    var next_mouse = [];
    var now_mouse;
    for( var i = 0; i < instances; i ++ ) {
        now_mouse = new THREE.Vector2(a_mouse[ i*2 ], a_mouse[ i*2+1 ]);
        //console.log(now_mouse.x);
        now_mouse.lerp(mouse, movement[i]);
        next_mouse.push( now_mouse.x, now_mouse.y );
    }
    a_mouse = next_mouse;
    object.geometry.setAttribute( 'aMouse', new THREE.InstancedBufferAttribute( new Float32Array( a_mouse ), 2 ) );

    // console.log(object.material.uniforms[ "mouse" ].value.x);

    renderer.render( scene, camera );

}
