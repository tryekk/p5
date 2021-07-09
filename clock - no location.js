let i, j, font_size, edge_dist;
var angleS, angleM, angleH = 0;
var clicked = false;
var timerMS = 0;
var timerS = 0;
var timerM = 0;
var startMS, startS, startM = 0;
// import {getSunrise, getSunset} from 'sunrise-sunset.js';
// const { getSunrise, getSunset } = require(['sunrise-sunset-js']);
var SolarCalc = require('solar-calc');


function preload() {
  font = loadFont('Lato-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  // Set text characteristics
  textFont(font);
  // console.log(sunset);
  // navigator.geolocation.getCurrentPosition(function(position) {
  //   console.log(getSunset(position.coords.latitude, position.coords.longitude));
  // });
}

function draw() {
  background(0);

  // Get date
  var today = new Date();
  da = today.getDay();
  dd = today.getDate();
  // Get time
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  ms = today.getMilliseconds();

  // Scale items
  if (windowWidth < windowHeight) {
    i = (windowWidth/2)*0.8;
    j = (windowWidth)*0.002
  } else {
    i = (windowHeight/2)*0.8;
    j = (windowHeight)*0.002
  }

  /* Main clock face */

  translate(windowWidth/2, windowHeight/2);
  stroke(255);
  noFill();

  // Display date
  fontSize = (i/10)*1.6;
  textSize(fontSize);
  push();
  textAlign(RIGHT);
  strokeWeight(0);
  fill(225);
  strDay = dayWeek();
  text(strDay+" ", (i/2)+(i*0.125), i*0.045);  // Day
  // fontSize = (i/10)*1.6;
  textAlign(LEFT);
  textSize(fontSize);
  fill(242, 129, 9);
  text(dd, (i/2)+(i*0.11), i*0.045);  // Date
  pop();

  // Draw number indicatcors
  strokeCap(SQUARE);
  strokeWeight(j*2);
  stroke(175);
  textAlign(CENTER);
  var n;
  for (n = 0; n < 240; n++) {  // 1/240th
    rotate(1.5);
    line(0, -i*1.05, 0, -i*1.1);
  }
  for (n = 0; n < 60; n++) {  // 1/60th
    rotate(6);
    line(0, -i*0.98, 0, -i*1.1);
  }
  strokeWeight(j*6);
  stroke(250);
  for (n = 0; n < 12; n++) {  // 1/12th
    rotate(30);
    line(0, -i*0.9, 0, -i*1.1);
  }

  /* Complications : (x0 = -(i*0.5)) */

  // 24 hour clock
  translate(-(i*0.5), 0);
  // Day/night
  noStroke();
  fill(0, 18, 48);
  ellipse(0, 0, i*0.645, i*0.645);
  fill(93, 149, 239);
  let sunrise = 610;
  let sunset = 1807;
  sunr = map(sunrise, 0, 2359, 0, 360);
  suns = map(sunset, 0, 2359, 0, 360);
  rotate(-90);
  arc(0, 0, -(i*0.645), -(i*0.645), sunr, suns);
  rotate(90);
  strokeWeight(j*2);
  stroke(175);
  for (n = 0; n < 48; n++) {  // 1/48th
    rotate(7.5);
    line(-(i*0.275), 0, -(i*0.32), 0);
  }
  for (n = 0; n < 24; n++) {  // 1/24th
    rotate(15);
    line(-(i*0.255), 0, -(i*0.32), 0);
  }
  stroke(250);
  for (n = 0; n < 12; n++) {  // 1/12th
    rotate(30);
    line(-(i*0.240), 0, -(i*0.32), 0);
  }
  // Numbers
  textSize(fontSize*0.7);
  fill(230);
  noStroke();
  text(24, 0, -(i*0.115));
  text(6, i*0.175, (i*0.04));
  text(12, 0, i*0.19);
  text(18, -(i*0.16), (i*0.04));

  // Stopwatch minutes
  if (clicked) {
    timerMS = ms-startMS;
    timerS = s-startS;
    timerM = m-startM;
  }
  translate(i*0.5, -(i*0.5));
  strokeWeight(j*2);
  stroke(175);
  for (n = 0; n < 60; n++) {  // 1/60th
    rotate(6);
    line(-(i*0.275), 0, -(i*0.32), 0);
  }
  stroke(250);
  for (n = 0; n < 12; n++) {  // 1/12th
    rotate(30);
    line(-(i*0.240), 0, -(i*0.32), 0);
  }
  // Numbers
  textSize(fontSize*0.7);
  fill(230);
  noStroke();
  text(60, 0, -(i*0.115));
  text(15, i*0.16, (i*0.04));
  text(30, 0, i*0.19);
  text(45, -(i*0.16), (i*0.04));

  /* Draw hands */

  stroke(255);
  // Stopwatch minutes
  push();
  stroke(242, 129, 9);
  strokeWeight(j*3);
  incr = map(timerS, 0, 60, 0, 1);
  angle = map(timerM+incr, 0, 60, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*0.32);
  fill(0);
  ellipse(0, 0, j*6, j*6);
  pop();
  // 24 hour
  translate(-(i*0.5), i*0.5);
  push();
  strokeWeight(j*3);
  incr = map(m, 0, 60, 0, 1);
  angle = map(h+incr, 0, 24, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*0.32);
  fill(0);
  ellipse(0, 0, j*6, j*6);
  pop();
  // 12 hour
  translate(i*0.5, 0);
  // Hours
  push();
  strokeWeight(j*9);
  incr = map(m, 0, 60, 0, 1);
  angle = map(h+incr, 0, 12, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*0.6);
  ellipse(0, 0, j*8, j*8);
  pop();
  // Minutes
  push();
  strokeWeight(j*9);
  incr = map(s, 0, 60, 0, 1);
  angle = map(m+incr, 0, 60, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*0.95);
  pop();
  // Stopwatch seconds
  push();
  stroke(242, 129, 9);
  strokeWeight(j*4);
  incr = map(timerMS, 0, 1000, 0, 1);
  angle = map(timerS+incr, 0, 60, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*1.1);
  pop();
  // Seconds
  push();
  stroke(255, 0, 0);
  strokeWeight(j*4);
  incr = map(ms, 0, 1000, 0, 1);
  angle = map(s+incr, 0, 60, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i);
  // Rear head
  line(0, 0, 0, i*0.25);
  strokeWeight(j*8);
  line(0, i*0.075, 0, i*0.25);
  fill(255);
  strokeWeight(j*4);
  ellipse(0, 0, j*9, j*9);
  pop();
}

// Convert date
function dayWeek() {
  if (da == 0) {
    var strDay = "SUN";
  } else if (da == 1) {
    var strDay = "MON";
  } else if (da == 2) {
    var strDay = "TUE";
  } else if (da == 3) {
    var strDay = "WED";
  } else if (da == 4) {
    var strDay = "THU";
  } else if (da == 5) {
    var strDay = "FRI";
  } else if (da == 6) {
    var strDay = "SAT";
  }
  return strDay;
}

// Start/stop stopwatch
function mouseClicked() {
  timerMS = 0;
  timerS = 0;
  timerM = 0;
  startMS = ms;
  startS = s;
  startM = m;
  clicked = !clicked;
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
