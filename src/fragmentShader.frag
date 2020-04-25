precision highp float;

uniform float uTime;

varying vec3 vPosition;
varying vec4 vColor;

void main() {

    vec4 color = vec4( vColor );
    // vec4 color = vec4( 0.0, 0.0, 0.0, 1.0 );
    color.r += sin( vPosition.x * 10.0 + uTime ) * 0.5;
    // color.g += sin( vPosition.y * 10.0 + uTime ) * 0.5;

    gl_FragColor = color;

}