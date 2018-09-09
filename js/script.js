const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_SPACE = 32;
const KEY_SHIFT = 16;

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
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

var pogoStick = Bodies.rectangle(window.innerWidth/2, 400, 20, 80, {density:0.002, friction:1});
var pogoBody = Bodies.rectangle(window.innerWidth/2, 225, 30, 90, {density:0.002, friction:1});

pogoBody.col = '#FF0000';
pogoStick.col = '#FF6600';
pogoBody.collisionFilter.group = -1;
pogoStick.collisionFilter.group = -1;

var spring = Constraint.create ({
    pointA: {x:0,y:-80},
    bodyA: pogoStick,
    bodyB: pogoBody,
    stiffness: 0.1,
    length: 0
});

var spring2 = Constraint.create ({
    pointB: {x:0,y:40},
    bodyA: pogoStick,
    bodyB: pogoBody,
    stiffness: 0.1,
    length: 0
});


World.add(engine.world, [pogoBody, pogoStick, spring, spring2]);

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

    // react to key commands and apply force as needed
    if(keys[KEY_SPACE]){
        let force = (-0.3) ;
        Body.applyForce(pogoBody,pogoBody.position,{x:0,y:force});
    }

    if(keys[KEY_D]){
        Body.setAngularVelocity(pogoBody, 0.05);
    }
    if(keys[KEY_A]){
        let force = (-0.0004);
        Body.setAngularVelocity(pogoBody, -0.05);
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

    // fil pogoBody separatly

    fillObject(pogoStick);
    fillObject(pogoBody);


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
