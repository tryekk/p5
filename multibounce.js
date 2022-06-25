var noOfBalls = 25;
var collisions = true;
var colour = [Math.random()*256, Math.random()*256, Math.random()*256];

var ballArray = [];


function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < noOfBalls; i++) {
        var ballSize = random(50, 50);

        ballArray.push(
            new Ball(
                random(ballSize/2, windowWidth - (ballSize/2)),
                random(ballSize/2, windowHeight - (ballSize/2)),
                ballSize,
                ballSize,
                random(1, 3),
                random(1, 3),
                collisions,
                i
            )
        );
    }

    for (let i = 0; i < noOfBalls; i++) {
        ballArray[i].setBallArray(ballArray);

        // Prevent overlapping spawn points
        for (let j = 0; j < noOfBalls; j++) {
            if (
                (ballArray[i].getX() >= (ballArray[j].getX() - ballArray[j].getI())
                && ballArray[i].getX() <= (ballArray[j].getX() + ballArray[j].getI())) &&
                (ballArray[i].getY() >= (ballArray[j].getY() - ballArray[j].getJ())
                && ballArray[i].getY() <= (ballArray[j].getY() + ballArray[j].getJ()))
            ) {
                ballArray[i].setSpawnPosition(
                    ballArray[i].getX() + ballArray[j].getI(),
                    ballArray[i].getY() + ballArray[j].getJ()
                );
            }
        }  
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
