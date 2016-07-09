precision highp float;

// varying vec2 vUv;
uniform float color;
// Name it whatever it was named in the uniforms object
uniform sampler2D texture;
uniform vec2 renderSize;
uniform float time;
#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main(void) {
    vec2 p = gl_FragCoord.xy / renderSize;
    // p += noise(vec3(p, time / 1000.0)) * 0.10;
    gl_FragColor = texture2D(texture, p);
}
