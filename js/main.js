// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    //const camera = new THREE.PerspectiveCamera(45, width / height);
    //camera.position.set(0, 0, +1000);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    // 箱を作成
    //const geometry = new THREE.BoxGeometry(400, 400, 400);
    //const material = new THREE.MeshNormalMaterial();

    const geometry = new THREE.PlaneGeometry(2, 2, 10, 10);

    const vertexSource = `
    void main() {
        gl_Position = vec4(position, 1.0);
    }
    `;

    const fragmentSource = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `;

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexSource,
        fragmentShader: fragmentSource,
        wireframe: true
    });

    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        box.rotation.y += 0.01;
        renderer.render(scene, camera); // レンダリング

        requestAnimationFrame(tick);
    }
}