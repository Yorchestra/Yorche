precision mediump float;

varying vec2 vUv;

uniform sampler2D uTex;
uniform float uPercent;

void main() {
    float shift = uPercent * 0.02;

    float r = texture2D( uTex, vUv + vec2( shift, 0.0 )).r;
    float g = texture2D( uTex, vUv - vec2( 0.0, shift )).g;
    float b = texture2D( uTex, vUv - vec2( shift, 0.0)).b;

    vec3 color = vec3( r, g, b );
    gl_FragColor = vec4( color, 1.0 );
}