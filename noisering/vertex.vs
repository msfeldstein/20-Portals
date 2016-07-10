attribute float idx;
attribute vec3 color;
attribute float theta;
uniform float radius;
uniform float time;
varying vec4 vColor;
#pragma glslify: noise = require('glsl-noise/simplex/3d')

vec4 doNoise(vec4 p, float period, float amt) {
	float nx = noise(vec3(idx * period, time, 0.0)) * amt ;
	float ny = noise(vec3(0.0, idx * period * 1.0, time)) * amt;
	float nz = noise(vec3(time, 0.0, idx * period)) * amt ;
	return p += vec4(nx, ny, nz, 0.0);
}
void main() {
	float ind = idx;
	vec4 p = projectionMatrix *
		modelViewMatrix *
		vec4(vec3(radius * cos(theta) * 2.0, 0.0, radius * sin(theta) * 2.0),1.0);
	vec4 origP = p;

	p = doNoise(p, 0.20, 0.2);
	p = doNoise(p, 0.10, 0.1);
	vColor = vec4(1.0);
	float d = distance(p, origP);
	// vColor.a = 1.0 - pow(d / 0.1,1.0);
	vColor.a = 0.1;
	gl_Position = p;
	gl_PointSize = 10.0;
}
