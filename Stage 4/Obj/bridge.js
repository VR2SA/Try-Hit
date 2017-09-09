(function(window) {
	function Bridge()
	{
		// this.view=new createjs.Bitmap("images/bridge.png");
		// this.view.regX=25;
		// this.view.regY=100;
		// this.view.scaleY=1.1;
		// this.view.x=590;
		// this.view.y=600;

		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=50.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=565/SCALE;
		bodyDef.position.y=460/SCALE;
		bodyDef.userData = "Bridge";
		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(25/SCALE,100/SCALE);

		var body=world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		// var bodyDef1 = new box2d.b2BodyDef;
		// bodyDef1.type = box2d.b2Body.b2_staticBody;
		// bodyDef1.position.x = 580/SCALE;
		// bodyDef1.position.y = 460/SCALE;
		// body1 = world.CreateBody(bodyDef1);


		// var jointDef = new box2d.b2RevoluteJointDef;
		// var jointCenter = new box2d.b2Vec2(580/SCALE,460/SCALE);
		// jointDef.Initialize(this.view.body,body1, jointCenter);

		// this.view.onTick=tick;
	}

	// function tick(e) {
	// 	this.x=this.body.GetPosition().x*SCALE;
	// 	this.y=this.body.GetPosition().y*SCALE;
	// 	//this.rotation=this.body.GetAngle()*(180/Math.PI);
	// }

	window.Bridge=Bridge;
})(window);