(function(window) {
	
	function planeBlast(posx,posy)
	{
		this.view=new createjs.Bitmap("images/planeSmoke.png");
		this.view.regX=75;
		this.view.regY=40;
		this.view.scaleX=1.2;
		this.view.scaleY=1.2;
		// 
		// var speed=-1;
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=40.0;
		// fixDef.friction=0.5;
		// fixDef.restitution=0.5;
		var force=new box2d.b2Vec2(-speed,0);
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_dyanamicBody;
		bodyDef.position.x=posx/SCALE;
		bodyDef.position.y=posy/SCALE;

		fixDef.shape = new box2d.b2PolygonShape;
		var points = [
		new box2d.b2Vec2(0,0),
		new box2d.b2Vec2(71/SCALE,15/SCALE),
		new box2d.b2Vec2(0/SCALE,20/SCALE),
		new box2d.b2Vec2(-70/SCALE,11/SCALE),
		new box2d.b2Vec2(-70/SCALE,-5/SCALE),
		new box2d.b2Vec2(-40/SCALE,-15/SCALE),
		];
		fixDef.shape.SetAsArray(points,points.length);

		bodyDef.userData = "Plane";
		this.view.body=world.CreateBody(bodyDef);


		this.view.body.CreateFixture(fixDef);
		
		this.view.body.SetLinearVelocity( force,this.view.body.GetPosition() );
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
	}

	window.planeBlast=planeBlast;
})(window);
