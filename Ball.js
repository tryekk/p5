class Ball {
    constructor(x, y, i, j, shape, xSpeed, ySpeed, animate, collide, ballIndex) {
        this.x = x;
        this.y = y;

        this.i = i;
        this.j = j;

        this.shape = shape;

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
                    if (this.shape == "circle") {
                        let distanceBetweenCirclesSquared = 
                        (this.ballArray[i].getX() - this.x) * (this.ballArray[i].getX() - this.x) + 
                        (this.ballArray[i].getY() - this.y) * (this.ballArray[i].getY() - this.y);
                        if (
                            distanceBetweenCirclesSquared <=
                            ((this.i/2) + (this.ballArray[i].getI()/2)) * ((this.i/2) + (this.ballArray[i].getI()/2))
                        ) {
                            // Prevent sticking
                            this.x = this.x - this.xDir;
                            this.y = this.y - this.yDir;

                            // Calculate vector perpendicular to tangeant of collision
                            let tangentVector = new THREE.Vector2(0, 0);
                            tangentVector.y = -(this.ballArray[i].getX() - this.x);
                            tangentVector.x = this.ballArray[i].getY() - this.y;
                            // Normalise
                            tangentVector.normalize();
                            
                            // Calculate relative velocity to other object
                            let relativeVelocity = 
                            new THREE.Vector2(this.ballArray[i].getXDir() - this.xDir, 
                            this.ballArray[i].getYDir() - this.yDir);

                            // Velocity vector parallel to tangeant
                            let length = new THREE.Vector2(0, 0);
                            relativeVelocity.dot(tangentVector);
                            length.x = relativeVelocity.getComponent(0);
                            length.y = relativeVelocity.getComponent(1);
                            let velocityComponentOnTangent = new THREE.Vector2(0, 0);
                            tangentVector.multiply(length);
                            velocityComponentOnTangent.x = tangentVector.getComponent(0);
                            velocityComponentOnTangent.y = tangentVector.getComponent(1);
                            
                            // Velocity vector perpendicular to tangeant
                            let velocityComponentPerpendicularToTangent = new THREE.Vector2(0, 0);
                            relativeVelocity.sub(velocityComponentOnTangent);
                            velocityComponentPerpendicularToTangent.x = relativeVelocity.getComponent(0);
                            velocityComponentPerpendicularToTangent.y = relativeVelocity.getComponent(1);

                            velocityComponentPerpendicularToTangent.normalize();
                            
                            // Bounce
                            this.xDir = this.xDir - velocityComponentPerpendicularToTangent.getComponent(0);
                            this.yDir = this.yDir - velocityComponentPerpendicularToTangent.getComponent(1);

                            console.log(velocityComponentPerpendicularToTangent.getComponent(0));

                            this.ballArray[i].setXDir(this.ballArray[i].getXDir() - velocityComponentPerpendicularToTangent.getComponent(0));
                            this.ballArray[i].setYDir(this.ballArray[i].getYDir() - velocityComponentPerpendicularToTangent.getComponent(1));

                            this.onBounce();
                        }
                    } else {
                        if (
                            ((this.x - this.ballArray[i].getX()) <= ((this.i / 2) + (this.ballArray[i].getI() / 2))
                            && (this.x - this.ballArray[i].getX()) >= -((this.i / 2) + (this.ballArray[i].getI() / 2))) &&
                            ((this.y - this.ballArray[i].getY()) <= ((this.j / 2) + (this.ballArray[i].getJ() / 2))
                            && (this.y - this.ballArray[i].getY()) >= -((this.j / 2) + (this.ballArray[i].getJ() / 2)))
                        ) {
                            this.onCollision();
                        }
                    }
                } 
            }
        }
    }
    normaliseValue(val, max, min) {
        return parseFloat((val - min) / (max - min));
    }
    onCollision() {
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
    setXDir(xDir) {
        this.xDir = xDir;
    }
    setYDir(yDir) {
        this.yDir = yDir;
    }
    getXDir() {
        return this.xDir;
    }
    getYDir() {
        return this.yDir;
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
