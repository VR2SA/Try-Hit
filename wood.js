(function(window) {
	function Wood()
	{
		this.view=new createjs.Bitmap("images/wood10x200.png");
		this.view.regX=100;
		this.view.regY=5;
		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=10.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x=890/SCALE;
		bodyDef.position.y=531/SCALE;

		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(100/SCALE,5/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Wood=Wood;
})(window);