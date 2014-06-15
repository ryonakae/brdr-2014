
var stage;
var stageCtx;

var maxParticles = 100;
var numInitParticles = 1;

var deadParticles = [];

var proximityManager;

var ticker;
var gridSize = 50;

var mx = 0;
var my = 0;

var distanceToGravitate = 150;

var particleDrawAlpha  = .5;
var particleSize = 1;

$(document).ready(function() {
  console.log('ready');

  var isTouch = function is_touch_device() {
    return !!('ontouchstart' in window) // detects touch in on most browsers
      || !!('onmsgesturechange' in window); // detects touch on ie
  }();


  $(document).bind('mousedown', handleMouseDown);


  stage = document.getElementById("stage");
  stageCtx = stage.getContext("2d");
  stageCtx.globalAlpha = 1;
  //stage.width = $(window).width();
  //stage.height = $(window).height();

  // fill black
  stageCtx.globalCompositeOperation = "copy"
  stageCtx.globalAlpha = 1;
  stageCtx.fillStyle = "#000000";
  stageCtx.fillRect(0,0, stage.width, stage.height);


  proximityManager = createProximityGrid(gridSize);

  for( var i = 0; i < numInitParticles; i++ ) {
    proximityManager.addItem( createParticle(stage) );
  }

  ticker = window.setInterval( updateLifeCycle, 32 )
});



function handleMouseDown(evt) {
  $(document).bind('mousemove', handleMouseMove);
  $(document).bind('mouseup', handleMouseUp);
}

function handleMouseMove(evt) {
  var spawn = createNewParticle();
  if( spawn ) {
    spawn.reset( evt.pageX, evt.pageY);
  }
}

function handleMouseUp(evt) {
  evt.preventDefault();


  $(document).unbind('mousemove', handleMouseMove);
  $(document).unbind('mouseup', handleMouseUp);
}

function createNewParticle() {
  var particle;
  if( proximityManager.items.length < maxParticles ) {
    if( deadParticles.length > 0) {
      particle = deadParticles.pop();
      particle.reset( mx, my );
      proximityManager.addItem( particle) ;
    } else {
      particle = createParticle(stage, mx, my )
      proximityManager.addItem( particle );
    }
  }
  return particle;
}

var attraction = .03;

function updateLifeCycle(){
  proximityManager.refresh();
  //console.log( 'Pos: ' + proximityManager.pos );
  var pos = proximityManager.pos;

  drawAlphaSheet();

  var i = proximityManager.items.length;
  while (i--) {
    var particle = proximityManager.items[i];
    var neighbors = proximityManager.getNeighbors(particle);
    if( neighbors ) {
      //  console.log( neighbors.length );
      var l = neighbors.length;
      while (l--) {
        var neighborParticle = neighbors[l];
        if (neighborParticle === particle) { continue; }

        drawBetween( particle, neighborParticle);
        ax = (particle.x - neighborParticle.x)/getDistance(neighborParticle, particle) ;
        ay = (particle.y - neighborParticle.y)/getDistance(neighborParticle, particle);
        particle.xVelocity -= ax*attraction;
        particle.yVelocity -= ay*attraction;
      }
    }
  }


  updateParticles();
  drawParticles();
}

function addParticle( xPos, yPos ) {
  console.log("adding")
  var particle = createParticle(stage, xPos, yPos);
  proximityManager.addItem( particle );
}

function drawBetween( p1, p2) {
  stageCtx.globalAlpha = .01;
  //stageCtx.strokeStyle = 0xFFFFFF;
  stageCtx.strokeStyle = stageCtx.strokeStyle = "#" + randomRange(0x00FF00, 0xFF0000);
  var dist = getDistance(p1, p2);
  stageCtx.globalAlpha = 1 - dist/100;
  stageCtx.globalCompositeOperation = "lighter"
  stageCtx.beginPath();
  stageCtx.moveTo( p1.x, p1.y );
  stageCtx.lineTo( p2.x, p2.y );
  stageCtx.stroke();
}

// returns the distance between two points
function getDistance( p1, p2 ) {
  var xs = 0;
  var ys = 0;
  xs = p2.x - p1.x;
  xs = xs * xs;
  ys = p2.y - p1.y;
  ys = ys * ys;
  return Math.sqrt( xs + ys );
}

var f = 5;
var g = 0;
// Covers a dim layer of black over the drawing
function drawAlphaSheet() {
  stageCtx.globalCompositeOperation = "source-over"
  var percDead = deadParticles.length / maxParticles;
  if( percDead > .9) {
    stageCtx.globalAlpha = .08;
    g = 0;
  } else if( percDead > .4 ) {
    stageCtx.globalAlpha = .04;
  } else {
    stageCtx.globalAlpha = .03;
  }
  stageCtx.fillStyle = "#000000";
  stageCtx.fillRect(0,0, stage.width, stage.height);
}

// Updates particle position
function updateParticles() {
  for( var i = 0; i < proximityManager.items.length; i++ ) {
    proximityManager.items[i].update();
  }
}

