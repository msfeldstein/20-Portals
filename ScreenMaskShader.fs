precision highp float;

varying vec2 vUv;
uniform float color;
// Name it whatever it was named in the uniforms object
uniform sampler2D texture;
uniform vec2 renderSize;

void main(void) {
    // Standard sampling procedure. Just make sure
    // you've passed the uv coords varying.
    gl_FragColor = texture2D(texture, gl_FragCoord.xy / renderSize);
}
