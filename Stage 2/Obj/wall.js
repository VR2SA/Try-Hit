(function(window) {
	function Wall()
	{
		this.view=new createjs.Bitmap("images/wall200x20.png");
		this.view.regX=10;
		this.view.regY=100;

		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=100.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=610/SCALE;
		bodyDef.position.y=460/SCALE;
		bodyDef.userData = "wall";
		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(10/SCALE,100/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Wall=Wall;
})(window);