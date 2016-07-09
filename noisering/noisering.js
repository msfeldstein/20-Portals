var glslify = require('glslify')

module.exports = function(THREE) {
	return function() {
		var particles = 100000
		var pGeom = new THREE.BufferGeometry()
		var positions = new Float32Array(particles * 3)
		var indices = new Float32Array(particles * 1)
		var thetas = new Float32Array(particles * 1)

		var r = 10
		for (var i = 0; i < positions.length; i += 3) {
			positions[i + 0] = Math.cos(i) * r
			positions[i + 1] = Math.sin(i) * r
			positions[i + 2] = 0

			indices[i / 3] = i / 3
			thetas[i / 3] = i / positions.length * Math.PI * 2
		}

		pGeom.addAttribute('position', new THREE.BufferAttribute(positions, 3))
		pGeom.addAttribute('idx', new THREE.BufferAttribute(indices, 1))
		pGeom.addAttribute('theta', new THREE.BufferAttribute(thetas, 1))
		pGeom.computeBoundingSphere()
		console.log(pGeom)
		var material = new THREE.ShaderMaterial({
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			depthWrite: false,
			uniforms: {
				time: {type: 'f', value: 0}
			},
			vertexShader: glslify('./vertex.vs'),
			fragmentShader: `
			varying vec4 vColor;
			void main() {
				gl_FragColor = vColor;
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
