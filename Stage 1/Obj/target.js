(function(window) {
	function Target(xval)
	{
		// alert(xval);
		
		this.view=new createjs.Bitmap("images/HitPoint.png");
		this.view.regX=50;
		this.view.regY=25;
		this.view.scaleY=.4;

		
		var fixDef=new box2d.b2FixtureDef();
		fixDef.density=5.0;
		fixDef.friction=0.5;
		fixDef.restitution=0.5;
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=xval/SCALE;
		bodyDef.position.y=460/SCALE;

		 
		bodyDef.userData = "target";

		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(50/SCALE,10/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);

		var img = new Image();
	    img.src = "images/target.png";
	    tgt = new createjs.Bitmap(img);
	    tgt.scaleX=.5;
	    tgt.scaleY=.6;
	    tgt.x = xval-30;
	    tgt.y = 320;
	    stage.addChild(tgt); 




		this.view.onTick=tick;
	}

	function tick(e) {
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		this.rotation=this.body.GetAngle()*(180/Math.PI);
	}

	window.Target=Target;
})(window);