var pogoStick = Bodies.rectangle(window.innerWidth/2, 600, 20, 80, {density:0.002, friction:2});
var pogoBody = Bodies.rectangle(window.innerWidth/2, 600, 30, 90, {density:0.004, friction:1});

pogoBody.col = '#FF0000';
pogoStick.col = '#FF6600';
pogoBody.collisionFilter.group = -1;
pogoStick.collisionFilter.group = -1;

var in1 = Constraint.create ({
    pointA: {x:0,y:-40},
    pointB: {x:0,y:20},
    bodyA: pogoStick,
    bodyB: pogoBody,
    stiffness: 0.2,
    length: 0
});

var in2 = Constraint.create ({
    pointA: {x:0,y:40},
    pointB: {x:0,y:60},
    bodyA: pogoStick,
    bodyB: pogoBody,
    stiffness: 0.2,
    length: 0
});

var out1 = Constraint.create ({
    pointA: {x:0,y:-40},
    pointB: {x:0,y:50},
    bodyA: pogoStick,
    bodyB: pogoBody,
    stiffness: 0.2,
    length: 0
});

var out2 = Constraint.create ({
    pointA: {x:0,y:40},
    pointB: {x:0,y:90},
    bodyA: pogoStick,
    bodyB: pogoBody,
    stiffness: 0.2,
    length: 0
});
