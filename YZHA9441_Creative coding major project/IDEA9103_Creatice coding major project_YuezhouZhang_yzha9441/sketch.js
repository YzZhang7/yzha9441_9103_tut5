// [G]for group code, and [A]for personal animation.

// [G_1] Apple's coordinates 
  // Set scale_val for big and small circles
let circleCenters = [
  { x: 600, y:524, angle: 0, s: 1, state: 0, scale_val: 1 },
  { x: 500, y: 700, angle: 0, s: 1, state: 0, scale_val: 1 },
  { x: 600, y: 1041, angle: 0, s: 1, state: 0, scale_val: 1 },
  { x: 700, y: 1220, angle: 0, s: 1, state: 0, scale_val: 1 },
  { x: 1050, y: 1200, angle: 0, s: 1, state: 0, scale_val: 1 },
  { x: 1100, y: 1514, angle: 0, s: 1, state: 0, scale_val: 1 },
  { x: 1530, y: 1010, angle: 0, s: 1, state: 0, scale_val: 1 },
  { x: 1900, y: 965, angle: 0, s: 1, state: 0, scale_val: 1 },

  { x: 600, y: 828, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 700, y: 894, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 759, y: 1000, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 730, y: 1380, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 828, y: 1450, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 950, y: 1450, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 950, y: 935, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1000, y: 1046, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1050, y: 1360, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1150, y: 1070, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1250, y: 1450, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1250, y: 1000, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1410, y: 1270, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1340, y: 1370, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1463, y: 1160, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1650, y: 900, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1730, y: 810, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 2020, y: 855, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 1850, y: 810, angle: 0, s: 1, state: 0, scale_val: 0.6 },
  { x: 2110, y: 772, angle: 0, s: 1, state: 0, scale_val: 0.6 }
];


let bgcol
let getCir
let getCirVel
let getCirAcc
let pressCir = false
let table = false
let tableX, tableY, tableW = 500, tableH = 100

let circleSize = 200;
let circleRadius = circleSize / 2;

let canvasWidth, canvasHeight;
const canvasRatio = 2 / 3; // make sure the canvas ratio is always 2:3


function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateCanvasSize();
  bgcol = color(251, 197, 0)

  // set acceleration and velocity of apple to simulate realistic motion 
  getCirVel = createVector(0, 0)
  getCirAcc = createVector(0, 0)

}

// [G_2] Set draw functions
function draw() {
  background(bgcol);

  drawSun();
  drawBackgroundLines();
  drawGround();
  drawTreeTrunk();
  rotateCircleGroups(circleCenters)

  for (let center of circleCenters) {
    stroke(15);
    strokeWeight(scaledElement(6));
    fill(255);
    drawCircleGroup(center);
  }

  drawTable()
  drawRoots();

   //add texts for annotation
   textAlign(LEFT,CENTER)
   fill(255)
   textSize(scaledElement(50))
   text("1. Press 'A' or 'S' to change season.", scaledElement(50), scaledElement(3000));
   text("2. Hover the apples to make them rotate.", scaledElement(50),scaledElement(3070));
   text("3. Choose one apple, mouse click it and press 'Z' to pick it.", scaledElement(50),scaledElement(3140));
   text("4. Quickly move the mouse to toss and roll the apple.", scaledElement(50),scaledElement(3210));
}

// [A_1] When input "A" or "S" then change background colour, which means seasonal change. 
function keyPressed() {
  // [A_1.1] Input A/S to change colour(change season)
  if (key == 'a' || key == 'A') bgcol = color(245, 185, 173)
  if (key == 's' || key == 'S') bgcol = color(2251, 197, 0)

  // [A_1.2] Click one apple and input P to create a table to pick the apple.
  if (pressCir) {
    if ((key == 'z' || key == 'Z') && table == false) {
      table = true
    }
  }
}

