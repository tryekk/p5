class Hand {
  constructor(len, hms, ) {
    this.len = len;
    this.hms = hms;
  }
  tick() {
    // Scale clock size
    i = (windowHeight/2)*this.len;
    angle = map(hms, 0, 60, 0, 360);
    rotate(angle);
    line(0, 0, 0, -i);
  }
}

// arc(0, 0, (2*i)*1.1, (2*i)*1.1, 0, 360, OPEN);

// Display digital time
textAlign(CENTER);
fontSize = (i/10)*1.4;
textSize(fontSize);
push();
strokeWeight(0);
fill(255);
// text(h+":"+m+":"+s, i/2, i*0.0375);

// Main watch face
strokeWeight(j*4)
ellipse(0, 0, (2*i)*1.1, (2*i)*1.1);

// Complication (24 hour)
ellipse(0, 0, (i/2)*1.15, (i/2)*1.15);

<script data-main="js/config" src="require.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
