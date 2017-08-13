    var box2d={ 
        b2Vec2: Box2D.Common.Math.b2Vec2,
        b2Body: Box2D.Dynamics.b2Body,
        b2BodyDef: Box2D.Dynamics.b2BodyDef,
        b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
        b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
        b2EdgeChainDef: Box2D.Collision.Shapes.b2EdgeChainDef,
        b2EdgeShape: Box2D.Collision.Shapes.b2EdgeShape,
        b2MassData: Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
        b2Shape: Box2D.Collision.Shapes.b2Shape,
        b2Color: Box2D.Common.b2Color,
        b2internal: Box2D.Common.b2internal,
        b2Settings: Box2D.Common.b2Settings,
        b2Mat22: Box2D.Common.Math.b2Mat22,
        b2Mat33: Box2D.Common.Math.b2Mat33,
        b2Math: Box2D.Common.Math.b2Math,
        b2Sweep: Box2D.Common.Math.b2Sweep,
        b2Transform: Box2D.Common.Math.b2Transform,
        b2Vec3: Box2D.Common.Math.b2Vec3,
        b2AABB: Box2D.Collision.b2AABB,
        b2Bound: Box2D.Collision.b2Bound,
        b2BoundValues: Box2D.Collision.b2BoundValues,
        b2Collision: Box2D.Collision.b2Collision,
        b2ContactID: Box2D.Collision.b2ContactID,
        b2ContactPoint: Box2D.Collision.b2ContactPoint,
        b2ContactListener: Box2D.Dynamics.b2ContactListener,
        b2Distance: Box2D.Collision.b2Distance,
        b2DistanceInput: Box2D.Collision.b2DistanceInput,
        b2DistanceOutput: Box2D.Collision.b2DistanceOutput,
        b2DistanceProxy: Box2D.Collision.b2DistanceProxy,
        b2DynamicTree: Box2D.Collision.b2DynamicTree,
        b2DynamicTreeBroadPhase: Box2D.Collision.b2DynamicTreeBroadPhase,
        b2DynamicTreeNode: Box2D.Collision.b2DynamicTreeNode,
        b2DynamicTreePair: Box2D.Collision.b2DynamicTreePair,
        b2DebugDraw: Box2D.Dynamics.b2DebugDraw,
        b2Manifold: Box2D.Collision.b2Manifold,
        b2ManifoldPoint: Box2D.Collision.b2ManifoldPoint,
        b2Point: Box2D.Collision.b2Point,
        b2RayCastInput: Box2D.Collision.b2RayCastInput,
        b2RayCastOutput: Box2D.Collision.b2RayCastOutput,
        b2Segment: Box2D.Collision.b2Segment,
        b2SeparationFunction: Box2D.Collision.b2SeparationFunction,
        b2Simplex: Box2D.Collision.b2Simplex,
        b2SimplexCache: Box2D.Collision.b2SimplexCache,
        b2SimplexVertex: Box2D.Collision.b2SimplexVertex,
        b2TimeOfImpact: Box2D.Collision.b2TimeOfImpact,
        b2TOIInput: Box2D.Collision.b2TOIInput,
        b2World: Box2D.Dynamics.b2World,
        b2WorldManifold: Box2D.Collision.b2WorldManifold,
        ClipVertex: Box2D.Collision.ClipVertex,
        Features: Box2D.Collision.Features,
        IBroadPhase: Box2D.Collision.IBroadPhase
       };

//=================================================================================================
//game coding
//=================================================================================================

var SCALE=30;

var stage,world,debug,ball,ball3,background,wall,wood,sball,box,contact;
this.bodiesMap = {};

function init() { 
    // window.addEventListener('keydown', whatKey, true);
    stage=new createjs.Stage(document.getElementById("canvas"));
    debug=document.getElementById('debug' );
    backgroundLoad();
    setupPhysics();
    rotateGun();
    sliderLine()


    wall=new Wall();
    stage.addChild(wall.view);


    wood=new Wood();
    stage.addChild(wood.view);

    box=new Box();
    stage.addChild(box.view);

    sball=new Static_Ball();
    stage.addChild(sball.view);

    ball3=new Ball3();
    stage.addChild(ball3.view);



    

    
    createjs.Ticker.addListener(this);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF=true;  
}


var gun;
var angle=0;
var direction = "";
window.addEventListener('keydown', whatKey, true);  


//============================================================================================================================
// Insert Gun and Rotate 
// ===========================================================================================================================

function rotateGun(){
    var img = new Image();
    img.src = "images/gun.png";
    gun = new createjs.Bitmap(img);
    
    // he starts at the bottom center of the canvas
    gun.x = 140;
    gun.y = 480;
    
    gun.regX = 90;
    gun.regY = 76;
    stage.addChild(gun);    
}
var text="";

function ViewAngle(angle)
{
    stage.removeChild(text);
    text=new createjs.Text("angle : "+(-angle),"20px Arial","black");
    text.x=10;
    text.y=10;
    stage.addChild(text); 
}



function manageDirection(){

    if(direction == "up"){
        gun.rotation = angle;
        ViewAngle(angle);
        
    }
    
    else if(direction == "down")
        gun.rotation = angle;
        ViewAngle(angle);
} 
// ==========================================================================================================================


// ===========================================================================================================================
//  keyboard function
//=========================================================================================================================== 

