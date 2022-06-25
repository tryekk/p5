var colour = [Math.random()*256, Math.random()*256, Math.random()*256];

var ballArray = [];


function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 105; i++) {
        ballArray.push(
            new Ball(
                Math.random()*(windowWidth - 30),
                Math.random()*(windowHeight - 30),
                50,
                50,
                random(1, 5),
                random(1, 5)
            )
        );
    }
}

function draw() {
    // Set colours
    strokeWeight(4);
    // background(20);

    for (i in ballArray) {
        ballArray[i].animate();

        colour = ballArray[i].getColour();
        fill(colour);
        stroke(colour[0]+35, colour[1]+35, colour[2]+35);

        ellipse(ballArray[i].getX(), ballArray[i].getY(), ballArray[i].getI(), ballArray[i].getJ());
    }
}
