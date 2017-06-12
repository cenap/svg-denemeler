if (SVG.supported) {
  var vw = 800,  vh = 600,  w = 100, h = 100, dx = 1, dy = 1, targetx = 300, targety = 300;
  var numberOfParticles = 50;
  var particles = [];

  for (var i = 0; i < numberOfParticles; i++) {
    var size = Math.random() * 25 + 10;
    particles[i] = new Particle(Math.random() * vw, Math.random() * vh, size, size);
  }

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  (function animloop() {
    requestAnimFrame(animloop);
    render();
  })();

  function render() {
    /*
    if (rect.x() + w >= vw || rect.x() <= 0) {
      dx = -dx;
    }
    if (rect.y() + h >= vh || rect.y() <= 0) {
      dy = -dy;
    }
    rect.dmove(dx,dy);
    */

    for (var i = 0; i < numberOfParticles; i++) {
      particles[i].attract(targetx, targety);
      particles[i].integrate();
      particles[i].move();
      particles[i].rotate();
    }
  }

} else {
  alert('SVG not supported')
}


var display = document.getElementById('drawing');
display.addEventListener('mousemove', onMousemove);
display.addEventListener('click', onClick);


function onClick(e) {
  explode(30);
}

function onMousemove(e) {
  targetx = e.offsetX;
  targety = e.offsetY;
}

function explode(damping) {
  var sign1 = 1, sign2 = 1;
  for (var i = 0; i < numberOfParticles; i++) {
    sign1 = Math.random() >= 0.5 ? 1:-1;
    sign2 = Math.random() >= 0.5 ? 1:-1;
    particles[i].x += Math.random() * sign1 * vw / damping;
    particles[i].y += Math.random() * sign2 * vh / damping;
  }
}
