let x, y, test;
var i = 40;
var j = 40;
var colour = [Math.random()*256, Math.random()*256, Math.random()*256];


// Load font
function preload() {
  font = loadFont('Inconsolata-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set text characteristics
  textFont(font);
  x = windowWidth/2;
  y = windowHeight/2;
  test = "test"
}

// Node class
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    ellipse(this.x, this.y, this.i, this.j);
  }
  clicked() {
    // Check if mouse is inside the circle
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < j/2) {
      // Pick new random color values
      colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    }
  }
}

function draw() {
  // Set colours
  background(20);
  strokeWeight(4);
  stroke(colour[0]+75, colour[1]+75, colour[2]+75);
  fill(colour);

  // Create targets
  let target_0 = new Node(x, y);
  let target_1 = new Node(windowWidth-(windowWidth-100), windowHeight-(windowHeight-100));
  let target_2 = new Node(windowWidth-100, windowHeight-100);
  let target_3 = new Node(windowWidth-100, windowHeight-(windowHeight-100));
  let target_4 = new Node(windowWidth-(windowWidth-100), windowHeight-100);

  // Display values
  textSize(55);
  textAlign(LEFT);
  text(test, windowWidth-(windowWidth-100), windowHeight-100);

  target_0.mouseClicked();
  target_1.mouseClicked();
  target_2.clicked();
  target_3.clicked();
  target_4.clicked();
}

// When the user clicks the mouse
function mouseClicked() {
  test = "yes"
  return false;
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
