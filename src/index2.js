window.addEventListener('load', init);

var width = window.innerWidth;
var height = window.innerHeight;

function init() {

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const container = document.getElementById("canvas-container");
  container.appendChild(renderer.domElement);

  // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10);
  camera.position.z = 3;// カメラを遠ざける

  // シーンを作成
  const scene = new THREE.Scene();

  // ライトを作成
  const light = new THREE.PointLight(0x00ffff);
  light.position.set(2, 2, 2);// ライトの位置を設定
  // ライトをシーンに追加
  scene.add(light);

  // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // マテリアルを作成
  //const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };
  const material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    //vertexShader: vertexShader,
    //fragmentShader: fragmentShader
} );

  // ジオメトリとマテリアルからメッシュを作成
  const mesh = new THREE.Mesh(geometry, material);

  // メッシュをシーンに追加
  scene.add(mesh);

/*
  var uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  const sgeometry = new THREE.PlaneBufferGeometry(2, 2);

  const smaterial = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
      //vertexShader: vertexShader,
      //fragmentShader: fragmentShader
  } );

  const smesh = new THREE.Mesh( sgeometry, smaterial );
  scene.add( smesh );
*/


  tick();


  function tick() {
    mesh.rotation.y += 0.01;
  
    renderer.render(scene, camera);
  
    requestAnimationFrame(tick);
  }
}

function add_shader_material() {
  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  var geometry = new THREE.PlaneGeometry(1, 1);

  var material = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
      //vertexShader: vertexShader,
      //fragmentShader: fragmentShader
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
}