// [A_2] Draw the table to hold the falling apple
function drawTable() {
  if (table) {
    let radius = (circleRadius)
    // [A_2.1] Draw the table
    fill(54, 54, 54)
    stroke(0)
    strokeWeight(scaledElement(5))
    rect(tableX, tableY, scaledElement(tableW), scaledElement(tableH))
    tableX = mouseX - scaledElement(tableW) / 2
    tableY = mouseY - scaledElement(tableH) / 2
    
    // [A_2.2] Limit apple's activity range to the table
      // check if apple is over the left of table
    if (scaledElement(getCir.x) < tableX) {
      getCir.x = tableX / scaledElement(1) 
      getCirVel.y *= 0 
    } 
    // check if apple is over the right of table
    if (scaledElement(getCir.x) > tableX + scaledElement(tableW)) {
      getCir.x = (tableX + scaledElement(tableW)) / scaledElement(1) 
    }

    // [A_2.3] Calculate the acceleration and velocity of apple to simulate motion 
    getCirAcc = createVector(mouseX - scaledElement(getCir.x), mouseY - scaledElement(getCir.y)).mult(0.02) // acceleration vector
    getCirAcc.y = 2.5 
    getCirVel.add(getCirAcc)
    getCir.x += getCirVel.x
    getCir.y += getCirVel.y
    getCirVel.mult(0.97) // frictional drag

    // [A_2.4] Apple rolling
    getCir.angle += getCirVel.x * 0.01

    // [A_2.5] Make the apple rebound when falling to the table
    if (getCir.y >= (tableY - scaledElement(radius * getCir.scale_val * getCir.s)) / scaledElement(1)) {
      getCir.y = (tableY - scaledElement(radius * getCir.scale_val * getCir.s)) / scaledElement(1)
      getCirVel.y *= -0.9 // set rebound
    } else {
      getCir.y += getCirVel.y
    }
  }
}

// [A_3] Check the crash between apple and table
function mousePressed() {
  pressedCircleGroups(circleCenters);
}
function pressedCircleGroups(centers) {
  for (let center of centers) {
    let x = scaledElement(center.x)
    let y = scaledElement(center.y)
    let radius = (circleRadius)
    let scale_val = scaledElement(center.scale_val)


    if (table == false && dist(x, y, mouseX, mouseY) < radius * scale_val) {
      center.state = 1
      center.s = 1.2
      getCir = center
      pressCir = true
    }
  }
}

// [A_4] When mouse is hovering on the apple, let it rotate.
function rotateCircleGroups(centers) {

  for (let center of centers) {
    let x = scaledElement(center.x)
    let y = scaledElement(center.y)
    let radius = (circleRadius)
    let scale_val = scaledElement(center.scale_val)

    if (table == false && dist(x, y, mouseX, mouseY) < radius * scale_val) {
      center.angle += 0.1 // make angle plus gradually to make it rotate
    }
  }
}




// [G_3] Adjust the value of an element based on the window size.
function scaledElement(inputElement) {
  return inputElement * min(canvasWidth, canvasHeight) / 2200;
}

// [G_4] Draw concentric sun
function drawSun() {
  noStroke();
  let numSuns = 8;
  let sunCenterX = width / 2;
  let sunCenterY = 0;

  for (let i = 0; i < numSuns; i++) {
    let sunSize = scaledElement(300 + i * 50);
    let sunColor = color(255, 255, 255, 50);

    fill(sunColor);
    ellipse(sunCenterX, sunCenterY, sunSize * 2);
  }
}

// [G_5] Draw the background lines
function drawBackgroundLines() {
  let numLines = 23;
  let circleCenterX = canvasWidth / 2;
  let circleCenterY = canvasHeight / 2;

  // [G_5.1] set 3 groups of lines to create the circle trend
  let radius1 = scaledElement(900);
  let radius2 = scaledElement(1200);
  let radius3 = scaledElement(1500);
  let gap = scaledElement(220);
  let interval = scaledElement(80); // distance between each two lines

  drawLines(numLines, gap, interval, radius1, circleCenterX, circleCenterY, scaledElement(6));
  drawLines(numLines, gap, interval, radius2, circleCenterX, circleCenterY, scaledElement(18));
  drawLines(numLines, gap, interval, radius3, circleCenterX, circleCenterY, scaledElement(30));
}

 // [G_5.2] Draw lines for each radius
function drawLines(numLines, gap, interval, inputRadius, centerX, centerY, strokeW) {
  strokeWeight(strokeW)
  stroke(100, 100, 100)
  for (let i = 0; i < numLines; i++) {
    let x = gap + i * interval
    let y1 = canvasHeight; // start from the bottom of canvas
    let dx = x - centerX; // length of the Xdistance between circle center and the line ends

  // Calculate Y position to draw plumb lines
    //check if the line could intersect with the circle
    if (abs(dx) <= inputRadius) {
      let dy = sqrt(inputRadius * inputRadius - dx * dx)  // Calculate the dy by Pythagorean theorem
      let y2 = centerY + dy - scaledElement(800);
      line(x, y1, x, y2)
    }
  }
}

