class BallPosition {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.xDir = 1;
        this.yDir = 1;
    }
    animate() {
        this.x = this.x + this.xDir;

        // Bounce
        if (this.x > windowWidth) {
            this.xDir = -1;
        }
        if (this.x == 0) {
            this.xDir = 1;
        }
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}


var colour = [Math.random()*256, Math.random()*256, Math.random()*256];
var ball = new BallPosition();


function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    // Set colours
    strokeWeight(4);
    stroke(colour[0]+75, colour[1]+75, colour[2]+75);
    fill(colour);
    background(20);

    ball.animate();

    ellipse(ball.getX(), ball.getY(), 50, 50);
}