function whatKey(event) {
    switch (event.keyCode) {

        // rotate gun
        case 40:
            if (angle<50) {
                direction = "down";
                angle+=1;
            } 
            else {
                alert("Min....");
            }
            break;
            // up arrow 
        case 38:
            if (angle>-90){
                direction = "up";
                angle-=1;
            } 
            else {
                alert("Max....");
            }
        // shoot
            break;
        case 32:
            ShootBall();
            break;

        // set power
        case 37:
            powerDown();
            break;
        case 39:
            powerUp();
            break;
    }
}

// ==============================================================================================================
// register body
// ==============================================================================================================
// function registerBody(bodyDef) {
//     var body = world.CreateBody(bodyDef);
//     alert(bodyDef);
//     this.bodiesMap[body.GetUserData()] = bodyDef;
//     // alert("sdfsdf");
//     return body;
// }
// ===========================================================================================================================
    function registerBody(bodyDef) {
        
        this.bodiesMap[0]=bodyDef;
    }

    function removeBody()
    {
        
        var obj=this.bodiesMap[0];
        world.DestroyBody(obj);
        stage.removeChild(wall.view);

    }



// ===========================================================================================================================
// slider 
//============================================================================================================================
var line,point;

function sliderLine(){
    var img1 = new Image();
    img1.src = "images/line.png";
    line = new createjs.Bitmap(img1);
    var img2 = new Image();
    img2.src = "images/point.png";
    point = new createjs.Bitmap(img2);

    
    line.x = 300;
    line.y = 20;
    
    line.regX = 50;
    line.regY = 5;

    point.x = 250;
    point.y = 20;
    
    point.regX = 5;
    point.regY = 5;

    textPow=new createjs.Text("set power :","20px Arial","black");
    textPow.x=130;
    textPow.y=10;

    stage.addChild(line);
    stage.addChild(point);
    stage.addChild(textPow);    
}

function powerUp()
{
    if(point.x<350){
        point.x+=5;
        // alert(distance);
    }
    
}

function powerDown()
{
    if(point.x>250){
        point.x-=5;
    }

    
}




// ==============================================================================================================
   


//=============================================================================================================== 
//  Contact listner
// ==============================================================================================================
// You are on the right track there are various events you can hook into with the b2ContactListener:
// var contact=new box2d.b2ContactListener(this);
var b2Listener = Box2D.Dynamics.b2ContactListener;


//Add listeners for contact
var listener = new b2Listener;

listener.BeginContact = function(contact) {
    console.log(contact.GetFixtureA().GetBody().GetUserData());
}

listener.EndContact = function(contact) {
    console.log(contact.GetFixtureA().GetBody().GetUserData());
}

listener.PostSolve = function(contact, impulse) {
    if (contact.GetFixtureA().GetBody().GetUserData() == 'wall' && 
            contact.GetFixtureB().GetBody().GetUserData() == 'Ball') {
        var impulse = impulse.normalImpulses[0];
        
        if (impulse < 200) return; //threshold ignore small impacts
        // world.ball.impulse = impulse > 0.6 ? 0.5 : impulse;
        // 
        
        removeBody();
         // world.DestroyBody(wall);
        // console.log(world.ball.impulse);
    }
}

listener.PreSolve = function(contact, oldManifold) {
    // PreSolve
}




// ===========================================================================================================================
// Shoot the Ball
//============================================================================================================================


function ShootBall() {
    var newX=125+(110*Math.cos((-angle*Math.PI)/180));
    var newY=465-(110*Math.sin((-angle*Math.PI)/180));
    var newangle=-(angle*Math.PI)/180;
    var force=150*(point.x-250);

    // alert(force);
    ball=new Ball(newX,newY,angle,force);
    stage.addChild(ball.view);  
   

}



















// ==========================================================================================================================
// setup Physics
// ==========================================================================================================================


function setupPhysics() 
{
    world=new box2d.b2World(new box2d.b2Vec2(0,10), true);//set gravity
    
    var fixDef=new box2d.b2FixtureDef(); 
    fixDef.density=1;
    fixDef.friction=0.5;
    var bodyDef=new box2d.b2BodyDef();
    bodyDef.type=box2d.b2Body.b2_staticBody;
    bodyDef.position.x=100/SCALE;
    bodyDef.position.y=600/SCALE;
    fixDef.shape=new box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(1200/SCALE,40/SCALE);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    // world.addChild()
   
    //setup debug draw
    var debugDraw=new box2d.b2DebugDraw();
    debugDraw.SetSprite(debug.getContext('2d'));
    debugDraw.SetDrawScale(30);
    debugDraw.SetFillAlpha(0.001);
    //  debugDraw.SetDrawScale(SCALE);
 
    debugDraw.SetFlags (box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
    world.SetContactListener(listener);
   
}




function backgroundLoad()
{
    var background = new createjs.Bitmap("images/background.png");
    stage.addChild(background);

    var ground =new createjs.Bitmap("images/ground.png");
    stage.addChild(ground);
    ground.x=0;
    ground.y=560;

    var gunBase =new createjs.Bitmap("images/canon_base.png");
    stage.addChild(gunBase);
    gunBase.x=10;
    gunBase.y=425

    createjs.Ticker.setFPS(60);

    stage.update();
}


function tick(event) {
    // 
    
    manageDirection();
    stage.update(event);
    world.DrawDebugData();
    world.Step(1/60,10,10);
    world.ClearForces();
}
