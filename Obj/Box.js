(function(window) {
	function Box()
	{
		this.view=new createjs.Bitmap("images/box40x40.png");
		this.view.regX=20;
		this.view.regY=20;
		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=5.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x=965/SCALE;
		bodyDef.position.y=520/SCALE;

		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(20/SCALE,20/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Box=Box;
})(window);