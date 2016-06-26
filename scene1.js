module.exports = function(THREE, geometry) {
	var scene = new THREE.Scene()
	require('./lighting')(THREE, scene)
	var numObjects = 10
	var r = 10
	for (var i = 0; i < numObjects; i++) {
		var theta = Math.PI * 2 * i / numObjects
		var box = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		)
		box.position.set(r * Math.cos(theta), 0, r * Math.sin(theta))
		scene.add(box)
	}

	var skybox = require('./skybox')(THREE, 'assets/skybox/clouds/', 'jpg')
	scene.add(skybox)
	return scene


}
