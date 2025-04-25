function setup() {
  createCanvas(800, 600);
  noLoop();
}


function draw() {
  // noprotect
  
  x1 = 400;
  y1 = 50;
  
  x2 = 50;
  y2 = 550;
  
  x3 = 750;
  y3 = 550;
  
  background(0);
  
  stroke(255);
  strokeWeight(1);
  
  point(x1, y1);
  point(x2, y2);
  point(x3, y3);
  
  cx = x1;
  cy = y1;
  
  for(i = 0; i < 250000; i++){
    num = floor(random(0, 3));
    
    switch(num){
      case 0:
        cx = (cx + x1) / 2;
        cy = (cy + y1) / 2;
        point(cx, cy);
        break;
      case 1 :
        cx = (cx + x2) / 2;
        cy = (cy + y2) / 2;
        point(cx, cy);
        break;
      default:
        cx = (cx + x3) / 2;
        cy = (cy + y3) / 2;
        point(cx, cy);
        break;
    }
  }
  
  updatePixels();
}
