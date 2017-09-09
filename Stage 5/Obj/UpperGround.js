(function(window) {
	function UpperGround()
	{
		this.view=new createjs.Bitmap("images/ground100x25.png");
		this.view.regX=50;
		this.view.regY=12.5;
		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=10.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=800/SCALE;
		bodyDef.position.y=150/SCALE;
		bodyDef.userData = "ground_small";
		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(50/SCALE,12.5/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.UpperGround=UpperGround;
})(window);