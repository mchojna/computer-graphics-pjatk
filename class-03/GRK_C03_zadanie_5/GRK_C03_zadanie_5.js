function setup() {
  createCanvas(512,512);
  background(255);
}

var x0 = -1;
var y0 = -1;
var x1 = -1;
var y1 = -1;

function mousePressed() {
  x0 = mouseX;
  y0 = mouseY;
}

function mouseDragged() {
  x1 = mouseX;
  y1 = mouseY;
  background(255);
  noStroke();
  fill('red');
  ellipse(x0 - 3, y0 - 3, 6);
  fill('green');
  ellipse(x1 - 3, y1 - 3, 6);
}

function mouseReleased() {
  background(255);
  loadPixels();
  draw_line();
  updatePixels();
}

function set_pixel(x, y, c) {
  idx = (y * 512 + x) * 4;
  pixels[idx] = -c;
  pixels[idx + 1] = c;
  pixels[idx + 2] = 0;
  pixels[idx + 3] = 255;
}

function draw_line() {
  let x0_ = x0, y0_ = y0, x1_ = x1, y1_ = y1;
  
  let dx = Math.abs(x1_ - x0_);
  let dy = Math.abs(y1_ - y0_);
  let swapped = false;

  if (dy > dx) {
    [x0_, y0_] = [y0_, x0_];
    [x1_, y1_] = [y1_, x1_];
    [dx, dy] = [dy, dx];
    swapped = true;
  }

  let xstep = (x1_ >= x0_) ? 1 : -1;
  let ystep = (y1_ >= y0_) ? 1 : -1;

  let d = 2 * dy - dx;
  let y = y0_;

  for (let x = x0_; x != x1_ + xstep; x += xstep) {
    if (swapped) {
      set_pixel(Math.floor(y), Math.floor(x), 1);
    } else {
      set_pixel(Math.floor(x), Math.floor(y), 1);
    }

    if (d > 0) {
      y += ystep;
      d += 2 * (dy - dx);
    } else {
      d += 2 * dy;
    }
  }
}
