module.exports = function(THREE, scene) {
	var Noisering = require('./noisering/noisering')(THREE)

	var geometry = new THREE.CylinderGeometry( 2, 2, .11, 32)
	var matColor = new THREE.MeshBasicMaterial( {color:0xffffff})
	var portal = new THREE.Mesh( geometry, matColor)
	portal.rotation.x = Math.PI / 2
	var ring = new Noisering()
	portal.add(ring)
	geometry.computeBoundingBox()

	return portal
}
