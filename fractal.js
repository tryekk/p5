 class Particle {
  float x, y;
  Particle(float x_, float y_) {
      x = x_;
      y = y_;
      r = 3;
  },
  function update() {
    x -= 1;
    y += random(-1, 1);
  }
  funciton show() {
    fill(255);
    stroke(255);
    ellipse(x, y, r*2, r*2);
  }
}

Particle current;

function setup() {
  size (1000, 1000);
  current = new Particle(600, 0);
}

function draw() {
  background(0);
  current.update();
  current.show();

}
