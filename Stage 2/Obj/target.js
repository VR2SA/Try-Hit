(function(window) {
	function Target(xval,yval)
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
		bodyDef.position.y=yval/SCALE;

		 
		bodyDef.userData = "target";

		fixDef.shape=new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(50/SCALE,10/SCALE);

		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);



		var fixDef1=new box2d.b2FixtureDef();
		fixDef1.density=5.0;
		fixDef1.friction=0.5;
		fixDef1.restitution=0.5;
		var bodyDef1=new box2d.b2BodyDef();
		bodyDef1.type=box2d.b2Body.b2_kinematicBody;
		bodyDef1.position.x=xval/SCALE;
		bodyDef1.position.y=(yval+10)/SCALE;


		fixDef1.shape=new box2d.b2PolygonShape();
		fixDef1.shape.SetAsBox(54/SCALE,2/SCALE);

		var body1=world.CreateBody(bodyDef1);
		body1.CreateFixture(fixDef1);

		var fixDef2=new box2d.b2FixtureDef();
		fixDef2.density=5.0;
		fixDef2.friction=0.5;
		fixDef2.restitution=0.5;
		var bodyDef2=new box2d.b2BodyDef();
		bodyDef2.type=box2d.b2Body.b2_kinematicBody;
		bodyDef2.position.x=(xval-43)/SCALE;
		bodyDef2.position.y=(yval)/SCALE;


		fixDef2.shape=new box2d.b2PolygonShape();
		fixDef2.shape.SetAsBox(10/SCALE,10/SCALE);

		var body1=world.CreateBody(bodyDef2);
		body1.CreateFixture(fixDef2);



		var fixDef2=new box2d.b2FixtureDef();
		fixDef2.density=5.0;
		fixDef2.friction=0.5;
		fixDef2.restitution=0.5;
		var bodyDef2=new box2d.b2BodyDef();
		bodyDef2.type=box2d.b2Body.b2_kinematicBody;
		bodyDef2.position.x=(xval+43)/SCALE;
		bodyDef2.position.y=(yval)/SCALE;


		fixDef2.shape=new box2d.b2PolygonShape();
		fixDef2.shape.SetAsBox(10/SCALE,8/SCALE);

		var body1=world.CreateBody(bodyDef2);
		body1.CreateFixture(fixDef2);










		var img = new Image();
	    img.src = "images/target.png";
	    tgt = new createjs.Bitmap(img);
	    tgt.scaleX=.5;
	    tgt.scaleY=.6;
	    tgt.x = xval-30;
	    tgt.y = yval-150;
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