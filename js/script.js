const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_SPACE = 32;
const KEY_SHIFT = 16;

var playerOnFloor = false;


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
//document.body.appendChild(c);

window.onresize = function(event) {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
};

var mp;
var keys = [];

    // module aliases
var Engine = Matter.Engine,
      World = Matter.World,
      Composites = Matter.Composites,
      Composite = Matter.Composite,
      Body = Matter.Body,
      Bodies = Matter.Bodies,
      Events = Matter.Events;

// create an engine
var engine = Engine.create();


//access stackA elements with:   stackA.bodies[i]   i = 1 through 6x6
var playerBody = Bodies.rectangle(window.innerWidth/2,225,20,20,{density:0.002, friction:0.5});
var playerFloorSensor = Bodies.circle(window.innerWidth/2,245,2,{density:0, friction:0.3, isSensor: true});

 var player = Body.create({
            parts: [playerBody, playerFloorSensor],
            friction:0
});
playerBody.col = '#FFDDDD';


World.add(engine.world, [player]);

var offset = 1;
var wallSize = 20;
World.add(engine.world, [
    //top
    Bodies.rectangle(window.innerWidth/2, -offset, window.innerWidth + 2 * offset, wallSize, {
        isStatic: true
    }),
    //bottom
    Bodies.rectangle(window.innerWidth/2, window.innerHeight + offset, window.innerWidth + 2 * offset, wallSize, {
        isStatic: true
    }),
    //right
    Bodies.rectangle(window.innerWidth+ offset, window.innerHeight /2, wallSize, window.innerHeight + 2 * offset, {
        isStatic: true
    }),
    // left
    Bodies.rectangle(-offset, window.innerHeight /2, wallSize, window.innerHeight + 2 * offset, {
        isStatic: true
    })
]);

// run the engine
Engine.run(engine);


//render
(
    function render() {
    // keep player at 0 rotation
    Body.setAngle(player, 0);

    // react to key commands and apply force as needed
    if((keys[KEY_SPACE] || keys[KEY_W]) && playerOnFloor){
        let force = (-0.013 * player.mass) ;
        Body.applyForce(player,player.position,{x:0,y:force});
    }

    if(keys[KEY_D]){
        let force = (0.0004 * player.mass) ;
        Body.applyForce(player,player.position,{x:force,y:0});
    }
    if(keys[KEY_A]){
        let force = (-0.0004 * player.mass) ;
        Body.applyForce(player,player.position,{x:force,y:0});
    }

    // get all bodies
    var bodies = Composite.allBodies(engine.world);
    // request a chance to draw to canvas
    window.requestAnimationFrame(render);

    // empty canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //start drawing a objects
    ctx.beginPath();
    for (var i = 0; i < bodies.length; i += 1) {
        var vertices = bodies[i].vertices;
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (var j = 1; j < vertices.length; j += 1) {
            ctx.lineTo(vertices[j].x, vertices[j].y);
        }
        ctx.lineTo(vertices[0].x, vertices[0].y);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#DDDDDD';
    ctx.stroke();
    ctx.fillStyle='#FAFAFF';
    ctx.fill();

    // fil player separatly
    fillObject(playerBody);


})();

function fillObject(object){
    ctx.beginPath();
    var vertices = object.vertices;
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
    }
    ctx.lineTo(vertices[0].x, vertices[0].y);
    ctx.fillStyle =object.col;
    ctx.fill();
}



document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
