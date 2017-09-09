(function(window) {
	function Bomb()
	{
		this.view=new createjs.Bitmap("images/bomb.png");
		this.view.regX=this.view.regY=10;
		this.view.rotation=180;

		// 
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=50;
		fixDef.friction=10;
		// fixDef.restitution=0.0;
		
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x=700/SCALE;
		bodyDef.position.y=100/SCALE;

		fixDef.shape = new box2d.b2PolygonShape;
		var points = [
		new box2d.b2Vec2(0.1,-0.6),
		new box2d.b2Vec2(1/SCALE,-1/SCALE),
		new box2d.b2Vec2(0/SCALE,-1/SCALE),
		new box2d.b2Vec2(-1/SCALE,10/SCALE),
		new box2d.b2Vec2(-10/SCALE,1/SCALE),
		new box2d.b2Vec2(-10/SCALE,-20/SCALE),
		];
		fixDef.shape.SetAsArray(points,points.length);

		bodyDef.userData = "Bomb";
		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		// this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Bomb=Bomb;
})(window);