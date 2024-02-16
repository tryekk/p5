var NO_OF_BALLS = 180;
var COLLISIONS = true;
var colour = [Math.random()*256, Math.random()*256, Math.random()*256];
var BALL_MIN_SIZE = 30;
var BALL_MAX_SIZE = 60;
var MIN_SPEED = 0.01;
var MAX_SPEED = 2.0;
var CURSOR_BALL = false;
var SHAPE = "circle";

var ballArray = [];


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(20);

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
        let ballSize = random(BALL_MIN_SIZE, BALL_MAX_SIZE);

        ballArray.push(new Ball(
            x[i],
            y[i],
            ballSize,
            ballSize,
            SHAPE,
            random(MIN_SPEED, MAX_SPEED),
            random(MIN_SPEED, MAX_SPEED),
            true,
            COLLISIONS,
            i)
        );
    }

    // Potential improvement is to store the ball array outside of the Ball classes
    // Then each ball can access this array from one place
    for (let i = 0; i < NO_OF_BALLS; i++) {
        ballArray[i].setBallArray(ballArray);
    }

    if (CURSOR_BALL) {
        ballArray.push(new Ball(
            mouseX,
            mouseY,
            40,
            40,
            SHAPE,
            0,
            0,
            false,
            COLLISIONS,
            ballArray.length
        ));
    }
}

function draw() {
    strokeWeight(4);
    background(0);

    for (i in ballArray) {
        ballArray[i].animateBall();

        colour = ballArray[i].getColour();
        fill(colour);
        stroke(colour[0] + 35, colour[1] + 35, colour[2] + 35);

        ellipse(ballArray[i].getX(), ballArray[i].getY(), ballArray[i].getI(), ballArray[i].getJ());
        // rect(ballArray[i].getX() - (ballArray[i].getI() / 2), ballArray[i].getY() - (ballArray[i].getJ() / 2), ballArray[i].getI(), ballArray[i].getJ());

        if (CURSOR_BALL) {
            ballArray[ballArray.length - 1].setX(mouseX);
            ballArray[ballArray.length - 1].setY(mouseY);
            ellipse(mouseX, mouseY, 40, 40);
        }
    }
}
