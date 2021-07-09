let i, j, font_size, edge_dist;
var angleS, angleM, angleH = 0;
var clicked = false;
var paused = false;
var timerMS = 0;
var timerS = 0;
var timerM = 0;
var startPaused = 0;
var daylightSave = true;
// Sunrise/set
var riseSplit = 0;
var setSplit = 0;
// Schedule
var wakeTime = 8;
var sleepTime = 20;
// Set tracking to false
var tracking = false;
console.log("Version 3.2");

var timerMS_test = 0;
//var weather = require(['weather-js']);

function preload() {
  font = loadFont('Lato-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  // Set text characteristics
  textFont(font);

  // Default times (udated when user accepts geolocation)
  sunrise = SunriseSunsetJS.getSunrise(50.9309625, -0.5626241);
  sunset = SunriseSunsetJS.getSunset(50.9309625, -0.5626241);
  // 50.9309625, -0.5626241 // 68.709588, -52.8512976
  console.log(sunrise, sunset);
  window.GlobalVar = sunrise;
  window.GlobalVar = sunset;
  // Extract time
  riseSplit = splitValue(String(sunrise), 16);
  setSplit = splitValue(String(sunset), 16);

  // Check if locatoin allowed
  navigator.geolocation.watchPosition(function(position) {
    tracking = true;
    window.GlobalVar = tracking;
    getOurLocation();
  },
  function(error) {
    if (error.code == error.PERMISSION_DENIED)
      tracking = false;
      window.GlobalVar = tracking;
      getOurLocation();
  });
  // Get location and sun times (with geolocation)
  function getOurLocation() {
    if (tracking && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      function showPosition(position) {
        coord = [position.coords.latitude, position.coords.longitude];
        // Get times
        sunrise = SunriseSunsetJS.getSunrise(coord[0], coord[1]);
        sunset = SunriseSunsetJS.getSunset(coord[0], coord[1]);
        window.GlobalVar = sunrise;
        window.GlobalVar = sunset;
        // Extract time
        riseSplit = splitValue(String(sunrise), 16);
        setSplit = splitValue(String(sunset), 16);
      }
    }
  }
  if (daylightSave) {
    adjustedTimes = daylightSaving();
    riseSplit = adjustedTimes[0];
    setSplit = adjustedTimes[1];
  }
}

// Extract time from output
function splitValue(value, index) {
  var split_value =  value.substring(index, index+5);
  return Number(split_value.replace(/:/, ""));
}

function daylightSaving() {
  adjustedTimes = [riseSplit+100, setSplit+100];
  return adjustedTimes;
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
  time = today.getTime(); // Total time ms

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
  text(strDay+" ", (i/2)+(i*0.14), i*0.045);  // Day
  textAlign(LEFT);
  textSize(fontSize);
  fill(177, 200, 255);
  // fill(93, 149, 239); bl
  // fill(242, 129, 9); or
  if (String(dd).length < 2) {
    dd = "0"+String(dd);
  }
  text(dd, (i/2)+(i*0.13), i*0.045);  // Date
  pop();
  // Display stopwatch time
  fontSize = (i/10)*1.3;
  textSize(fontSize);
  push();
  textAlign(CENTER);
  strokeWeight(0);
  fill(242, 129, 9);
  // Pad with 0s
  if (String(Math.trunc(timerS)).length < 2) {
    timerS_form = "0"+(String(Math.trunc(timerS)))
  } else {
    timerS_form = Math.trunc(timerS)%60;
    if (String(timerS_form).length < 2) {
      timerS_form = "0"+String(Math.trunc(timerS)%60)
    }
  }
  if (String(Math.trunc(timerM)).length < 2) {
    timerM_form = "0"+(String(Math.trunc(timerM)))
  } else {
    timerM_form = Math.trunc(timerM)%60;
    if (String(timerM_form).length < 2) {
      timerM_form = "0"+String(Math.trunc(timerM)%60)
    }
  }
  if (String(timerMS).length < 2) {
    timerMS_form = "00"+(String(timerMS))
  } else if (String(timerMS).length < 3) {
    timerMS_form = "0"+(String(timerMS))
  } else {
    timerMS_form = timerMS;
  }
  timerMS_form = String(timerMS_form).substring(0,2);
  // Timer
  text(timerM_form+":"+timerS_form+":"+timerMS_form, (i/2)+(i*0.056), i*0.175);
  pop();

  // Draw main number indicatcors
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
  noStroke()
  fill(0, 22, 54);
  ellipse(0, 0, i*0.645, i*0.645);
  fill(93, 149, 239);
  sunr = map(riseSplit, 0, 2359, 0, 359);
  suns = map(setSplit, 0, 2359, 0, 359);
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
  if (clicked && !paused) {
    timerMS = (today.getTime()-startT)%1000;
    timerS = ((today.getTime()-startT)/1000);
    timerM = ((today.getTime()-startT)/60000);
    timerIncrement();
  }
  translate(i*0.5, -(i*0.5));
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

  // Schedule
  translate(0, i);
  fill(232, 204, 0);
  rotate(-90);
  start0 = 10.5;
  end0 = 12.5;
  // Arc
  start0map = map(start0, wakeTime, sleepTime, 0, 360);
  end0map = map(end0, wakeTime, sleepTime, 0, 360);
  arc(0, 0, -(i*0.645), -(i*0.645), start0map, end0map);
  rotate(90);
  fill(230);
  noStroke();
  strokeWeight(j*2);
  stroke(250);
  var dayTime = sleepTime - wakeTime;
  stroke(175);
  rotate(90); // To fix the top
  for (n = 0; n < dayTime*2; n++) {  // Hours/2
    line(-(i*0.285), 0, -(i*0.32), 0);
    rotate(360/(dayTime*2));
  }
  for (n = 0; n < dayTime; n++) {  // Hours
    stroke(250);
    strokeWeight(j*2.2);
    rotate(360/dayTime);
    line(-(i*0.240), 0, -(i*0.32), 0);
  }
  rotate(180-(360/dayTime)); // Start at 0
  for (n = 0; n < dayTime; n++) {  // Numbers
    rotate(360/dayTime);
    textSize(fontSize*0.5);
    fill(230);
    noStroke();
    text(n+wakeTime, i*0.175, (i*0.03));
  }
  rotate(-(180-(360/dayTime)));
  rotate(-90);
  // Numbers
  textSize(fontSize*0.5);
  fill(230);
  noStroke();
  // text(sleepTime, 0, -(i*0.13));
  // text(wakeTime+(dayTime*0.25), i*0.175, (i*0.03));
  // text(wakeTime+(dayTime*0.5), 0, i*0.19);
  // text(wakeTime+(dayTime*0.75), -(i*0.16), (i*0.03));

  /* Draw hands */

  stroke(255);
  // Schedule
  push();
  stroke(242, 129, 9);
  strokeWeight(j*3);
  if (h>sleepTime) {
    angle = 0;
  } else {
    incr = map(m, 0, 60, 0, 1);
    angle = map(h+incr, wakeTime, sleepTime, 0, 360);
  }
  rotate(angle);
  line(0, 0, 0, -i*0.3205);
  fill(0);
  ellipse(0, 0, j*6, j*6);
  pop();
  // Stopwatch minutes
  push();
  translate(0, -i);
  stroke(242, 129, 9);
  strokeWeight(j*3);
  angle = map(timerM, 0, 60, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*0.3205);
  fill(0);
  ellipse(0, 0, j*6, j*6);
  pop();
  // 24 hour
  translate(-(i*0.5), -(i*0.5));
  push();
  strokeWeight(j*3);
  incr = map(m, 0, 60, 0, 1);
  angle = map(h+incr, 0, 24, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*0.3205);
  fill(0);
  ellipse(0, 0, j*6, j*6);
  pop();
  // 12 hour
  translate(i*0.5, 0);
  // Hours
  push();
  strokeWeight(j*10);
  incr = map(m, 0, 60, 0, 1);
  angle = map(h+incr, 0, 12, 0, 360);
  rotate(angle);
  line(0, 0, 0, -i*0.64);
  ellipse(0, 0, j*8, j*8);
  pop();
  // Minutes
  push();
  strokeWeight(j*10);
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
  angle = map(timerS, 0, 60, 0, 360);
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

// Delay update
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Increment timer by ms
async function timerIncrement() {
  while (true) {
    await sleep(1000);
    timerMS_test++;
    // console.log(timerMS_test);
  }
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
function mousePressed() {
  if (clicked && !paused) {
    // console.log("pause");
    paused = !paused;
  } else if (clicked && paused) {
    timerMS = 0;
    timerMS_test = 0; //////
    timerS = 0;
    timerM = 0;
    startT = time;
    clicked = !clicked;
    paused = !paused;
  } else if (!clicked) {
    timerMS = 0;
    timerS = 0;
    timerM = 0;
    startT = time;
    clicked = !clicked;
  }
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
