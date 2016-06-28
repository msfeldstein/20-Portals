module.exports = function(THREE, groundGeometry) {
	var scene = new THREE.Scene()
	require('./lighting')(THREE, scene)
	var numObjects = 10
	var r = 10
	for (var i = 0; i < numObjects; i++) {
		var theta = -Math.PI * i / numObjects
		var box = new THREE.Mesh(
			new THREE.SphereGeometry(.5, 32, 32),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		)
		box.position.set(r * Math.cos(theta), 0, r * Math.sin(theta))
		scene.add(box)
	}


	var ground = new THREE.Mesh(
		groundGeometry,
		new THREE.MeshPhongMaterial({color: 0xeeeeee})
	)
	scene.add(ground)
	ground.rotation.x = -Math.PI / 2
	ground.position.y = -4

	var skybox = require('./skybox')(THREE, 'assets/skybox/galaxy/', 'png')
	scene.add(skybox)

	return scene


}
