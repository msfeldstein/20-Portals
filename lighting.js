module.exports = function(THREE, scene) {
	var light = new THREE.PointLight(0xffffff, 1, 100)
	light.position.set(50, 30, 40)
	scene.add(light)

	light = new THREE.PointLight(0xffffff, 2, 100)
	light.position.set(-50, 50, 40)
	scene.add(light)

	light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.1 );
	// scene.add( light );
}
