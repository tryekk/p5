class Ball {
    constructor(x, y, i, j, speed) {
        this.x = x;
        this.y = y;

        this.i = i;
        this.j = j;

        this.speed = speed;

        this.xDir = speed;
        this.yDir = speed;

        this.colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    }
    animate() {
        this.x = this.x + this.xDir;
        this.y = this.y + this.yDir;

        // Bounce
        if (this.x > (windowWidth - (this.j / 2))) {
            this.xDir = this.xDir - (this.xDir * 2);  // Invert directtion
            this.onBounce();
        }
        if (this.x <= 0 + (this.j / 2)) {
            this.xDir = this.speed;
            this.onBounce();
        }

        if (this.y > (windowHeight - (this.i / 2))) {
            this.yDir = this.yDir - (this.yDir * 2);  // Invert direction
            this.onBounce();
        }
        if (this.y <= 0 + (this.i / 2)) {
            this.yDir = this.speed;
            this.onBounce();
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
