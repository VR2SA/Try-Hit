(function(window) {
	// var angle;
	var direction;
	var view;
	
	function Gun()
	{
		this.view=new createjs.Bitmap("images/gun.png");
		this.view.regX=90;
		this.view.regY=76;
		
		this.view.rotation=angle;
		var fixDef=new box2d.b2FixtureDef();
		var bodyDef=new box2d.b2BodyDef();
		bodyDef.type=box2d.b2Body.b2_staticBody;
		bodyDef.position.x=140/SCALE;
		bodyDef.position.y=480/SCALE;
		fixDef.shape=new box2d.b2CircleShape(20/SCALE);
		
		this.view.body=world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick=tick;	 
	}

	
	function manageDirection(direction){
        // gun=new Gun(45);
        alert();
        if(direction == "up"){
            angle -= 15;
            // gun=new Gun(angle);
            // stage.addChild(gun.view);
        }
        else if(direction == "down"){
            angle += 15;
            // gun=new Gun(angle);
            // stage.addChild(gun.view);
        }
    }    

	function tick(e) {
		// stage.update();
		// manageDirection();
		this.x=this.body.GetPosition().x*SCALE;
		this.y=this.body.GetPosition().y*SCALE;
		// 	
	}

	window.Gun=Gun;
})(window);