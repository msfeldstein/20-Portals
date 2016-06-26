/**
 * @author alteredq / http://alteredqualia.com/
 */
module.exports = function(THREE) {
	THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

		THREE.Pass.call( this );

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

		this.clear = true;
		this.needsSwap = false;

	};

	THREE.RenderPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

		constructor: THREE.RenderPass,

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			this.scene.overrideMaterial = this.overrideMaterial;

			var oldClearColor, oldClearAlpha;

			if ( this.clearColor ) {

				oldClearColor = renderer.getClearColor().getHex();
				oldClearAlpha = renderer.getClearAlpha();

				renderer.setClearColor( this.clearColor, this.clearAlpha );

			}

			renderer.render( this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear );

			if ( this.clearColor ) {

				renderer.setClearColor( oldClearColor, oldClearAlpha );

			}

			this.scene.overrideMaterial = null;

		}

	} );
	
	return THREE.RenderPass
}