module.exports = function(THREE, scene) {
	var Noise = require('noisejs').Noise
	var noise = new Noise(0)

	var geometry = new THREE.CylinderGeometry( 2, 2, .1, 128)
	var matColor = new THREE.MeshBasicMaterial( {color:0xffffff})
	var portal = new THREE.Mesh( geometry, matColor)
	portal.rotation.x = Math.PI / 2

	for (var i = 0; i < geometry.vertices.length; i++ ) {
		var vtx = geometry.vertices[i]
		if (vtx.x == 0 || vtx.z == 0) continue

		var dot = new THREE.Mesh(
			new THREE.SphereGeometry(.01, 8, 8),
			new THREE.MeshLambertMaterial({color: 0x111111})
		)
		vtx.theta = i
		vtx.ball = dot

		portal.add(dot)
	}
	var animate = function() {
		requestAnimationFrame(animate)

		for (var i = 0; i < geometry.vertices.length - 1; i++ ) {
			var vtx = geometry.vertices[i]
			if (!vtx.ball) continue
			var r = 2 + noise.simplex2(vtx.theta / 5, Date.now() / 2000) / 3
			vtx.x = Math.cos(vtx.theta) * r
			vtx.z = Math.sin(vtx.theta) * r
			vtx.ball.position.set(vtx.x, vtx.y, vtx.z)
		}
		geometry.verticesNeedUpdate = true
	}
	animate()


	return portal
}
