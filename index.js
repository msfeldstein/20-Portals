var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)
var EffectComposer = require('./lib/EffectComposer')(THREE)
var RenderPass = require('./lib/RenderPass')(THREE)
var FlyControls = require('./lib/FlyControls')(THREE)
var fs = require('fs')
var Noise = require('noisejs').Noise
var noise = new Noise(0)
var glslify = require('glslify')

var camera1 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000)
camera1.position.z = 1

var controls = new FlyControls(camera1)
controls.movementSpeed = 10;
controls.domElement = document.body;
controls.rollSpeed = Math.PI / 24;
controls.autoForward = false;
controls.dragToLook = true;

var renderer = new THREE.WebGLRenderer({antialias: true, transparent: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x666666)
renderer.gammaInput = true
renderer.gammaOutput = true
renderer.autoClear = false
document.body.appendChild(renderer.domElement)
document.body.style.margin = 0
var groundGeometry = new THREE.PlaneGeometry(100, 100, 20, 20)
groundGeometry.dynamic = true
for (var i = 0; i < groundGeometry.vertices.length; i++) {
	var vert = groundGeometry.vertices[i]
	vert.z = noise.simplex3(vert.x, vert.y, 0) * 3
}
var scene1 = require('./scene1')(THREE, groundGeometry)
var scene2 = require('./scene2')(THREE, groundGeometry)


var otherWorldTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
	minFilter: THREE.LinearFilter,
	magFilter: THREE.LinearFilter,
	format: THREE.RGBFormat,
} );

var screenSpaceMaterial = new THREE.ShaderMaterial({
	uniforms: {
		time: {type: 'f', value: 0},
		texture: {type: 't', value: otherWorldTarget.texture},
		renderSize: {type: 'v2', value: [window.innerWidth, window.innerHeight]}
	},
	side: THREE.DoubleSide,
	vertexShader: glslify('./ScreenMaskShader.vs'),
	fragmentShader: glslify('./ScreenMaskShader.fs')
})
scene1.portal.material = screenSpaceMaterial
scene2.portal.material = screenSpaceMaterial

var showOther = false
document.body.addEventListener('keypress', () => {
	showOther = !showOther
})
var clock = new THREE.Clock()
scene1.updateMatrixWorld()
var portalBox = new THREE.Box3().setFromObject(scene1.portal)
var helper = new THREE.BoundingBoxHelper(scene1.portal)
helper.update()
scene1.add(helper)

var inPrimaryWorld = true
var canSwitch = false
var startTime = Date.now()
var animate = function(t) {
	requestAnimationFrame(animate)
	screenSpaceMaterial.uniforms.time.value = startTime - Date.now()
	if (canSwitch && portalBox.containsPoint(camera1.position)) {
		inPrimaryWorld = !inPrimaryWorld
		// scene1.portal.visible = inPrimaryWorld
		// scene2.portal.visible = !inPrimaryWorld
		canSwitch = false
	}

	if (!portalBox.containsPoint(camera1.position)) canSwitch = true
	for (var i = 0; i < groundGeometry.vertices.length; i++) {
		var vert = groundGeometry.vertices[i]
		vert.z = noise.simplex3(vert.x, vert.y, Date.now() / 8000) * 5
	}
	groundGeometry.verticesNeedUpdate = true
	controls.update( clock.getDelta() );
	renderer.clearTarget(otherWorldTarget)
	var mainScene = inPrimaryWorld ? scene1 : scene2
	var otherScene = inPrimaryWorld ? scene2 : scene1
	renderer.render(otherScene, camera1, otherWorldTarget, true)
	renderer.render(mainScene, camera1)

}

window.THREE = THREE
window.scene = scene1
requestAnimationFrame(animate)
