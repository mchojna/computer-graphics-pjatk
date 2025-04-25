var imgA;
var imgB;

function setup() {
  createCanvas(512, 512);
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
}
function draw() {
  if (!keyIsDown(32)) {
    image(imgA, 0, 0);
    text('Image A', 10, 20);
  } else {
    image(imgB, 0, 0);
    text('Image B', 10, 20);
  }
}
function makeVector(x, y) {
  return [x, y, 1];
}
function drawVector(img, vec) {
  let x = vec[0];
  let y = vec[1];
  img.set(x, y, color(0));
  img.updatePixels();
}
function mouseDragged() {
  var vecA1 = makeVector(mouseX, mouseY);
  drawVector(imgA, vecA1);
  
  var scale = makeScale(2, 2);
  var translation = makeTranslation(100, -50);
  var rotation = makeRotation(150);
  
  var tmpA1 = multiplyMatrixAndMatrix(rotation, translation);
  var tmpA2 = multiplyMatrixAndMatrix(tmpA1, scale);
  var vecA2 = multiplyMatrixAndVector(tmpA2, vecA1);
  drawVector(imgA, vecA2);
  
  
  var tmpB1 = multiplyMatrixAndMatrix(scale, rotation);
  var tmpB2 = multiplyMatrixAndMatrix(tmpB1, translation);
  var vecB = multiplyMatrixAndVector(tmpB2, vecA1);
  drawVector(imgB, vecB);
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
   for(let x = 0; x < 3; x++){
     for(let y = 0; y < 3; y++){
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
  
  for(let x = 0; x < 3; x++){
    for(let y = 0; y < 3; y++){
      for(let k = 0; k < 3; k++){
        o[x][y] += m[x][k] * n[k][y];
      }
    }
  }
  
  return o;
}
