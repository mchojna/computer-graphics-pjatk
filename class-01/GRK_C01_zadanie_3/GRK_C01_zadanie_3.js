function setup() {
  createCanvas(800, 600);
  noLoop();
}


function draw() {
  //noprotect
  for(y = 0; y < height; y++){
    for(x = 0; x < width; x++){
      dx = x - (width / 2);
      dy = y - (height / 2);
      d = sqrt(dx*dx+dy*dy);
      
      //set(x, y, color(255-d, d, (((x / width) * 255) + ((y / height) * 255))));
      set(x, y, color(255-d, d, (((x + y) / (width + height)) * 255)));
    }
  }
  updatePixels();
}
