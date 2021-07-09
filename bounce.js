// Variables
let x, y, dir_x, dir_y, font, font_size, clicked, previous_x, previous_y;
var i = j = NaN;  // Initialise ball size
var count = 1;
var colour = [Math.random()*256, Math.random()*256, Math.random()*256];
var speed_dir = 1;  // Speed change (-1 to +1)
var speed_modif = 2;  // Starting speed (> max causes infinite increase)
var min_speed = 2;
var max_speed = 3;  // Max must be greater
var drag = 90;  // 100 = no drag, lower is more drag


function preload() {
  // font = loadFont('Inconsolata-Bold.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // Scale ball size
  i = map(windowHeight*windowWidth, 48000, 8294400, 100, 275);
  j = map(windowHeight*windowWidth, 48000, 8294400, 100, 275);
  // Ball start
  x = width / 2;
  y = height-(i/2);
  // Initial angle
  previous_x = mouseX;
  previous_y = mouseY;
  dir_x = (Math.floor(Math.random()*10 + 4))/10;
  dir_y = 1;
  count = 0;
  // Set text characteristics
  // textFont(font);
}


// Ball class
class Ball {
  constructor(x, y, dir_x, dir_y) {
    this.x = x, this.y = y;
    this.i = i, this.j = j;
    this.dir_x = dir_x, this.dir_y = dir_y;
    this.colour = colour;
    this.count = count;
    this.speed_modif = speed_modif;
    this.speed_dir = speed_dir;
    this.max_speed = max_speed;
    ellipse(this.x, this.y, this.i, this.j);
    // On bounce
    this.on_bounce = function() {
      colour = [Math.random()*256, Math.random()*256, Math.random()*256];
      count = count + 1;
      drag = 100;
    }
  }
  corner() {
    dir_x = -dir_x, dir_y = -dir_y;
    colour = [Math.random()*256, Math.random()*256, Math.random()*256];
  }
  // Bounce
  async bounce() {
    // Movement
    x = x + ((dir_x * speed_modif)*(drag/100));
    y = y - ((dir_y * speed_modif)*(drag/100));
    if (drag > 65) {
        drag = drag - 0.1;
    }
    // Bounce
    if (y <= (0 + j/2)) {
      // Top
      dir_y = -Math.abs(dir_y);
      // 34ms = 2 frames @ 30fps
      this.on_bounce();
      // Modify speed
      if (speed_modif == min_speed) {
        speed_dir = 1;
      } else if (speed_modif >= max_speed) {
        speed_dir = -1;
      }
      // Decrease velocity
      if (dir_y < -1) {
        dir_y = dir_y/2;
      }
      speed_modif = speed_modif + (speed_dir/4);
    }else if (y >= (height - j/2)) {
      // Bottom
      dir_y = Math.abs(dir_y);
      this.on_bounce();
      // Modify speed
      if (speed_modif == min_speed) {
        speed_dir = 1;
      } else if (speed_modif >= max_speed) {
        speed_dir = -1;
      }
      // Decrease velocity
      if (dir_y > 1) {
        dir_y = dir_y/2;
      }
      speed_modif = speed_modif + (speed_dir/4);
      }
    if (x <= (0 + i/2)) {
      // Left
      dir_x = Math.abs(dir_x);
      this.on_bounce();
      // Modify speed
      if (speed_modif == min_speed) {
        speed_dir = 1;
      } else if (speed_modif >= max_speed) {
        speed_dir = -1;
      }
      // Decrease velocity
      if (dir_x > 1) {
        dir_x = dir_x/2;
      }
      speed_modif = speed_modif + (speed_dir/4);
    }else if (x >= (width - i/2)) {
      // Right
      dir_x = -Math.abs(dir_x);
      this.on_bounce();
      // Modify speed
      if (speed_modif == min_speed) {
        speed_dir = 1;
      } else if (speed_modif >= max_speed) {
        speed_dir = -1;
      }
      // Decrease velocity
      if (dir_x < -1) {
        dir_x = dir_x/2;
      }
      speed_modif = speed_modif + (speed_dir/4);
    }
  }
}

function draw() {
  // Set colours
  strokeWeight(4);
  stroke(colour[0]+75, colour[1]+75, colour[2]+75);
  fill(colour);
  background(20);
  // Create balls
  let ball_instance = new Ball(x, y);

  // Scale font size
  font_size = map(windowHeight*(windowWidth/2), 50, 4147200, 20, 75)
  textSize(font_size);
  // Scale distance from edge
  edge_distance = map(windowHeight*windowWidth, 50, 8294400, 20, 65)

  var today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  // Display values
  textAlign(LEFT);
  text(count, windowWidth-(windowWidth-edge_distance), windowHeight-edge_distance);
  strokeWeight(3);
  textSize(20);
  textAlign(RIGHT);
  // text(h+":"+m+":"+s, windowWidth-edge_distance, windowHeight-edge_distance);

  // Animate ball
  ball_instance.bounce();

  // Calculate velocity
  x_velocity = Math.min((mouseX - previous_x)*0.5, 25);
  y_velocity = Math.min((previous_y - mouseY)*0.5, 25);
  previous_x = mouseX;
  previous_y = mouseY;

  // Position ball
  if (clicked) {
    // Move ball with cursor
    x = (mouseX + x_distance);
    y = (mouseY + y_distance);
    // Prevent from touching edge (+-)
    x = Math.max(Math.min(x, (windowWidth-(i/2))-4), (i/2)+4);
    y = Math.max(Math.min(y, (windowHeight-(j/2))-4), (j/2)+4);
  } else {
    // Prevent ball from going over edge
    x = Math.max(Math.min(x, windowWidth-(i/2)), (i/2));
    y = Math.max(Math.min(y, windowHeight-(j/2)), (j/2));
  }
}

// Toggle move ball
function mousePressed() {
  x_distance = x-mouseX;
  y_distance = y-mouseY;
  if (((x_distance<(i/2) && x_distance>-(i/2)))
  && (y_distance<(j/2) && y_distance>-(j/2))) {
    clicked = true;
  }
}
function mouseReleased() {
  if (((x_distance<(i/2) && x_distance>-(i/2)))
  && (y_distance<(j/2) && y_distance>-(j/2))) {
    clicked = false;
    // Apply velocity
    dir_x = x_velocity;
    dir_y = y_velocity;
  }
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
