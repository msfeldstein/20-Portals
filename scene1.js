module.exports = function(THREE, groundGeometry) {
	var OBJLoader = require('./lib/ObjLoader')(THREE)
	var scene = new THREE.Scene()

	require('./lighting')(THREE, scene)
	var portal = require('./portal')(THREE, scene)

	var ground = new THREE.Mesh(
		groundGeometry,
		new THREE.MeshPhongMaterial({color: 0xAE1AF7, wireframe: true})
	)
	scene.add(ground)
	ground.rotation.x = -Math.PI / 2
	ground.position.y = -6

	var numObjects = 10
	var r = 10
	var shapes = []
	for (var i = 0; i < numObjects; i++) {
		var theta = -Math.PI * i / numObjects
		var box = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshPhongMaterial({color: 0xffffff})
		)
		box.position.set(r * Math.cos(theta), 0, r * Math.sin(theta))
		scene.add(box)
		shapes.push(box)
	}

	var skybox = require('./skybox')(THREE, 'assets/skybox/clouds/', 'jpg')
	scene.add(skybox)

	scene.portal = portal
	scene.add(portal)
	portal.position.z = -5





		var animate = function() {
			requestAnimationFrame(animate)
			for (var i = 0; i < shapes.length; i++) {
				var shape = shapes[i]
				shape.position.y = Math.sin(Date.now() / 1000 + i) * 3
			}
		}

		requestAnimationFrame(animate)


	return scene


}
