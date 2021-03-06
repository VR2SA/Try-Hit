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

var stage,world,debug,ball,ball3,background,wall,wood,sball,box,contact,refresh,output;
this.bodiesMap = {};
var ballCount=0
var hitCount=0
var xVAl;


function init() { 
    // window.addEventListener('keydown', whatKey, true);
    stage=new createjs.Stage(document.getElementById("canvas"));
    debug=document.getElementById('debug' );
    backgroundLoad();
    setupPhysics();
    rotateGun();
    sliderLine();
    refreshLoad();
    question() ;
    xVAl=((Math.random()*530)+610)%1200;
    if(xVAl<650)
    {
        xVAl+=100;
    }

    wall=new Wall();
    stage.addChild(wall.view);


   target=new Target(xVAl);
   stage.addChild(target.view)


    

    
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
   this.img = new Image();
    this.img.src = "images/gun150x75.png";
    gun = new createjs.Bitmap(this.img);
      gun.x = 109;
    gun.y = 500;
    
    gun.regX = 68.5;
    gun.regY = 56.5;
  
    stage.addChild(gun);   
}
var text="";


// ==================================================================================================
// refresh
// ==================================================================================================
function refreshLoad() {

    stage.enableMouseOver();
    
    var img = new Image();
    img.src = "images/menu_refresh.png";
    refresh = new createjs.Bitmap(img);
    refresh.x = 1100;
    refresh.y = 10;
    stage.addChild(refresh); 

    refresh.addEventListener("click", handleMouseEvent); 
    refresh.addEventListener("dblclick", handleMouseEvent);
}

function handleMouseEvent(evt) {
    stage.removeAllChildren();
    angle=0;
    hitCount=0;
    ballCount=0;
    xVAl=((Math.random()*530)+610)%1200;
    init();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
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

function setAngle()
{
    angle=-(document.getElementById("angel").value);
    gun.rotation = angle;
  
}

function getSpeed()
{
    var pointVal=document.getElementById("speed").value;
    point.x=250;
    var x=new Number(pointVal);
   point.x= point.x+(x*4); 
  
    SetSpeed();
  
}
// ==========================================================================================================================


// ===========================================================================================================================
//  keyboard function
//=========================================================================================================================== 

function whatKey(event) {
    if (ballCount<1) {
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
            SpeedDown();
            break;
        case 39:
            speedUp();
            break;
        }
    } 
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

    textPow=new createjs.Text("Set Speed :","20px Arial","black");
    textPow.x=130;
    textPow.y=10;
    SetSpeed();
    stage.addChild(line);
    stage.addChild(point);
    stage.addChild(textPow);    
}

function speedUp()
{
    if(point.x<350){
        point.x+=4;
        SetSpeed();
        // alert(distance);
    }
    
}

function SpeedDown()
{
    if(point.x>250){
        point.x-=4;
        SetSpeed();
    }

    
}
var speed;
var tspeed="0";

function SetSpeed()
{
    stage.removeChild(tspeed);
    speed=(point.x-250)/4;
    tspeed=speed;
    tspeed=new createjs.Text(tspeed,"20px Arial","black");
    tspeed.x=360;
    tspeed.y=10;
    stage.addChild(tspeed); 
}

function stageWin()
{
    BackRetryNext();
    var img1 = new Image();
    img1.src = "images/win.png";
    win = new createjs.Bitmap(img1);
    win.regX=170;
    win.regY=150;

    win.x=600;
    win.y=200;
    stage.addChild(win);

}

function stageRetry() {
    backRetry();
    var img1 = new Image();
    img1.src = "images/Tryagain.png";
    retry = new createjs.Bitmap(img1);
    retry.regX=283;
    retry.regY=150;

    retry.x=640;
    retry.y=200;
    stage.addChild(retry);
    
    
}


function BackRetryNext() {
    stage.enableMouseOver();
    
    var img = new Image();
    img.src = "images/menu_refresh.png";
    refresh = new createjs.Bitmap(img);
    refresh.x = 600;
    refresh.y = 300;
    stage.addChild(refresh); 

    var img1 = new Image();
    img1.src = "images/menu_next.png";
    next = new createjs.Bitmap(img1);
    next.x = 680;
    next.y = 300;
    stage.addChild(next); 


    refresh.addEventListener("click", handleMouseEvent); 
    refresh.addEventListener("dblclick", handleMouseEvent);

    next.addEventListener("click", LoadNext); 
    next.addEventListener("dblclick", LoadNext);

}
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
var quize;

