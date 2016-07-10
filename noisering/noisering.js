var glslify = require('glslify')

module.exports = function(THREE) {
	return function() {
		var particles = 10000
		var pGeom = new THREE.BufferGeometry()
		var positions = new Float32Array(particles * 3)
		var indices = new Float32Array(particles * 1)
		var thetas = new Float32Array(particles * 1)

		var r = 10
		for (var i = 0; i < positions.length; i += 3) {
			positions[i + 0] = 0;// Math.cos(i) * r
			positions[i + 1] = 0;// Math.sin(i) * r
			positions[i + 2] = 0

			indices[i / 3] = i / 3
			thetas[i / 3] = i / positions.length * Math.PI * 2
		}

		pGeom.addAttribute('position', new THREE.BufferAttribute(positions, 3))
		pGeom.addAttribute('idx', new THREE.BufferAttribute(indices, 1))
		pGeom.addAttribute('theta', new THREE.BufferAttribute(thetas, 1))
		pGeom.computeBoundingSphere()
		console.log(pGeom)
		var textureLoader = new THREE.TextureLoader()
		var material = new THREE.ShaderMaterial({
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			depthWrite: false,
			uniforms: {
				tex: {type: 't', value: textureLoader.load('assets/particle.png')},
				radius: {type: 'f', value: 1.0},
				time: {type: 'f', value: 0}
			},
			vertexShader: glslify('./vertex.vs'),
			fragmentShader: `
			uniform sampler2D tex;
			varying vec4 vColor;
			void main() {
				vec4 c = texture2D(tex, gl_PointCoord);
				c.a = 0.1;
				gl_FragColor = c;
			}
			`
		})

		var particleSystem = new THREE.Points(pGeom, material)
		var startTime = Date.now()
		var animate = function() {
			requestAnimationFrame(animate)
			material.uniforms.time.value = (Date.now() - startTime) / 5000
		}
		animate()
		return particleSystem
	}
}
