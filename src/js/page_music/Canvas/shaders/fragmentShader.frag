precision mediump float;
uniform float u_time; // time
uniform vec2  u_resolution; // resolution
uniform vec2 u_mouse;
        
void main(void){
    vec3 destColor = vec3(0.5, 0.4, 0.0);
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y); // 正規化
    float l = 0.05 / abs(length(p) - 0.5) * (sin(u_time)*0.5+1.0);
    //l += 0.05 / abs(length(p*sin(u_time)) - 0.3);
    //l += 0.05 / abs(length(p) - 0.1);
    gl_FragColor = vec4(l*destColor, 1.0);
}