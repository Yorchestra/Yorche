precision highp float;

uniform float uSineTime;

uniform mat4 modelViewMatrix; //ローカル座標から視点系座標への変換
uniform mat4 projectionMatrix; //視点系座標からクリッピング座標への変換

// attribute: CPUから頂点シェーダへ、頂点ごとに異なる情報を渡すための修飾子。頂点シェーダでしか使えない
// 組み込みではない、geometry.setAttributeで定義されている
attribute vec3 position;
attribute vec3 offset;
attribute vec4 color;
attribute vec4 orientationStart;
attribute vec4 orientationEnd;
attribute vec2 aMouse;

// varying: 頂点シェーダからフラグメントシェーダへ変数を渡すためのもの
varying vec3 vPosition;
varying vec4 vColor;

void main(){

    vPosition = offset * max( abs( uSineTime * 2.0 + 1.0 ), 0.1 ) + position;
    // vPosition = offset * 0.5 + position;
    vec4 orientation = normalize( mix( orientationStart, orientationEnd, uSineTime ) );
    // vec4 orientation = vec4(0.5, 0.5, 0.5, 0.5);
    vec3 vcV = cross( orientation.xyz, vPosition );
    vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );

    vPosition += vec3(aMouse, 0.0);

    vColor = color;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

}