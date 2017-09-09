(function(window) {
	function Switch()
	{
		this.view=new createjs.Bitmap("images/button60x20.png");
		this.view.regX=10;
		this.view.regY=30;
		this.view.rotation=-90;
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=5.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=795/SCALE;
		bodyDef.position.y=160/SCALE;
		bodyDef.userData = "switch";
		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(10/SCALE,11/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		
	}

	window.Switch=Switch;
})(window);