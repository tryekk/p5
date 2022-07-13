// All the paths
let paths = [];
// Are we painting?
let painting = false;
// How long until the next circle
let next = 0;
// Where are we now and where were we?
let current;
let previous;

var scatter = 75; // Deviation from centre point
var jitter = 10; // Vibration of particles
var lifespan = 350;
var drag = 1; // Resistance to movement
var force_multi = 0.03; // Acceleration
var paint_mode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  current = createVector(0,0);
  previous = createVector(0,0);
};

function draw() {
  background(255);
  // If it's time for a new point
  if (millis() > next && painting) {
    // Get mouse position
    current.x = mouseX + ((Math.random()-0.5)*scatter)
    current.y = mouseY + ((Math.random()-0.5)*scatter)
    // current.x = (windowWidth/2) + ((Math.random()-0.5)*scatter)
    // current.y = (windowHeight/2) + ((Math.random()-0.5)*scatter)

    // New particle's force is based on mouse movement
    let force = p5.Vector.sub(current, previous);
    force.mult(force_multi);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = millis() + random(75);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for (let i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }

  // Change brush
  if (keyIsDown(UP_ARROW)) { // Scatter
    if (scatter < 500) {
      scatter = scatter + 10;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    if (scatter > 0) {
      scatter = scatter - 10;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) { // Force
    if (force_multi < 0.1) {
      force_multi = force_multi + 0.005;
    }
  } else if (keyIsDown(LEFT_ARROW)) {
    if (force_multi > 0) {
      force_multi = force_multi - 0.005;
    }
  }
}

// Change painting mode
function keyPressed() {
  var key = event.keyCode;
  if (key == 17) {
    paint_mode++;
    paint_mode = paint_mode%2;
  }
}

// Painting mode
function mousePressed() {
  if (paint_mode == 0) {
    // Start
    next = 0;
    painting = true;
    previous.x = mouseX;
    previous.y = mouseY;
    paths.push(new Path());
  } else if (paint_mode == 1) {
    // Start
    next = 0;
    painting = !painting;
    previous.x = mouseX;
    previous.y = mouseY;
    paths.push(new Path());
  }
}
// Stop
function mouseReleased() {
  if (paint_mode == 0) {
    painting = false;
  }
}

// A Path is a list of particles
class Path {
  constructor() {
    this.particles = [];
    this.hue = random(100);
  }

  add(position, force) {
    // Add a new particle with a position, force, and hue
    this.particles.push(new Particle(position, force, this.hue));
  }

  // Display plath
  update() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }

  // Display plath
  display() {
    // Loop through backwards
    for (let i = this.particles.length - 1; i >= 0; i--) {
      // If we shold remove it
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
      // Otherwise, display it
      } else {
        this.particles[i].display(this.particles[i+1]);
      }
    }
  }
}

// Particles along the path
class Particle {
  constructor(position, force, hue) {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(force.x, force.y);
    // this.velocity = createVector(force.x+((Math.random()-0.5)*jitter),
    // force.y+((Math.random()-0.5)*jitter));
    // MOVEMENT
    this.drag = drag;
    this.lifespan = lifespan;
  }

  update() {
    // Move it
    this.position.add(this.velocity);
    // Slow it down
    this.velocity.mult(this.drag);
    // Fade it out
    this.lifespan--;
  }

  // Draw particle and connect it with a line
  // Draw a line to another
  display(other) {
    stroke(0, this.lifespan);
    fill(0, this.lifespan/2);
    ellipse(this.position.x,this.position.y, 8, 8);
    // If we need to draw a line
    if (other) {
      line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
  }
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
