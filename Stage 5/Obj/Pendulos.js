(function(window) {

	function Pendulos()
	{
		this.view=new createjs.Bitmap("images/Ball_30x30.png");
		this.view.regX=15;
		this.view.regY=15;
		// this.view.scaleY=1.1;
		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=25.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var ballBody=new box2d.b2BodyDef();
		ballBody.type=box2d.b2Body.b2_dynamicBody;
		ballBody.position.x=580/SCALE;
		ballBody.position.y=300/SCALE;
		ballBody.userData = "Pendulos";
		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape=new box2d.b2CircleShape(15/SCALE);

		this.view.body=world.CreateBody(ballBody);
		this.view.body.CreateFixture(fixDef);

		
		var bodyDef1 = new box2d.b2BodyDef;
		bodyDef1.type = box2d.b2Body.b2_staticBody;
		bodyDef1.position.x = 580/SCALE;
		bodyDef1.position.y = 50/SCALE;
		body1 = world.CreateBody(bodyDef1);


		var jointDef = new box2d.b2RevoluteJointDef;
		var jointCenter = new box2d.b2Vec2(580/SCALE,50/SCALE);
		jointDef.Initialize(this.view.body,body1, jointCenter);

		// jointDef.Initialize(bodyA, bodyB, myBodyA->GetWorldCenter());
		// jointDef.lowerAngle = -90; // -90 degrees
		// jointDef.upperAngle = 45; // 45 degrees
		// jointDef.enableLimit = true;
		// jointDef.maxMotorTorque = 100.0;
		// jointDef.motorSpeed = 25;
		// jointDef.enableMotor = true;




		world.CreateJoint(jointDef);

		this.view.onTick=tick;
	}

	var retry;
	function rope(angle) {
		stage.removeChild(retry);
		 var img1 = new Image();
    	img1.src = "images/rope.png";
    	retry = new createjs.Bitmap(img1);
    	retry.regX=10;
    	retry.regY=0;
    	retry.scaleY=2.35

    	retry.x=585;
    	retry.y=52;
    	retry.rotation=angle;
    	stage.addChild(retry);
    
	}
	
	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
		rope(this.rotation);

		// this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Pendulos=Pendulos;
})(window);