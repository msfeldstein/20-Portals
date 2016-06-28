module.exports = function(THREE, groundGeometry) {
	var OBJLoader = require('./lib/ObjLoader')(THREE)
	var scene = new THREE.Scene()

	require('./lighting')(THREE, scene)

	var ground = new THREE.Mesh(
		groundGeometry,
		new THREE.MeshPhongMaterial({color: 0xAE1AF7, wireframe: true})
	)
	scene.add(ground)
	ground.rotation.x = -Math.PI / 2
	ground.position.y = -4

	var numObjects = 10
	var r = 10
	for (var i = 0; i < numObjects; i++) {
		var theta = -Math.PI * i / numObjects
		var box = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		)
		box.position.set(r * Math.cos(theta), 0, r * Math.sin(theta))
		scene.add(box)
	}

	var skybox = require('./skybox')(THREE, 'assets/skybox/clouds/', 'jpg')
	scene.add(skybox)

	var loader = new OBJLoader()
	var objSource = require('fs').readFileSync('./assets/window.obj').toString()
	var model = loader.parse(objSource)

	var portalMesh = model.children.filter((c) => c.name == "Portal_Cube")[0]

	scene.add(model)
	model.position.z = -5
	model.scale.set(10, 10, 10)
	scene.portal = portalMesh

	return scene


}
