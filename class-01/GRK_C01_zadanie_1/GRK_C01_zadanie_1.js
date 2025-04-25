function setup() {
  createCanvas(800,600);
  noLoop();
}


function draw() {
  //noprotect
  background(0);
  for(y = 0; y < height; y++){
    for(x = 0; x < width; x++){
        set(x, y, color(100));
     }
  }
  updatePixels();
}
