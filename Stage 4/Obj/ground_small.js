(function(window) {
	function GroundSmall()
	{
		this.view=new createjs.Bitmap("images/ground_small.png");
		this.view.regX=200;
		this.view.regY=50;
		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=10.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=1000/SCALE;
		bodyDef.position.y=610/SCALE;
		bodyDef.userData = "ground_small";
		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(200/SCALE,50/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.GroundSmall=GroundSmall;
})(window);