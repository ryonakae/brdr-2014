jQuery(function(){
  "use strict";

  var winWidth;
  var winHeight;

  jQuery(window).on("load resize", function(){
    winWidth = jQuery(this).width();
    winHeight = jQuery(this).height();
  });


  // 画像のリサイズ
  jQuery.fn.imgResize = function(options) {
    options = jQuery.extend({
      area : jQuery(this).parent(),
      type : "both" // horizontal, vertical, both
    }, options);

    var areaWidth = jQuery(options.area).width();
    var areaHeight = jQuery(options.area).height();

    var img = jQuery(this);
    var imgWidth = img.width();
    var imgHeight = img.height();
    var scaleWidth = areaWidth / imgWidth;
    var scaleHeight = areaHeight / imgHeight;
    var fixScale = Math.max(scaleWidth, scaleHeight);
    var setWidth = Math.floor(imgWidth * fixScale);
    var setHeight = Math.floor(imgHeight * fixScale);
    var imgTop = Math.floor((setHeight - areaHeight) / -2);
    var imgLeft = Math.floor((setWidth - areaWidth) / -2);

    if( options.type === "horizontal" ){
      img.css({
        "width" : setWidth,
        "height" : setHeight,
        "left" : imgLeft
      });
    }
    else if( options.type === "vertical" ){
      img.css({
        "width" : setWidth,
        "height" : setHeight,
        "top" : imgTop
      });
    }
    else{
      img.css({
        "width" : setWidth,
        "height" : setHeight,
        "top" : imgTop,
        "left" : imgLeft
      });
    }

    return this;
  };


  // common backtop
  function commonBackTop() {
    jQuery(".backtop").on("click", function(){
      jQuery("html, body").stop().animate({ scrollTop : 0 }, 1500, "easeInOutCubic");
    });
  }


  // common loader fade out
  function commonLoaderFadeOut() {
    jQuery(".l-loader")
      .transition({ "opacity" : 0 }, 1000)
      .transition({ "visibility" : "hidden" }, 0);
  }


  // common loader fade in
  /*
  function commonLoaderFadeIn() {
    jQuery(".l-loader")
      .transition({ "visibility" : "visible" }, 0)
      .transition({ "opacity" : 1 }, 1000);
  }
  */


  // common logo show & hover
  function commonLogoShowHover() {
    jQuery(".logo").delay(1200).queue(function() {
      jQuery(this).addClass("is-shown").dequeue();
    });
    jQuery(".logo").on({
      "mouseenter":function(){
        jQuery(this).removeClass("is-shown");
        jQuery(this).delay(1).queue(function() {
          jQuery(this).addClass("is-hover").dequeue();
        });
      },
      "mouseleave":function(){
        jQuery(this).removeClass("is-hover");
        jQuery(this).addClass("is-shown");
      }
    });
  }


  // index change color
  function indexChangeColor() {
    var worksOffSet = jQuery(".l-index-works").offset().top;
    var blogOffSet = jQuery(".l-index-blog").offset().top;
    var footerOffSet = jQuery(".l-footer").offset().top;
    var scroll;

    jQuery(window).scroll(function(){
      scroll = jQuery(window).scrollTop();

      if ( scroll < 0 ) {
        jQuery("body").removeClass("is-green");
        jQuery("body").removeClass("is-blue");
      }
      else if ( 0 <= scroll && scroll <= worksOffSet + 100 ) {
        jQuery("body").removeClass("is-green");
        jQuery("body").removeClass("is-blue");
      }
      else if ( worksOffSet + 100 <= scroll && scroll <= blogOffSet + 100 ) {
        jQuery("body").addClass("is-green");
        jQuery("body").removeClass("is-blue");
      }
      else if ( blogOffSet + 100 <= scroll && scroll <= footerOffSet + 100 ) {
        jQuery("body").removeClass("is-green");
        jQuery("body").addClass("is-blue");
      }
      else if ( footerOffSet - scroll <= 0 ) {
        jQuery("body").removeClass("is-green");
        jQuery("body").removeClass("is-blue");
      }
      else {
        jQuery("body").removeClass("is-green");
        jQuery("body").removeClass("is-blue");
      }
    });
  }


  // index top resize
  function indexTopResize() {
    jQuery(".l-index-top").css({
      "width": winWidth,
      "height": winHeight
    })
    .children(".index-top-image").imgResize();
  }


  // index top scroll down
  function indexTopScrollDown() {
    // var worksOffset = jQuery(".l-index-works").offset().top;
    var topImage = jQuery(".index-top-image");
    var scroll;
    var topHeight;

    jQuery(".scroll.scroll-down").click(function(){
      jQuery("html,body").animate({ scrollTop : winHeight + 50 }, 1500, "easeInOutQuart");
    });

    jQuery(window).scroll(function(){
      topHeight = winHeight;
      scroll = jQuery(window).scrollTop();

      if ( scroll < 0 ) {
        topImage.css({
          y : 0,
          "opacity" : 1
        });
      }
      else if ( 0 <= scroll && scroll <= topHeight ) {
        topImage.css({
          y : scroll * -0.5,
          "opacity" : 1 - (scroll / topHeight * 2)
        });
      }
      else {
        topImage.css({
          y : 0,
          "opacity" : 0
        });
      }
    });
  }


  // index top particle (enable)
  function indexTopEnableParticle() {
    jQuery(".index-top-particle").attr("width", winWidth).attr("height", winHeight);

    indexTopParticle();
  }


  // index article resize
  function indexArticleImgResize() {
    jQuery(".article").each(function(){
      jQuery(this).find("img").imgResize();
    });
  }


  // index blog article resize
  function indexBlogArticleResize() {
    var article = jQuery(".l-index-blog .article");
    var articleWidth = article.width();

    article.css({ "height" : articleWidth });
  }


  // load
  jQuery(window).on("load", function(){
    commonBackTop();

    commonLoaderFadeOut();

    commonLogoShowHover();

    indexChangeColor();

    indexTopResize();

    indexTopScrollDown();

    //indexTopEnableParticle();

    indexBlogArticleResize();

    indexArticleImgResize();

    jQuery(".article").delay(1000).queue(function() {
      jQuery(this).addClass("is-shown").dequeue();
    });
  });


  // resize
  jQuery(window).on("resize", function(){
    indexChangeColor();

    indexTopResize();

    indexTopScrollDown();

    //indexTopEnableParticle();

    indexBlogArticleResize();

    indexArticleImgResize();
  });
});


