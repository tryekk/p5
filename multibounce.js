var colour = [Math.random()*256, Math.random()*256, Math.random()*256];
// var ball = new Ball(20, 30, 50, 50);
// var ball2 = new Ball(500, 10, 60, 60);

var ballArray = [];

for (let i = 0; i < 5; i++) {
    ballArray.push(new Ball(Math.random()*2000, Math.random()*2000, 50, 50));
}


function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    // Set colours
    strokeWeight(4);
    stroke(colour[0]+75, colour[1]+75, colour[2]+75);
    fill(colour);
    background(20);

    for (i in ballArray) {
        ballArray[i].animate();

        ellipse(ballArray[i].getX(), ballArray[i].getY(), ballArray[i].getI(), ballArray[i].getJ());
    }
}
