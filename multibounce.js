var colour = [Math.random()*256, Math.random()*256, Math.random()*256];

var ballArray = [];

for (let i = 0; i < 5; i++) {
    ballArray.push(new Ball(Math.random()*200, Math.random()*200, 50, 50));
}


function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    // Set colours
    strokeWeight(4);
    background(20);

    for (i in ballArray) {
        ballArray[i].animate();

        colour = ballArray[i].getColour();
        fill(colour);
        stroke(colour[0]+75, colour[1]+75, colour[2]+75);

        ellipse(ballArray[i].getX(), ballArray[i].getY(), ballArray[i].getI(), ballArray[i].getJ());
    }
}
