var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)
var EffectComposer = require('./lib/EffectComposer')(THREE)
var RenderPass = require('./lib/RenderPass')(THREE)
var FlyControls = require('./lib/FlyControls')(THREE)
var fs = require('fs')
var Noise = require('noisejs').Noise
var noise = new Noise(0)

var camera1 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000)
camera1.position.z = .1

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
var portalScene = require('./portal-scene')(THREE)
portalScene.add(camera1.clone())

var otherWorldTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
	minFilter: THREE.LinearFilter,
	magFilter: THREE.LinearFilter,
	format: THREE.RGBFormat,
} );

var screenSpaceMaterial = new THREE.ShaderMaterial({
	uniforms: {
		texture: {type: 't', value: otherWorldTarget.texture},
		renderSize: {type: 'v2', value: [window.innerWidth, window.innerHeight]}
	},
	side: THREE.DoubleSide,
	vertexShader: fs.readFileSync('./ScreenMaskShader.vs').toString(),
	fragmentShader: fs.readFileSync('./ScreenMaskShader.fs').toString()
})
scene1.portal.material = screenSpaceMaterial
var showOther = false
document.body.addEventListener('keypress', () => {
	showOther = !showOther
})
var clock = new THREE.Clock()
scene1.updateMatrixWorld()
var portalBox = new THREE.Box3().setFromObject(scene1.portal)
var vector = new THREE.Vector3();
vector.setFromMatrixPosition( scene1.portal.matrixWorld );

portalBox.translate(vector)
portalBox.expandByVector(new THREE.Vector3(0, 0, 6))
var inPrimaryWorld = true

var animate = function(t) {
	requestAnimationFrame(animate)
	if (inPrimaryWorld && portalBox.containsPoint(camera1.position)) {
		inPrimaryWorld = false
	}
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
