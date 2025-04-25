function setup() {
  createCanvas(800, 600);
  noLoop();
}


function draw() {
  // noprotect

  // niebo
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      set(x, y, color(200, 200, 255));
    }
  }

  // trawa
  for (y = 400; y < height; y++) {
    for (x = 0; x < width; x++) {
      set(x, y, color(0, 100, 0));
    }
  }

  // kwiaty
  for (i = 0; i < 1000; i++) {
    x = floor(random(0, 800));
    y = floor(random(400, 600));
    set(x, y, color(
      floor(random(0, 256)),
      floor(random(0, 256)),
      floor(random(0, 256))
      ));
  }

  // fasada
  for (y = 200; y < 400; y++) {
    for (x = 200; x < 600; x++) {
      set(x, y, color(93, 47, 28));
    }
  }

  // dach
  for (var x = 400, w = 50; x < 700; x += 2, w+= 1) {
    set(x, w, color(255, 100, 100));

    for (y = w; y < 200; y++) {
      set(x, y, color(255, 100, 100));
    }
  }
  for (var x = 401, w = 50; x < 700; x += 2, w+= 1) {
    set(x, w, color(255, 100, 100));

    for (y = w; y < 200; y++) {
      set(x, y, color(255, 100, 100));
    }
  }

  for (var x = 400, w = 50; x > 100; x -= 2, w+= 1) {
    set(x, w, color(255, 100, 100));

    for (y = w; y < 200; y++) {
      set(x, y, color(255, 100, 100));
    }
  }

  for (var x = 399, w = 50; x > 100; x -= 2, w+= 1) {
    set(x, w, color(255, 100, 100));

    for (y = w; y < 200; y++) {
      set(x, y, color(255, 100, 100));
    }
  }

  updatePixels();
}
