precision highp float;

varying vec2 vUv;
uniform float color;
// Name it whatever it was named in the uniforms object
uniform sampler2D texture;
uniform vec2 renderSize;

void main(void) {
    gl_FragColor = texture2D(texture, gl_FragCoord.xy / renderSize);
}
