
// create an engine
var engine = Engine.create();


var offset = 1;
var wallSize = 100;
ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight + offset, window.innerWidth + 2 * offset, wallSize, {isStatic: true}),
ground.col = '#0e4d27'

World.add(engine.world, [pogoBody, pogoStick, in1, in2, ground]);

// run the engine
Engine.run(engine);


//render
(
    function render() {

    // react to key commands and apply force as needed
    if(((keys[KEY_SPACE] && !used_keys[KEY_SPACE]) || (keys[KEY_UP] && !used_keys[KEY_UP]))){
        World.remove(engine.world, [in1, in2]);
        World.add(engine.world, [out1, out2]);
        used_keys[KEY_SPACE] = true;
        used_keys[KEY_UP] = true;
        if (playerOnFloor) {
          var angle = pogoBody.angle;
          var force = -0.5
          Body.applyForce(pogoBody, pogoBody.position, {
            x:-Math.sin(angle)*force,
            y:Math.cos(angle)*force
          })
        }
    }

    if(keys[KEY_D] || keys[KEY_RIGHT]){
        Body.setAngularVelocity(pogoBody, (SENSITIVITY/100));
    }
    if(keys[KEY_A] || keys[KEY_LEFT]){
        Body.setAngularVelocity(pogoBody, -(SENSITIVITY/100));
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
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    // fil pogoBody separatly

    fillObject(pogoStick);
    fillObject(pogoBody);
    fillObject(ground);


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
  if (e.keyCode == KEY_SPACE || e.keyCode == KEY_UP) {
    World.remove(engine.world, [out1, out2]);
    World.add(engine.world, [in1, in2]);
  }
  keys[e.keyCode] = false;
  used_keys[e.keyCode] = false;
});
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
