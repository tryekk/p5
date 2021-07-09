// Variables
let font, font_size, count;
var i = 20;  // Brush size
var j = 20;
var colour = [Math.random()*256, Math.random()*256, Math.random()*256];
var key = 32;  // Activation key
var choice = 1;  // Colour mode
var colour_choice = [0, 0, 0];


function preload() {
  font = loadFont('Inconsolata-Bold.ttf');
}

function setup() {
  // Window setup
  createCanvas(windowWidth, windowHeight);
  background(50);
  textFont(font);
  count = 0;
}

// Delay update
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Ball {
  constructor(){
    this.x = mouseX;
    this.y = mouseY;
    this.i = i;
    this.j = j;
    ellipse(this.x, this.y, this.i, this.j);
  }
}

async function draw() {
  // Set colours
  strokeWeight(4);
  stroke(colour[0]+75, colour[1]+75, colour[2]+75);
  fill(colour);

  // Scale font size
  font_size = map(windowHeight*(windowWidth/2), 50, 4147200, 20, 75)
  textSize(font_size);
  // Scale distance from edge
  edge_distance = map(windowHeight*windowWidth, 50, 8294400, 20, 65)

  // Paint
  if (choice == 0) {
    colour = [colour_choice[0], colour_choice[1], colour_choice[2]];
    if (keyIsDown(32)) {
      ellipse(mouseX, mouseY, i, j);
      count++
    }
  } else if (choice == 1) {
    if (keyIsDown(32)) {
      colour = [Math.random()*256, Math.random()*256, Math.random()*256];
      x = Math.random()*1500
      y = Math.random()*1000
      ellipse(x, y, i, j);
      count++
    }
  }

  // Display values
  textAlign(LEFT);
  text(count, windowWidth-(windowWidth-edge_distance), windowHeight-edge_distance);
  // strokeWeight(3);
  // textSize(20);
  // textAlign(RIGHT);
  // text(dir_x, windowWidth-150, windowHeight-50);
  // textAlign(RIGHT);
  // text(dir_y, windowWidth-100, windowHeight-50);
  // textAlign(RIGHT);
  // text(speed_modif, windowWidth-50, windowHeight-50);
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



// Only displaying certain numbers on schedule to look better

if (dayTime%2==0) {  // Even
  if (n%2!=0) {

  } else {
    text(n+wakeTime, 0, 0);
  }
} else {  // Odd
  if (n%3!=0) {

  } else {
    text(n+wakeTime, 0, 0);
  }
}
/////////////////////
