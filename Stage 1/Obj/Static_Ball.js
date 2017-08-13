(function(window) {
	function Static_Ball()
	{
		this.view=new createjs.Bitmap("images/ball.png");
		this.view.regX=this.view.regY=10;
		// 
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=5.0;
		fixDef.friction=10000000000000000000;
		fixDef.restitution=0.1;
		
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=860/SCALE;
		bodyDef.position.y=550/SCALE;

		fixDef.shape=new box2d.b2CircleShape(20/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Static_Ball=Static_Ball;
})(window);