// [G_6] Draw the ground
function drawGround() {
  noStroke();
  let rectHeight = scaledElement(600);
  let baserectColor = color(54, 54, 54);
  fill(baserectColor);
  rect(0, canvasHeight - rectHeight, canvasWidth, rectHeight);
}

// [G_7] Draw tree trunks
function drawTreeTrunk() {
  let rectHeight = scaledElement(600);
  let rectX1 = scaledElement(120);
  let rectY1 = scaledElement(450);
  let rectX2 = scaledElement(80);
  let rectY2 = scaledElement(850);
  let rectX3 = scaledElement(40);
  let rectY3 = scaledElement(1100);
  fill(1, 166, 180);
  rect(width / 2 - rectX1 / 2, height - (rectHeight + rectY1), rectX1, rectY1);
  rect(width / 2 - rectX2 / 2, height - (rectHeight + rectY2), rectX2, rectY2);
  rect(width / 2 - rectX3 / 2, height - (rectHeight + rectY3), rectX3, rectY3);
}

// [G_8] Draw roots
function drawRoots() {
  noStroke();
  let rectHeight = scaledElement(600);
  let rectRootX1 = scaledElement(300);
  let rectRootY1 = scaledElement(50);
  let rectRootX2 = scaledElement(600);
  let rectRootY2 = scaledElement(30);
  let rectRootX3 = scaledElement(900);
  let rectRootY3 = scaledElement(10);
  fill(251, 197, 0);
  for (i = 0; i < 3; i++) {
    rect(width / 2 - (rectRootX1 - i * scaledElement(50)) / 2, height - (rectHeight - (rectRootY1 + i * scaledElement(70))), rectRootX1 - (i * scaledElement(50)), rectRootY1);
    rect(width / 2 - (rectRootX2 - i * scaledElement(50)) / 2, height - (rectHeight - (rectRootY2 + i * scaledElement(70)) - scaledElement(30)), rectRootX2 - (i * scaledElement(50)), rectRootY2);
    rect(width / 2 - (rectRootX3 - i * scaledElement(50)) / 2, height - (rectHeight - (rectRootY3 + i * scaledElement(70)) - scaledElement(60)), rectRootX3 - (i * scaledElement(50)), rectRootY3);
  }
}

// [A_5] Change apple colour when clicking
function drawCircleGroup(center) {
  // [A_5.1] Get the position of apples
  let x = scaledElement(center.x)
  let y = scaledElement(center.y)
  let radius = (circleRadius)
  let scale_val = scaledElement(center.scale_val)

  // [A_5.2] Draw concentric circles
  let numCircles = 5;  
  let strokeWidth = 9;

  // [A_5.3]Calculate the radius of the semicircle so that it is equal to the radius of the outermost concentric circle
  let halfCircleRadius = radius * scale_val;

  push();
  translate(x, y); // Translate to specified coordinates
  scale(center.s)

  // [A_5.4] Change apple col when click one
  if (center.s != 1) {
    stroke(241, 100, 90)
  } else {
    stroke(15)
  }
  fill(255)


  rotate(-PI / 2 + center.angle); // Rotate counterclockwise 
  for (let i = 0; i < numCircles; i++) {
    // let currentRadius = halfCircleRadius - i * circleSpacing;
    let currentRadius = map(i, numCircles - 1, 0, 0, radius)
    strokeWeight(strokeWidth * scale_val); // Line width, adjusted according to scaling
    arc(0, 0, currentRadius * 2 * scale_val, currentRadius * 2 * scale_val, 0, PI);
  }

  // Change apple col
  if (center.s != 1) {
    fill(241, 100, 90)
  } else {
    fill(15);
  }
  noStroke();
  arc(0, 0, halfCircleRadius * 2 + strokeWidth * scale_val, halfCircleRadius * 2 + strokeWidth * scale_val, PI, TWO_PI);

  pop();
}



// [G_9] Set the canvas size fit to window 
function calculateCanvasSize() {
  // Check if the aspect ratio of the window is greater than the canvas ratio.
  if (windowWidth / windowHeight > canvasRatio) {
    canvasHeight = windowHeight;
    canvasWidth = windowHeight * canvasRatio;
  } else {
    // If not, adjust the canvas width to fit the window width while maintaining the canvas ratio.
    canvasWidth = windowWidth;
    canvasHeight = windowWidth / canvasRatio;
  }
  resizeCanvas(canvasWidth, canvasHeight);// Resize the canvas with the calculated dimensions.
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust the canvas to match the window size.
  calculateCanvasSize(); // Recalculate and set the canvas size to maintain the desired ratio.
}
