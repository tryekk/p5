class Ball {
    constructor(x, y, i, j, xSpeed, ySpeed, animate, collide, ballIndex) {
        this.x = x;
        this.y = y;

        this.i = i;
        this.j = j;

        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        this.animate = animate;
        this.collide = collide;

        this.ballArray = [];
        this.ballIndex = ballIndex;

        this.xDir = xSpeed;
        this.yDir = ySpeed;

        this.colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    }
    animateBall() {
        if (this.animate) {
            this.x = this.x + this.xDir;
            this.y = this.y + this.yDir;
    
            // Bounce
            if (this.x > (windowWidth - (this.i / 2))) {
                this.x = this.x - this.xDir;  // Prevent sticking
                this.xDir = this.xDir - (this.xDir * 2);  // Invert direction
                this.onBounce();
            }
            if (this.x <= 0 + (this.i / 2)) {
                this.x = this.x - this.xDir;  // Prevent sticking
                this.xDir = this.xSpeed;
                this.onBounce();
            }
    
            if (this.y > (windowHeight - (this.j / 2))) {
                this.y = this.y - this.yDir;  // Prevent sticking
                this.yDir = this.yDir - (this.yDir * 2);  // Invert direction
                this.onBounce();
            }
            if (this.y <= 0 + (this.j / 2)) {
                this.y = this.y - this.yDir;  // Prevent sticking
                this.yDir = this.ySpeed;
                this.onBounce();
            }
        }

        if (this.collide) {
            for (let i = 0; i < this.ballArray.length; i++) {
                if (i != this.ballIndex) {
                    
                    // if (
                    //     (this.x - this.ballArray[i].getX()) - (this.y - this.ballArray[i].getY()) <= 15 &&
                    //     (this.x - this.ballArray[i].getX()) - (this.y - this.ballArray[i].getY()) >= -15
                    // ) {
                    //     this.onBounce();
                    // }

                    // Calculate distance of balls (each radius plus the other)
                    if (
                        ((this.x - this.ballArray[i].getX()) <= ((this.i / 2) + (this.ballArray[i].getI() / 2))
                        && (this.x - this.ballArray[i].getX()) >= -((this.i / 2) + (this.ballArray[i].getI() / 2))) &&
                        ((this.y - this.ballArray[i].getY()) <= ((this.j / 2) + (this.ballArray[i].getJ() / 2))
                        && (this.y - this.ballArray[i].getY()) >= -((this.j / 2) + (this.ballArray[i].getJ() / 2)))
                    ) {
                        // Prevent sticking
                        this.x = this.x - this.xDir;
                        this.y = this.y - this.yDir;

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
    generateColour(h, s, v) {
        let h_i = parseInt(h * 6);
        let f = h * 6 - h_i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);

        let r, g, b = 0;

        if (h_i == 0) {
            r = v;
            g = t;
            b = p;
        }
        if (h_i == 1) {
            r = q;
            g = v;
            b = p;
        }
        if (h_i == 2) {
            r = p;
            g = v;
            b = t;
        }
        if (h_i == 3) {
            r = p;
            g = q;
            b = v;
        }
        if (h_i == 4) {
            r = t;
            g = p;
            b = v;
        }
        if (h_i == 5) {
            r = v;
            g = p;
            b = q;
        }

        return [(r * 256), (g * 256), (b * 256)];
    }
    onBounce() {
        let goldenRatioConjugate = 0.618033988749895;
        let h = random(0, 1);
        h += goldenRatioConjugate;
        h %= 1;
        
        this.colour = this.generateColour(h, 0.55, 0.95);
    }
    setBallArray(ballArray) {
        this.ballArray = ballArray;
    }
    setSpawnPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
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
