class Ball {
    constructor(x, y, i, j, xSpeed, ySpeed, collide, ballIndex) {
        this.x = x;
        this.y = y;

        this.i = i;
        this.j = j;

        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        this.collide = collide;

        this.ballArray = [];
        this.ballIndex = ballIndex;

        this.xDir = xSpeed;
        this.yDir = ySpeed;

        this.colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    }
    setBallArray(ballArray) {
        this.ballArray = ballArray;
    }
    animate() {
        this.x = this.x + this.xDir;
        this.y = this.y + this.yDir;

        // Bounce
        if (this.x > (windowWidth - (this.i / 2))) {
            this.xDir = this.xDir - (this.xDir * 2);  // Invert direction
            this.onBounce();
        }
        if (this.x <= 0 + (this.i / 2)) {
            this.xDir = this.xSpeed;
            this.onBounce();
        }

        if (this.y > (windowHeight - (this.j / 2))) {
            this.yDir = this.yDir - (this.yDir * 2);  // Invert direction
            this.onBounce();
        }
        if (this.y <= 0 + (this.j / 2)) {
            this.yDir = this.ySpeed;
            this.onBounce();
        }

        if (this.collide) {
            for (let i = 0; i < this.ballArray.length; i++) {
                if (i != this.ballIndex) {
                    // Use ball with the larger radius for collision calculation
                    if (
                        (this.x >= (this.ballArray[i].getX() - (this.ballArray[i].getI()))
                        && this.x <= (this.ballArray[i].getX() + (this.ballArray[i].getI())))
                        && (this.y >= (this.ballArray[i].getY() - (this.ballArray[i].getJ()))
                        && this.y <= (this.ballArray[i].getY() + (this.ballArray[i].getJ())))
                    ) {
                        // Invert direction
                        if (this.xDir > 0) {
                            this.xDir = this.xDir - (this.xDir * 2);
                        } else {
                            this.xDir = this.xSpeed;
                        }
                        if (this.yDir > 0) {
                            this.yDir = this.yDir - (this.yDir * 2);
                        } else {
                            this.yDir = this.ySpeed;
                        }
                        this.onBounce();
                    }
                }   
            }
        }
    }
    onBounce() {
        this.colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getI() {
        return this.i;
    }
    getJ() {
        return this.j;
    }
    getColour() {
        return this.colour;
    }
}
