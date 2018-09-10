Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === pogoStick) {
            playerOnFloor = false;
        } else if (pair.bodyB === pogoStick) {
            playerOnFloor = false;
        }
    }
})

 Events.on(engine, 'collisionActive', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === pogoStick) {
            playerOnFloor = true;
        } else if (pair.bodyB === pogoStick) {
            playerOnFloor = true;
        }
    }
})
