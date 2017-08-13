(function(window) {
	function Ball3()
	{
		this.view=new createjs.Bitmap("images/ball1.png");
		this.view.regX=this.view.regY=25;
		// 
		var power=1;
		// alert(power);
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=40.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var force1=new box2d.b2Vec2(-power,0);
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_kinematicBody;
		bodyDef.position.x=1500/SCALE;
		bodyDef.position.y=100/SCALE;
		bodyDef.userData = "Ball";
		fixDef.shape=new box2d.b2CircleShape(20/SCALE);


		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		
		this.view.body.SetLinearVelocity( force1,this.view.body.GetPosition() );
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Ball3=Ball3;
})(window);
