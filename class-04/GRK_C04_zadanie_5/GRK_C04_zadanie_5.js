var imgA;
var imgB;

var sliderTX;
var sliderTY;
var sliderSX;
var sliderSY;
var sliderR;
var sliderSHX;
var sliderSHY;

var buttonReset;
var buttonApplyTX;
var buttonApplyTY;
var buttonApplySX;
var buttonApplySY;
var buttonApplyR;
var buttonApplySHX;
var buttonApplySHY;

var matrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

var vec;
var vecs = [];

function setup() {
  createCanvas(1024, 700);
  background(255);

  imgA = createImage(512, 512);
  imgB = createImage(512, 512);

  imgA.loadPixels();
  imgB.loadPixels();

  var d = pixelDensity();

  for (var i=0; i<512*512*4*d; i+=4) {
    imgA.pixels[i]=240;
    imgA.pixels[i+1]=250;
    imgA.pixels[i+2]=240;
    imgA.pixels[i+3]=255;
    imgB.pixels[i]=240;
    imgB.pixels[i+1]=240;
    imgB.pixels[i+2]=250;
    imgB.pixels[i+3]=255;
  }
  imgA.updatePixels();
  imgB.updatePixels();

  sliderTX = createSlider(-100, 100);
  sliderTX.position(0, 530);
  sliderTX.value(0);

  sliderTY = createSlider(-100, 100);
  sliderTY.position(150, 530);
  sliderTY.value(0);

  sliderSX = createSlider(0, 3);
  sliderSX.position(0, 580);
  sliderSX.value(1);

  sliderSY = createSlider(0, 3);
  sliderSY.position(150, 580);
  sliderSY.value(1);

  sliderR = createSlider(-180, 180);
  sliderR.position(0, 630);
  sliderR.value(0);

  sliderSHX = createSlider(-10, 10);
  sliderSHX.position(0, 680);
  sliderSHX.value(0);

  sliderSHY = createSlider(-5, 5);
  sliderSHY.position(150, 680);
  sliderSHY.value(0);

  buttonApplyT = createButton("Apply T");
  buttonApplyT.position(300, 520);
  buttonApplyT.mousePressed(applyT);

  buttonApplyS = createButton("Apply S");
  buttonApplyS.position(300, 570);
  buttonApplyS.mousePressed(applyS); 

  buttonApplyR = createButton("Apply R");
  buttonApplyR.position(300, 620);
  buttonApplyR.mousePressed(applyR);

  buttonApplySH = createButton("Apply SH");
  buttonApplySH.position(300, 670);
  buttonApplySH.mousePressed(applySH);

  buttonReset = createButton("Reset");
  buttonReset.position(400, 670);
  buttonReset.mousePressed(reset);
}
function draw() {
  background(255);
  image(imgA, 0, 0);
  image(imgB, 512, 0);

  fill(0);
  textSize(16);
  text('Image A', 10, 20);
  text('Image B', 522, 20);

  text("Transition X: " + sliderTX.value(), 0, 530);
  text("Transition Y: " + sliderTY.value(), 150, 530);

  text("Scale X: " + sliderSX.value(), 0, 580);
  text("Scale Y: " + sliderSY.value(), 150, 580);

  text("Rotation: " + sliderR.value(), 0, 630);

  text("Shear X: " + sliderSHX.value(), 0, 680);
  text("Shear Y: " + sliderSHY.value(), 150, 680);

  drawMatrix(matrix, 400, 550)
}
function makeVector(x, y) {
  return [x, y, 1];
}
function drawVector(img, vec) {
  let x = vec[0];
  let y = vec[1];
  if (x >= 0 && x < img.width && y >= 0 && y < img.height) {
    img.loadPixels();
    img.set(x, y, color(0));
    img.updatePixels();
  }
  vecs.push(vec);
}

function mouseDragged() {
  vec = makeVector(mouseX, mouseY);
  drawVector(imgA, vec);
}
function drawMatrix(matrix, x, y) {
  textSize(16);
  fill(0);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      text(matrix[row][col], x + col * 30, y + row * 25);
    }
  }
}

function applyT() {
  let tx = sliderTX.value();
  let ty = sliderTY.value();
  let tMatrix = makeTranslation(tx, ty);
  matrix = multiplyMatrixAndMatrix(tMatrix, matrix);
  transformVectors();
}

function applyS() {
  let sx = sliderSX.value();
  let sy = sliderSY.value();
  let sMatrix = makeScale(sx, sy);
  matrix = multiplyMatrixAndMatrix(sMatrix, matrix);
  transformVectors();
}

function applyR() {
  let r = sliderR.value();
  let rMatrix = makeRotation(r);
  matrix = multiplyMatrixAndMatrix(rMatrix, matrix);
  transformVectors();
}

function applySH() {
  let shx = sliderSHX.value();
  let shy = sliderSHY.value();
  let shMatrix = makeShear(shx, shy);
  matrix = multiplyMatrixAndMatrix(shMatrix, matrix);
  transformVectors();
}

function transformVectors() {
  imgB.loadPixels();
  var d = pixelDensity();
  for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
    imgB.pixels[i] = 240;
    imgB.pixels[i + 1] = 240;
    imgB.pixels[i + 2] = 250;
    imgB.pixels[i + 3] = 255;
  }

  for (let i = 0; i < vecs.length; i++) {
    let v = vecs[i];
    let transformed = multiplyMatrixAndVector(matrix, v);
    let x = Math.round(transformed[0]);
    let y = Math.round(transformed[1]);
    if (x >= 0 && x < 512 && y >= 0 && y < 512) {
      imgB.set(x, y, color(0));
    }
  }

  imgB.updatePixels();
}


function reset() {
  vec = null;
  
  matrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  
  sliderTX.value(1);
  sliderTY.value(1);

  sliderSX.value(1);
  sliderSY.value(1);

  sliderR.value(0);

  sliderSHX.value(1);
  sliderSHY.value(1);

  matrix = makeIdentity();

  var d = pixelDensity();

  for (var i=0; i<512*512*4*d; i+=4) {
    imgA.pixels[i]=240;
    imgA.pixels[i+1]=250;
    imgA.pixels[i+2]=240;
    imgA.pixels[i+3]=255;
    imgB.pixels[i]=240;
    imgB.pixels[i+1]=240;
    imgB.pixels[i+2]=250;
    imgB.pixels[i+3]=255;
  }
  imgA.updatePixels();
  imgB.updatePixels();
}
function makeIdentity() {
  return [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
}
function makeTranslation(tx, ty) {
  return [
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1],
  ];
}
function makeScale(sx, sy) {
  return [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1],
    ]
}
function makeRotation(a) {
  var r = (a / 180) * Math.PI;
  return [
    [Math.cos(r), -Math.sin(r), 0],
    [Math.sin(r), Math.cos(r), 0],
    [0, 0, 1],
    ]
}
function makeShear(shx, shy) {
  return [
    [1, shx, 0],
    [shy, 1, 0],
    [0, 0, 1],
  ];
}
function multiplyMatrixAndVector(m, v) {
  var w = [0, 0, 0];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      w[x] += m[x][y] * v[y];
    }
  }
  return w;
}
function multiplyMatrixAndMatrix(m, n) {
  let o = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]

    for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let k = 0; k < 3; k++) {
        o[x][y] += m[x][k] * n[k][y];
      }
    }
  }

  return o;
}
