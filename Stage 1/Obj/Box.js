(function(window) {
	function Box()
	{
		this.view=new createjs.Bitmap("images/box40x40.png");
		this.view.regX=20;
		this.view.regY=20;
		this.view.scaleY=.2;
		this.view.scaleX=2;
		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=5.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=980/SCALE;
		bodyDef.position.y=555/SCALE;
		bodyDef.userData = "target";

		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(40/SCALE,4/SCALE);

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