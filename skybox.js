var SKY_SIZE = 150
module.exports = function(THREE, dir, ext) {
	var skyGeometry = new THREE.BoxGeometry(SKY_SIZE, SKY_SIZE, SKY_SIZE)
	var matArray = []
	var names = ["px", "nx", "py", "ny", "pz", "nz"]
	var loader = new THREE.TextureLoader()
	names.forEach((name) => {
		matArray.push(new THREE.MeshBasicMaterial({
			map: loader.load(dir + name + "." + ext),
			side: THREE.BackSide
		}))
	})
	var skymat = new THREE.MeshFaceMaterial(matArray)
	var skybox = new THREE.Mesh(skyGeometry, skymat)
	return skybox
}
