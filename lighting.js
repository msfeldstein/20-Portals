module.exports = function(THREE, scene) {
	var light = new THREE.PointLight(0xffffff, 1, 100)
	light.position.set(50, 30, 40)
	scene.add(light)

	light = new THREE.PointLight(0xef20cd, 2, 100)
	light.position.set(-50, -30, 40)
	scene.add(light)

	light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	scene.add( light );
}
