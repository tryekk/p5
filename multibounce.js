var NO_OF_BALLS = 100;
var COLLISIONS = true;
var colour = [Math.random()*256, Math.random()*256, Math.random()*256];
var BALL_MIN_SIZE = 50;
var BALL_MAX_SIZE = 50;

var ballArray = [];


function setup() {
    createCanvas(windowWidth, windowHeight);

    let x = [];
    let y = [];

    // Ball spawn points
    for (let i = 1; i <= Math.sqrt(NO_OF_BALLS); i++) {
        for (let j = 1; j <= Math.sqrt(NO_OF_BALLS); j++) {
            x.push(((windowWidth - BALL_MAX_SIZE) / Math.sqrt(NO_OF_BALLS)) * i);
            y.push(((windowHeight - BALL_MAX_SIZE) / Math.sqrt(NO_OF_BALLS)) * j);
        }
    }

    for (let i = 0; i < NO_OF_BALLS; i++) {
        ballArray.push(
            new Ball(
                x[i],
                y[i],
                random(BALL_MIN_SIZE, BALL_MAX_SIZE),
                random(BALL_MIN_SIZE, BALL_MAX_SIZE),
                random(1, 5),
                random(1, 5),
                COLLISIONS,
                i
            )
        );
    }

    for (let i = 0; i < NO_OF_BALLS; i++) {
        ballArray[i].setBallArray(ballArray); 
    }
}

function draw() {
    strokeWeight(4);
    background(20);

    for (i in ballArray) {
        ballArray[i].animate();

        colour = ballArray[i].getColour();
        fill(colour);
        stroke(colour[0]+35, colour[1]+35, colour[2]+35);

        ellipse(ballArray[i].getX(), ballArray[i].getY(), ballArray[i].getI(), ballArray[i].getJ());
    }
}
