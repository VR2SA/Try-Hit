(function(window) {
	function Tree()
	{
		this.view=new createjs.Bitmap("images/tree200x100.png");
		this.view.regX=50;
		this.view.regY=110;

		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=100.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=1100/SCALE;
		bodyDef.position.y=426/SCALE;
		bodyDef.userData = "tree";
		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(10/SCALE,70/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		// this.view.body=registerBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		registerBody(this.view.body);
		// this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;
	}

	

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Tree=Tree;
})(window);