function removeParticle(particle) {
  var i = proximityManager.removeItem(particle)
  deadParticles.push( i[0] );
}

// draws all the particles
function drawParticles() {
  stageCtx.globalAlpha = particleDrawAlpha;
  for( var i = 0; i < proximityManager.items.length; i++ ){
    drawParticle( proximityManager.items[i]);
  }
}

// draws an individual particle
function drawParticle( particle ) {
//  stageCtx.beginPath();
//  stageCtx.globalCompositeOperation = "lighter"
//  stageCtx.fillStyle = 'white';
//  stageCtx.arc(particle.x, particle.y, particleSize, 0, 2 * Math.PI, false);
//  stageCtx.fill();
}

var friction = .9;

function createParticle( stage, xPos, yPos ){
  var that = {};

  that.reset = function( xPos, yPos) {
    that.weight = randomRange( 1, 10);

    that.xGrav = randomRange( -5, 5);
    that.yGrav = randomRange( -5, 5);

    that.x = xPos || randomRange( 10, stage.width - 10);
    that.y = yPos || randomRange( 10, stage.height - 10);

    that.xGravity = randomRange( -2, 2)*.5;
    that.yGravity = randomRange( -2, 2)*.5;



    var randVel = 25;
    that.xVelocity = randomRange( -randVel, randVel );
    that.yVelocity = randomRange( -randVel, randVel);
    //  console.log(that.yVelocity)
  }

  that.update = function() {
    if( Math.abs(that.xVelocity) < 1 && Math.abs(that.yVelocity) < 1 ) {
      // kill particle;
      //    console.log( 'kill me! ');
      removeParticle( that );
    }

    if( randomRange(0,100) > 98 ) {
      var spawn = createNewParticle();
      if( spawn ) {
        spawn.reset( that.x, that.y);
        spawn.xVelocity += randomRange(-5,5);
        spawn.yVelocity += randomRange(-5,5);
      }
    }

    that.xVelocity *= friction;
    that.yVelocity *= friction;

    if( that.x + that.xVelocity > stage.width) {
      that.xVelocity *= -1;
    } else if( that.x + that.xVelocity < 0 ){
      that.xVelocity *= -1;
    }

    if( that.y + that.yVelocity > stage.height) {
      that.yVelocity *= -1;
    } else if( that.y + that.yVelocity < 0 ){
      that.yVelocity *= -1;
    }

    drawBetween( that, {x:that.x + that.xVelocity, y:that.y + that.yVelocity})

    that.x += that.xVelocity;
    that.y += that.yVelocity;
  }

  that.reset(xPos, yPos);

  return that;
}

function createProximityGrid(gridSize) {
  var ret = {};

  ret.gridSize = gridSize;

  ret.items = [];
  ret.pos = [];

  ret.getNeighbors = function( item ){
    var x = Math.ceil(item.x/gridSize);
    var y = Math.ceil(item.y/gridSize);

    var p = ret.pos;
    var r = p[x][y];

    try{
      if (p[x-1][y-1]) {
        r = r.concat(p[x-1][y-1]);
      }
    } catch(e) {}
    try{
      if (p[x][y-1]) {
        r = r.concat(p[x][y-1]);
      }
    } catch(e) {}
    try{
      if (p[x+1][y-1]) {
        r = r.concat(p[x+1][y-1]);
      }
    } catch(e) {}
    try{
      if (p[x-1][y]) {
        r = r.concat(p[x-1][y]);
      }
    } catch(e) {}
    try{
      if (p[x+1][y]) {
        r = r.concat(p[x+1][y]);
      }
    } catch(e) {}
    try{
      if (p[x-1][y+1]) {
        r = r.concat(p[x-1][y+1]); }
    } catch(e) {}
    try{
      if (p[x][y+1]) { r = r.concat(p[x][y+1]);
      }
    } catch(e) {}
    try{
      if (p[x+1][y+1]) {
        r = r.concat(p[x+1][y+1]);
      }
    } catch(e) {}

    return r;
  }

  ret.refresh = function() {
    ret.pos = [];
    var i = ret.items.length;
    while (i--) {
      var item = ret.items[i];
      var x = Math.ceil(item.x/gridSize);
      var y = Math.ceil(item.y/gridSize);

      //  console.log("grid: " + x +", " + y)
      if (!ret.pos[x]) {
        ret.pos[x] = [];
      }
      if (!ret.pos[x][y]) {
        ret.pos[x][y] = [item];
        continue;
      }
      ret.pos[x][y].push(item);
    }
  }

  ret.addItem = function( item ) {
    ret.items.push(item);
  }

  ret.removeItem = function( item ) {
    var i = ret.items.length;
    while( i-- ) {
      if( ret.items[i] === item){
        return ret.items.splice(i,1);
      }
    }
  }

  return ret;
}

function ongoingTouchIndexById(idToFind) {
  for (var i=0; i<ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

function randomRange( min, max ) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
