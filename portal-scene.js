module.exports = function(THREE) {
	var geometry = new THREE.SphereGeometry( 50, 32, 32)
	var matColor = new THREE.MeshBasicMaterial( {color:0xffffff})
	var mesh1 = new THREE.Mesh( geometry, matColor)
	mesh1.position.z = -190
	var portalScene = new THREE.Scene
	portalScene.add(mesh1)
	require('./lighting')(THREE, portalScene)

	return portalScene
}
