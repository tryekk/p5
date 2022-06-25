// Variables
let x, y, dir_x, dir_y, font, count;
var colour = [Math.random()*256, Math.random()*256, Math.random()*256];
var speed_dir = 1;  // Speed change (-1 to +1)
var speed_modif = 3;  // Starting speed
var min_speed = 3;
var max_speed = 8;  // Max must be greater


function preload() {
  font = loadFont('Inconsolata-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage('gnomed.png'); // Load the image
  x = width / 2;
  y = height-250;
  dir_x = (Math.floor(Math.random()*10 + 4))/10;  // Initial angle
  dir_y = 1;
  count = 0;
  // Set text characteristics
  textFont(font);
  // textSize(55);
}

// Delay update
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Ball class
class Ball {
  constructor(x, y, dir_x, dir_y, colour, count, speed_modif, speed_dir, max_speed) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.dir_x = dir_x;
    this.dir_y = dir_y;
    this.colour = colour;
    this.count = count;
    this.speed_modif = speed_modif;
    this.speed_dir = speed_dir;
    this.max_speed = max_speed;
    ellipse(this.x, this.y, this.i, this.j);
  }

}

function draw() {
  background(30);

  // Draw image
  image(img, x - (img.width / 2), y - (img.height / 2));

  // Set colours
  strokeWeight(4);
  stroke(colour[0]+75, colour[1]+75, colour[2]+75);
  fill(colour);

  // Display values
  textSize(55);
  textAlign(LEFT);
  text(count, windowWidth-(windowWidth-50), windowHeight-50);
  strokeWeight(3);
  textSize(25);
  textAlign(RIGHT);
  text(dir_x, windowWidth-150, windowHeight-50);
  textAlign(RIGHT);
  text(dir_y, windowWidth-100, windowHeight-50);
  textAlign(RIGHT);
  text(speed_modif, windowWidth-50, windowHeight-50);

  // Animate gnome
  bounce();
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Bounce
function bounce() {
  // Movement
  x = x + (dir_x * speed_modif);
  y = y - (dir_y * speed_modif);
  // Bounce
  if (y <= (0 + (img.height/2) - 45)) {  // Top
    colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    count = count + 1;
    dir_y = -Math.abs(dir_y);
    // Modify speed
    if (speed_modif == min_speed) {
      speed_dir = 1;
    } else if (speed_modif == max_speed) {
      speed_dir = -1;
    }
    speed_modif = speed_modif + speed_dir;
    }else if (y >= (height - (img.height/2))) {  // Bottom
    colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    count = count + 1;
    dir_y = Math.abs(dir_y);
    // Modify speed
    if (speed_modif == min_speed) {
      speed_dir = 1;
    } else if (speed_modif == max_speed) {
      speed_dir = -1;
    }
    speed_modif = speed_modif + speed_dir;
    }
    if (x <= (0 + (img.width/2) - 60)) {  // Left
    colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    count = count + 1;
    dir_x = Math.abs(dir_x);
    // Modify speed
    if (speed_modif == min_speed) {
      speed_dir = 1;
    } else if (speed_modif == max_speed) {
      speed_dir = -1;
    }
    speed_modif = speed_modif + speed_dir;
}else if (x >= (width - (img.width/2) + 13)) {  // Right
    colour = [Math.random()*256, Math.random()*256, Math.random()*256];
    count = count + 1;
    dir_x = -Math.abs(dir_x);
    // Modify speed
    if (speed_modif == min_speed) {
      speed_dir = 1;
    } else if (speed_modif == max_speed) {
      speed_dir = -1;
    }
    speed_modif = speed_modif + speed_dir;
  }
}
