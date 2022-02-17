/*******************************************************************************************************************
    Mood State Machine
    by Scott Kildall
    student Jennifer Lew Munoz
*********************************************************************************************************************/

var simpleStateMachine;           // the SimpleStateManager class
var selectedTransitionNum = 0;    // index into the array of transitions
var transitions = [];
var moodImage;

function preload() {
  simpleStateMachine = new SimpleStateManager("assets/moodStates.csv");
}

// Setup code goes here
function setup() {
  createCanvas(900, 600);
  imageMode(CENTER);

  // setup the state machine with callbacks
  simpleStateMachine.setup(setImage, setTransitionNames);
}


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawUI();
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  moodImage = loadImage(imageFilename);
}

// this is a callback, which we use to diplay next state labels
function setTransitionNames(transitionArray) {
  transitions = transitionArray;
}

//==== KEYPRESSED ====/
function keyPressed() {
  // forward one, check for overflow
  if (keyCode === DOWN_ARROW) {
    selectedTransitionNum++;
    if (selectedTransitionNum === transitions.length) {
      selectedTransitionNum = 0;
    }
  }

  // back one, check for underflow
  if (keyCode === UP_ARROW) {
    selectedTransitionNum--;
    if (selectedTransitionNum === -1) {
      selectedTransitionNum = transitions.length - 1;
      if (selectedTransitionNum === -1) {
        console.log("error: transition array probably empty");
      }
    }
  }

  // Space or ENTER or RETURN will activate a sections
  if (key === ' ' || keyCode === RETURN || keyCode === ENTER) {
    simpleStateMachine.newState(transitions[selectedTransitionNum]);
  }
}

function drawBackground() {

  // Color Pallete
  let lightBlue = color(187, 189, 246);
  let blue = color(152, 147, 218);
  let darkBlue = color(110, 110, 158);

  // Cavnas & Shape colors
  background(255);
  fill(lightBlue);

  // Top & Bottom rounded rectangle
  stroke(darkBlue);
  strokeWeight(10);
  rect(150, 25, 600, 200, 60);
  rect(150, 435, 600, 70, 60);

  // Draw main rectangle (900, 600)
  noStroke();
  rect(100, 100, 700, 375);

  // Draw side triangles
  triangle(50, 100, 100, 100, 100, 480);
  triangle(800, 100, 850, 100, 800, 480);

  // Screws
  fill(blue);
  ellipse(85, 125, 20, 20);
  ellipse(815, 125, 20, 20);
  ellipse(125, 450, 20, 20);
  ellipse(775, 450, 20, 20);

  // Add text
  fill(255);
  textSize(47);
  textStyle(BOLD);
  text('Mood State Machine', 225, 90);
  fill(255);
  textSize(25);
  text('Current Mood', 185, 170);
  text('What is happening?', 485, 170);

  // Outline
  stroke(darkBlue);
  strokeWeight(10);
  line(50, 100, 150, 100);
  line(50, 100, 100, 480);
  line(100, 480, 150, 480);
  line(750, 100, 850, 100);
  line(850, 100, 800, 480);
  line(800, 480, 750, 480);

  // Middle line
  fill(blue);
  line(430, 150, 430, 440);
}

function drawImage() {
  if (moodImage !== undefined) {
    image(moodImage, 280, 325);
  }
}

function drawUI() {
  push();

  textStyle(NORMAL);
  textSize(18);
  noStroke();

  for (let i = 0; i < transitions.length; i++) {
    fill(255);

    if (selectedTransitionNum === i) {
      fill(0);
    }
    text(transitions[i], 470, 210 + (i * 70), 320, 500);
  }

  pop();
}