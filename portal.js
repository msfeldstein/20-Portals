module.exports = function(THREE, scene) {
	var Noisering = require('./noisering/noisering')(THREE)

	var geometry = new THREE.CylinderGeometry( 2, 2, .1, 32)
	var matColor = new THREE.MeshBasicMaterial( {color:0xffffff})
	var portal = new THREE.Mesh( geometry, matColor)
	portal.rotation.x = Math.PI / 2
	var ring = new Noisering()
	portal.add(ring)


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
