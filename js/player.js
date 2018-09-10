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
