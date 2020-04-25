import vertexShader from './vertexShader.vert';
import fragmentShader from './fragmentShader.frag';

var container, camera, scene, renderer;
var mouse = new THREE.Vector2(0.5, 0.5);

// window.addEventListener('load', init);
// window.addEventListener('load', animate);
init();
animate();

function init() {
    container = document.getElementById( 'music-container' );

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1); // left, right, top, bottom, near, far

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneGeometry(2, 2, 1, 1); // width, height, widthSegments, heightSegments

    var loader = new THREE.TextureLoader();
    var texture = loader.load('./img/music.jpg');

    var material = new THREE.ShaderMaterial( {
        uniforms: {
            uTex: { value: texture },
            uPercent: { value: 0.0 }
        },
        // vertexShader: document.getElementById( 'imageEffectVert' ).textContent,
        // fragmentShader: document.getElementById( 'imageEffectFrag' ).textContent
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    } );

    var mesh = new THREE.Mesh(geometry, material);

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', event => {
        mouse.x = (event.pageX / window.innerWidth - 0.5);
        mouse.y = (- event.pageY / window.innerHeight + 0.5);
    } )

    container.addEventListener( 'mouseover', () => {
        material.uniforms[ "uPercent" ].value = 1.0;
    } )
    container.addEventListener( 'mouseleave', () => {
        material.uniforms[ "uPercent" ].value = 0.0;
    } )
}

function animate() {
    requestAnimationFrame( animate );

    render();
}

function render() {
    renderer.render( scene, camera );
}