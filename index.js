var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = .1
var controls = new OrbitControls(camera)
var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
document.body.style.margin = 0

var scene = require('./scene1')(THREE)
scene.add(camera)

var otherScene = require('./scene2')(THREE)

var activeScene = scene
document.body.addEventListener('keypress', () => {
	if (activeScene == scene)
		activeScene = otherScene
	else
		activeScene = scene
	activeScene.add(camera)
})

var animate = function(t) {
	requestAnimationFrame(animate)
	renderer.render(activeScene, camera)
	// renderer.render(otherScene, camera)
}
requestAnimationFrame(animate)