function question() 
{
    stage.enableMouseOver();
    
    var img = new Image();
    img.src = "images/quize.png";
    quize = new createjs.Bitmap(img);
    quize.x = 400;
    quize.y = 0;

    stage.addChild(quize); 
    quize.addEventListener("mouseover", showQuestion);
    quize.addEventListener("mouseout", removeQuestion);
    
}
var question,questionBox,dist,distw,wallh,hint;

function showQuestion()
{
    var img = new Image();
    img.src = "images/outerBox.png";
    questionBox = new createjs.Bitmap(img);
    questionBox.x = 275;
    questionBox.y = 40;



    var distance=Math.round((xVAl-10)/SCALE);
    
    dist=new createjs.Text("Distance to target : "+distance+"m","15px Arial","red");
    dist.x=290;
    dist.y=85;
    stage.addChild(dist);

    disw=new createjs.Text("Distance to wall : "+20+"m","15px Arial","red");
    disw.x=290;
    disw.y=102;
    stage.addChild(disw); 

    wallh=new createjs.Text("Height of wall : "+Math.round(200/SCALE)+"m","15px Arial","red");
    wallh.x=290;
    wallh.y=119;
    stage.addChild(wallh); 


    // hint=new createjs.Text("Hint : You can fix angle and calculate or fix speed and calculate","15px Arial","red");
    // hint.x=290;
    // hint.y=160;
    // stage.addChild(hint); 

    stage.addChild(questionBox);
}

function removeQuestion()
{
    stage.removeChild(questionBox);
    stage.removeChild(dist);
    stage.removeChild(disw);
    stage.removeChild(wallh);
    

}

function backRetry(){
    stage.enableMouseOver();
    
    var img = new Image();
    img.src = "images/menu_refresh.png";
    refresh = new createjs.Bitmap(img);
    refresh.x = 600;
    refresh.y = 300;
    stage.addChild(refresh); 

    refresh.addEventListener("click", handleMouseEvent); 
    refresh.addEventListener("dblclick", handleMouseEvent);
}

function LoadNext() {
    window.location.href = "../Stage 2/game.html";
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
    if (contact.GetFixtureB().GetBody().GetUserData() == 'Ball' && hitCount<1)
    {

        hitCount+=1;

        if (contact.GetFixtureA().GetBody().GetUserData() == 'target' && 
        contact.GetFixtureB().GetBody().GetUserData() == 'Ball' ) {
            if (impulse < 200) 
            {
                stageRetry();
                return;
            }
                 stageWin();
        }
        else
        {
            stageRetry();
        }
    }

}






listener.PreSolve = function(contact, oldManifold) {
    // PreSolve
}




// ===========================================================================================================================
// Shoot the Ball
//============================================================================================================================
var gunBase;

function ShootBall() {
    var newX=100+(Math.cos((-angle*Math.PI)/180));
    var newY=488-(Math.sin((-angle*Math.PI)/180));
    var newangle=-(angle*Math.PI)/180;
    ballCount+=1;
    // alert(speed);
    ball=new Ball(newX,newY,angle,speed);
    stage.addChild(ball.view);  
     stage.addChild(gun);   
     stage.addChild(gunBase);
}



















// ==========================================================================================================================
// setup Physics
// ==========================================================================================================================


function setupPhysics() 
{
    world=new box2d.b2World(new box2d.b2Vec2(0,10), true);//set gravity
    
    var fixDef=new box2d.b2FixtureDef(); 
    fixDef.density=1;
    fixDef.friction=1000000;
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
    debugDraw.SetLineThickness(0.1);
    //  debugDraw.SetDrawScale(SCALE);
 
    debugDraw.SetFlags (box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
    world.SetContactListener(listener);
   
}




function backgroundLoad()
{
    var background = new createjs.Bitmap("images/background.png");
    stage.addChild(background);

    // var ground =new createjs.Bitmap("images/ground.png");
    // stage.addChild(ground);
    // ground.x=0;
    // ground.y=560;

    gunBase =new createjs.Bitmap("images/gunBase150x150.png");
    stage.addChild(gunBase);
    gunBase.x=10;
    gunBase.y=457

    createjs.Ticker.setFPS(60);

    stage.update();
}


function tick(event) {


    manageDirection();
    stage.update(event);
    world.DrawDebugData();
    world.Step(1/60,10,10);
    world.ClearForces();
}