// index top particle
function indexTopParticle() {
  // 変数定義
  var stage;
  var stageCtx;

  var maxParticles = 100;
  var numInitParticles = 1;

  var deadParticles = [];

  var proximityManager;

  var gridSize = 40;

  var mx = 0;
  var my = 0;

  var particleDrawAlpha  = 0.5;

  var interval = 60;


  // 初期設定
  stage = document.getElementById("canvas");
  stageCtx = stage.getContext("2d");
  stageCtx.globalAlpha = 1;
  stage.width = jQuery(window).width();
  stage.height = jQuery(window).height();

  proximityManager = createProximityGrid(gridSize);

  for( var i = 0; i < numInitParticles; i++ ) {
    proximityManager.addItem( createParticle(stage) );
  }


  // 乱数生成してパーティクル描画
  var array = [];

  function Random() {
    this.location = {
      x: Math.random() * jQuery(window).width(),
      y: Math.random() * jQuery(window).height()
    };
    // this.radius = 0;
    // this.speed = 2;
    // this.angle = Math.random() * 360;
  }


  for (var i = 0; i < interval; i++) {
    array.push(new Random());
  }


  function draw() {
    for (var i = 0; i < array.length; i++) {
      var q = array[i];

      q.location.x = q.location.x + q.speed * Math.cos(q.angle * Math.PI / 360);
      q.location.y = q.location.y + q.speed * Math.sin(q.angle * Math.PI / 360);

      if (q.location.x < 0) {
        q.location.x = jQuery(window).width();
      }
      if (q.location.x > jQuery(window).width()) {
        q.location.x = 0;
      }
      if (q.location.y < 0) {
        q.location.y = jQuery(window).height();
      }
      if (q.location.y > jQuery(window).height()) {
        q.location.y = 0;
      }

      var spawn = createNewParticle();
      if( spawn ) {
        spawn.reset( q.location.x, q.location.y);
      }
    }
  }


  // settings
  function createNewParticle() {
    var particle;
    if( proximityManager.items.length < maxParticles ) {
      if( deadParticles.length > 0) {
        particle = deadParticles.pop();
        particle.reset( mx, my );
        proximityManager.addItem( particle);
      } else {
        particle = createParticle(stage, mx, my );
        proximityManager.addItem( particle );
      }
    }
    return particle;
  }


  var attraction = 0.01;

  function updateLifeCycle(){
    proximityManager.refresh();

    drawAlphaSheet();

    var i = proximityManager.items.length;

    var ax;
    var ay;

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
          ax = (particle.x - neighborParticle.x)/getDistance(neighborParticle, particle);
          ay = (particle.y - neighborParticle.y)/getDistance(neighborParticle, particle);
          particle.xVelocity -= ax*attraction;
          particle.yVelocity -= ay*attraction;
        }
      }
    }

    updateParticles();
    drawParticles();
  }


  function drawBetween( p1, p2) {
    stageCtx.globalAlpha = 0.005;
    // stageCtx.strokeStyle = "rgba(255,255,255,0.5)";
    stageCtx.strokeStyle = "rgba(255,107,102,0.5)";
    var dist = getDistance(p1, p2);
    stageCtx.globalAlpha = 1 - dist/100;
    // stageCtx.globalCompositeOperation = "lighter"
    stageCtx.globalCompositeOperation = "source-over";
    stageCtx.beginPath();
    stageCtx.lineWidth = 0.3;
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


  var g = 0;

  // Covers a dim layer of black over the drawing
  function drawAlphaSheet() {
    stageCtx.globalCompositeOperation = "destination-out";
    var percDead = deadParticles.length / maxParticles;
    if( percDead > 0.9) {
      stageCtx.globalAlpha = 0.05;
      g = 0;
    } else if( percDead > 0.4 ) {
      stageCtx.globalAlpha = 0.05;
    } else {
      stageCtx.globalAlpha = 0.05;
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
    var i = proximityManager.removeItem(particle);
    deadParticles.push( i[0] );
  }


  // draws all the particles
  function drawParticles() {
    stageCtx.globalAlpha = particleDrawAlpha;
  }


  var friction = 0.9;

  function createParticle( stage, xPos, yPos ){
    var that = {};

    that.reset = function( xPos, yPos) {
      that.weight = randomRange( 1, 10);

      that.xGrav = randomRange( -5, 5);
      that.yGrav = randomRange( -5, 5);

      that.x = xPos || randomRange( 10, stage.width - 10);
      that.y = yPos || randomRange( 10, stage.height - 10);

      that.xGravity = randomRange( -2, 2)*0.5;
      that.yGravity = randomRange( -2, 2)*0.5;

      var randVel = 25;
      that.xVelocity = randomRange( -randVel, randVel );
      that.yVelocity = randomRange( -randVel, randVel);
      //  console.log(that.yVelocity)
    };

    that.update = function() {
      if( Math.abs(that.xVelocity) < 1 && Math.abs(that.yVelocity) < 1 ) {
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

      drawBetween( that, {x:that.x + that.xVelocity, y:that.y + that.yVelocity});

      that.x += that.xVelocity;
      that.y += that.yVelocity;
    };

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
        if (p[x][y+1]) {
          r = r.concat(p[x][y+1]);
        }
      } catch(e) {}
      try{
        if (p[x+1][y+1]) {
          r = r.concat(p[x+1][y+1]);
        }
      } catch(e) {}

      return r;
    };

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
    };

    ret.addItem = function( item ) {
      ret.items.push(item);
    };

    ret.removeItem = function( item ) {
      var i = ret.items.length;
      while( i-- ) {
        if( ret.items[i] === item){
          return ret.items.splice(i,1);
        }
      }
    };

    return ret;
  }


  function randomRange( min, max ) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // 関数実行
  window.setInterval(draw, interval);
  window.setInterval(updateLifeCycle, interval);
}