class Ball {
    constructor(x, y, i, j) {
        this.x = x;
        this.y = y;

        this.i = i;
        this.j = j;

        this.xDir = 1;
        this.yDir = 1;
    }
    animate() {
        this.x = this.x + this.xDir;
        this.y = this.y + this.yDir;

        // Bounce
        if (this.x > (windowWidth - (this.j/2))) {
            this.xDir = -1;
        }
        if (this.x <= 0 + (this.j/2)) {
            this.xDir = 1;
        }

        if (this.y > (windowHeight - (this.i/2))) {
            this.yDir = -1;
        }
        if (this.y <= 0 + (this.i/2)) {
            this.yDir = 1;
        }
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
}
