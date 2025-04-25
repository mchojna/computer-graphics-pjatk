function preload() {
  img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}


function setup() {
  createCanvas(256,512);
  img.resize(256, 256);
  img.filter('gray');
  
  var arr = new Array(256).fill(0);
  
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    arr[img.pixels[i]]++;
  }
  img.updatePixels();
  
  background(0);
  stroke(255);
  
  maxVal = max(arr);
  
  for (let i = 0; i < 256; i++) {
    val = arr[i] * height / maxVal;
    line(i, 256, i, 256 - val);
  }
  

  
  image(img, 0, 256);
}


function draw() {

}
