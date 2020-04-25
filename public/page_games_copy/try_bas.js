window.addEventListener('load', init);

function init() {

    var prefabWidth = 1.0;
    var prefabHeight = 1.0;
    var prefabCount = 100;
    // PlaneGeometry を prefab とする (他のジオメトリも可)
    const prefab = new THREE.PlaneGeometry(prefabWidth, prefabHeight)

    // prefab を prefabCount 数の分だけ増やしたジオメトリを生成
    const geometry = new BAS.PrefabBufferGeometry(prefab, prefabCount)

    // attribute 変数初期化
    // .createAttribute([変数名], [ベクトル成分数])
    // 位置
    const aPosition = geometry.createAttribute('aPosition', 3)
    // 位置 (終点)
    const aEndPosition = geometry.createAttribute('aEndPosition', 3)
    // 回転
    const aAxisAngle = geometry.createAttribute('aAxisAngle', 4)

    // 各 prefab ごとに attribute 変数値を設定
    for (let i = 0; i < prefabCount; i++) {
    // 位置 (XYZ座標)
    // 値は任意
    geometry.setPrefabData(aPosition, i, [x, y, z])
    geometry.setPrefabData(aEndPosition, i, [x, y, z])
    // 回転 (軸、角度)
    // 値は任意
    geometry.setPrefabData(aAxisAngle, i, [x, y, z, angle])
    }

    // THREE.BAS 用マテリアル生成
    const material = new BAS.BasicAnimationMaterial({
    // シェーダで使う uniform 変数を指定
    uniforms: {
        uTime: { value: 0.0 }
    },
    // 頂点シェーダで使う THREE.BAS のビルトイン関数を指定
    vertexFunctions: [
        // easeCubicInOut
        BAS.ShaderChunk['ease_cubic_in_out'],
        // quatFromAxisAngle, rotateVector
        BAS.ShaderChunk['quaternion_rotation']
    ],
    // 頂点シェーダで使う変数を指定 (GLSL)
    vertexParameters: [
        'uniform float uTime;',
        'attribute vec3 aPosition;',
        'attribute vec3 aEndPosition;',
        'attribute vec4 aAxisAngle;'
    ],
    // 頂点シェーダで使う値の初期化 (GLSL)
    vertexInit: [
        // quatFromAxisAngle: 軸と角度から回転を表すクォータニオン算出 (THREE.BAS 提供関数)
        'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, aAxisAngle.w);',
        // 一般的な Easing 関数は THREE.BAS で提供されている
        'float tProgress = easeCubicInOut(uTime);'
    ],
    // prefab の位置を計算する (GLSL)
    vertexPosition: [
        // transformed: prefab の位置 (three.js の ShaderChunk で定義されているもの)
        // 最初は原点の状態で、その値を変更することで移動させることができる
        // 回転
        // rotateVector: クォータニオンを基に回転後の transformed を算出
        'transformed = rotateVector(tQuat, transformed);',
        // 位置
        'transformed += mix(aPosition, aEndPosition, tProgress);'
    ]
    })

    // 上記 geometry と material を基に three.js のメッシュを生成してシーンに追加
    const mesh = new THREE.Mesh(geometry, material)
    const scene = new THREE.Scene()
    scene.add(mesh)

    // uniform 変数の値は JS で変化させる
    material.uniforms['uTime'].value = time
}