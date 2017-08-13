(function(window) {
	function Ball(xpos,ypos,angle,power)
	{
		this.view=new createjs.Bitmap("images/ball.png");
		this.view.regX=this.view.regY=10;
		// 
		// var power=14000;
		// alert(power);
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=40.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var force1=new box2d.b2Vec2(power*Math.cos(angle*Math.PI/180),power*Math.sin(angle*Math.PI/180));
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x=xpos/SCALE;
		bodyDef.position.y=ypos/SCALE;
		bodyDef.userData = "Ball";
		fixDef.shape=new box2d.b2CircleShape(10/SCALE);


		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		
		this.view.body.ApplyForce( force1,this.view.body.GetPosition() );
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Ball=Ball;
})(window);
