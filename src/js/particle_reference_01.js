(function (a) {
  a(function () {
    flagBrdr = false;
    principlesFlag = true;
    clientsFlag = true;
    var m = a(window)
      .width(),
      x = a(window)
      .height(),
      b = x > 760 ? x : 760,
      f = a("#hello")
      .height(),
      g = a("#principles")
      .height(),
      j = a("#showcase")
      .height(),
      u = a("#clients")
      .height(),
      d = a("#getintouch")
      .height(),
      o = a(".mainvisual")
      .offset(),
      e = a("#hello")
      .offset(),
      k = a("#principles")
      .offset(),
      p = a("#showcase")
      .offset(),
      v = a("#clients")
      .offset(),
      r = a("#getintouch")
      .offset(),
      q = a("#footer")
      .offset();
    a("#header")
      .css({
        height: b
      });
    a(window)
      .on("resize", function () {
        var i = a(window)
          .height();
        a("#header")
          .css({
            height: i
          })
      });
    for (var s = 0; s < 50; s++) {
      var n = ["x1", "x2", "y1", "y2"],
        B = n[Math.floor(Math.random() * n.length)];
      a(".circles")
        .append('<div class="circle-container c' + s + '"><div class="circle i' + s + '"></div></div>');
      a(".c" + s)
        .css({
          animation: "z 5s ." + s + "s linear infinite"
        });
      a(".i" + s)
        .css({
          animation: B + " 7.5s ." + s + "s linear infinite"
        })
    }
    a("a")
      .not("#scrolltop,#navBalloon,#navPos a,.open,[target]")
      .on("click", function () {
        a("#load")
          .removeClass("passive")
      });
    a(window)
      .unload(function () {
        a("#load")
          .fadeOut(700)
      });
    a("#navPosBtn")
      .on("click", function () {
        a(this)
          .toggleClass("active");
        a("#navPos,#mask")
          .toggleClass("active");
        a("#header,#contents,#footer")
          .toggleClass("blur")
      });
    a("#navPos a")
      .on("click", function () {
        var C = a(a(this)
            .attr("href"))
          .offset(),
          i = C.top;
        a("html,body")
          .animate({
            scrollTop: i
          }, 1000, "easeOutExpo");
        a("#navPosBtn,#navPos,#mask")
          .removeClass("active");
        a("#header,#contents,#footer")
          .removeClass("blur");
        return false
      });
    a("#mask")
      .on("click", function () {
        a("#navPosBtn,#navPos,#mask")
          .removeClass("active");
        a("#header,#contents,#footer")
          .removeClass("blur")
      });
    a(window)
      .on("scroll", function () {
        var C = a(window)
          .scrollTop(),
          i = q.top - C - 700;
        if (C > b) {
          a("#navScrollList,#navBalloon,#copyright small")
            .addClass("active")
        } else {
          a("#navScrollList,#navBalloon,#copyright small")
            .removeClass("active")
        } if (C > q.top - 700) {
          a(".leaf-1")
            .css({
              translate: "0px," + -Math.floor(i / 4) + "px"
            });
          a(".fan-1")
            .css({
              translate: "0px," + -Math.floor(i / 8) + "px"
            });
          a(".leaf-2")
            .css({
              translate: "0px," + Math.floor(i / 4) + "px"
            });
          a(".fan-2")
            .css({
              translate: "0px," + Math.floor(i / 8) + "px"
            })
        }
      });
    a("#scrolltop")
      .on("click", function () {
        a("html,body")
          .animate({
            scrollTop: 0
          }, 1000, "easeOutExpo");
        return false
      });
    a(".open")
      .on("click", function () {
        a(a(this)
            .attr("href"))
          .addClass("active");
        a("body")
          .css({
            overflow: "hidden"
          });
        return false
      });
    a(".close")
      .on("click", function () {
        a(".modal")
          .removeClass("active");
        a("body")
          .css({
            overflow: "visible"
          })
      });
    if (a("body")
      .hasClass("home")) {
      a(window)
        .on("scroll", function () {
          var F = a(window)
            .scrollTop(),
            G = Math.floor((F - e.top) / f * 50),
            E = Math.floor((F - k.top) / g * 50),
            H = Math.floor((F - p.top) / j),
            D = Math.floor((F - v.top) / u),
            i = Math.floor((F - r.top) / d);
          if (F > a("#header")
            .height() && flagBrdr == false) {
            window.clearInterval(clearBrdr);
            flagBrdr = true
          } else {
            if (flagBrdr) {
              brdr();
              flagBrdr = false
            }
          } if (F > e.top && F < k.top) {
            a("#navBalloon")
              .css({
                top: G + "px"
              })
          } else {
            if (F > k.top && F < p.top) {
              a("#navBalloon")
                .css({
                  top: G + E + "px"
                })
            } else {
              if (F > p.top && F < v.top) {
                a("#navBalloon")
                  .css({
                    top: G + E + H + "px"
                  })
              } else {
                if (F > v.top && F < r.top) {
                  a("#navBalloon")
                    .css({
                      top: G + E + H + D + "px"
                    })
                } else {
                  if (F > r.top) {
                    a("#navBalloon")
                      .css({
                        top: G + E + H + D + i + "px"
                      })
                  }
                }
              }
            }
          } if (F > e.top - 104 && F < k.top) {
            var C = F - e.top;
            a(".flowr-1")
              .css({
                x: -Math.floor(C / 6),
                rotate: -Math.floor(C)
              });
            a(".flowr-2")
              .css({
                x: Math.floor(C / 6),
                rotate: Math.floor(C)
              });
            a(".flowrL-1")
              .css({
                x: -Math.floor(C / 6),
                rotate: -Math.floor(C / 2)
              });
            a(".flowrL-2")
              .css({
                x: -Math.floor(C / 20),
                rotate: -Math.floor(C)
              });
            a(".flowrL-3")
              .css({
                x: Math.floor(C / 8),
                rotate: Math.floor(C / 2)
              })
          }
          if (F > k.top && principlesFlag) {
            a(".principle")
              .each(function (I) {
                a(this)
                  .children("section")
                  .stop()
                  .delay(I * 240)
                  .transition({
                    x: 0,
                    y: 0
                  }, 700, function () {
                    a(this)
                      .parent(".principle")
                      .addClass("active")
                  })
              });
            principlesFlag = false
          }
          if (F > p.top - j && F < p.top + j) {
            a(".case img")
              .css({
                top: Math.floor((F - p.top - (j / 1.4)) / 2.4) + "px"
              })
          }
          if (F < v.top - u || F > r.top) {
            window.clearInterval(clearDrop);
            clientsFlag = true
          } else {
            if (clientsFlag) {
              setTimeout(doAnim);
              clientsFlag = false
            }
          }
        })
    }
    var l = 0;
    setInterval(function () {
      if (l < -72) {
        l = 0
      }
      l--;
      a("#wave-1")
        .css("background-position", l + "px 0px");
      a("#wave-2")
        .css("background-position", l + 36 + "px 0px");
      a("#waveT-1")
        .css("background-position", -l + "px 0px");
      a("#waveT-2")
        .css("background-position", -l - 36 + "px 0px")
    }, 30);
    a(window)
      .scroll(function () {
        var C = a(window)
          .scrollTop(),
          D = Math.floor((C - e.top) / f * 50);
        if (C > e.top - 104) {
          var i = C - e.top;
          a(".flowr-1")
            .css({
              x: -Math.floor(i / 6),
              rotate: -Math.floor(i)
            });
          a(".flowr-2")
            .css({
              x: Math.floor(i / 6),
              rotate: Math.floor(i)
            });
          a(".flowrL-1")
            .css({
              x: -Math.floor(i / 6),
              rotate: -Math.floor(i / 2)
            });
          a(".flowrL-2")
            .css({
              x: -Math.floor(i / 20),
              rotate: -Math.floor(i)
            });
          a(".flowrL-3")
            .css({
              x: Math.floor(i / 8),
              rotate: Math.floor(i / 2)
            })
        }
      });
    a(".label")
      .each(function () {
        var i = a(this)
          .text();
        a("#" + a(this)
            .attr("for"))
          .val(i)
      });
    a(".input")
      .each(function () {
        a(this)
          .attr("data-title", a(this)
            .val())
      });
    a(".input")
      .focus(function () {
        var i = a(this)
          .val();
        if (a(this)
          .attr("data-title") == i) {
          a(this)
            .val("")
            .parents(".infield")
            .children(".label")
            .addClass("active")
        }
      });
    a(".input")
      .blur(function () {
        if (a(this)
          .val() == "") {
          var i = a(this)
            .parents(".infield")
            .children(".label")
            .text();
          a(this)
            .val(i)
            .parents(".infield")
            .children("label")
            .removeClass("active")
        }
      });
    var A = function (C, i) {
      a.getJSON("http://urls.api.twitter.com/1/urls/count.json?url=" + encodeURI(i) + "&callback=?", function (D) {
        a("#" + C)
          .attr("data-count", D.count)
      })
    };
    var z = function (C, i) {
      if (!C) {
        return
      }
      var D = (i) ? i : location.href;
      a.ajax({
        type: "GET",
        url: "http://graph.facebook.com/" + D,
        dataType: "jsonp",
        success: function (F) {
          var E = (F.shares) ? F.shares : 0;
          a("#" + C)
            .attr("data-count", E)
        }
      })
    };
    A("tw", "http://otsukatomoya.com/");
    z("fb", "http://otsukatomoya.com/");
    var t = true;
    a("#html5,#html5Child")
      .hover(function () {
        a("#html5Child")
          .addClass("active")
      }, function () {
        a("#html5Child")
          .removeClass("active")
      });

    function y(i, C, E, D) {
      setInterval(function () {
        if (C <= E) {
          a(i)
            .html(C);
          C++
        }
      }, D)
    }
    a(window)
      .scroll(function () {
        var C = a(this)
          .scrollTop(),
          i = a("#keywords")
          .offset();
        if (C > i.top && t) {
          y("#since", 0, 512, 10);
          y("#music", 0, 7665, 1);
          y("#website", 0, 5, 500);
          t = false
        }
      })
  })
})(jQuery);

function brdr() {
  var e = document.getElementById("brdr"),
    j = e.getContext("2d"),
    b = window.innerWidth,
    g = window.innerHeight > 760 ? window.innerHeight : 760,
    d = [];
  e.width = b;
  e.height = g;

  for (var f = 0; f < 35; f++) {
    d.push(new k())
  }

  function k() {
    this.location = {
      x: Math.random() * b,
      y: Math.random() * g
    };
    this.radius = 0;
    this.speed = 2;
    this.angle = Math.random() * 360;
    var n = Math.round(Math.random() * 255),
      m = Math.round(Math.random() * 255),
      i = Math.round(Math.random() * 255),
      l = Math.random();
    this.rgba = "rgba(" + n + "," + m + "," + i + "," + l + ")"
  }

  function a() {
    j.globalCompositeOperation = "source-over";
    j.fillStyle = "rgba(41,15,153,0.07)";
    j.fillRect(0, 0, b, g);
    j.globalCompositeOperation = "lighter";
    for (var l = 0; l < d.length; l++) {
      var q = d[l];
      j.fillStyle = "#290f99";
      j.fillRect(q.location.x, q.location.y, q.radius, q.radius);
      for (var t = 0; t < d.length; t++) {
        var o = d[t];
        var r = o.location.y - q.location.y,
          m = o.location.x - q.location.x,
          s = Math.sqrt(m * m + r * r);
        if (s < 200) {
          j.beginPath();
          j.lineWidth = 1;
          j.moveTo(q.location.x, q.location.y);
          j.lineTo(o.location.x, o.location.y);
          j.strokeStyle = q.rgba;
          j.stroke()
        }
      }
      q.location.x = q.location.x + q.speed * Math.cos(q.angle * Math.PI / 180);
      q.location.y = q.location.y + q.speed * Math.sin(q.angle * Math.PI / 180);
      if (q.location.x < 0) {
        q.location.x = b
      }
      if (q.location.x > b) {
        q.location.x = 0
      }
      if (q.location.y < 0) {
        q.location.y = g
      }
      if (q.location.y > g) {
        q.location.y = 0
      }
    }
  }

  clearBrdr = setInterval(a, 33)
}
window.addEventListener("load", brdr, false);
window.addEventListener("resize", brdr);
var start = new Date()
  .getTime(),
  pi = Math.PI,
  twopi = Math.PI * 2,
  c = document.createElement("canvas"),
  ctx = c.getContext("2d"),
  w = window.innerWidth,
  h = 604;
c.setAttribute("width", w);
c.setAttribute("height", h);
c.id = "drop";
c.addEventListener("mousemove", function (j) {
  var d = 0,
    g = 2,
    a = j.x,
    k = j.y;
  while (d < g) {
    var f = (Math.random() * 30 << 0) - 15,
      b = (Math.random() * 30 << 0) - 15;
    points.push(spawnPoint(a + f, k + b));
    d++
  }
});
if (devicePixelRatio && devicePixelRatio == 2) {
  c.width *= 2;
  c.height *= 2;
  c.scale(2, 2)
}
var colors = ["#290f99", "#5e5ba6", "#00debc"],
  points = [];
var Point = function (a, d, b) {
  this.coords = [a, d];
  this.motion = [0, 0];
  this.scaler = 0.99;
  this.scatter = 2.15;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.radius = Math.random() * 25;
  this.theta = Math.random() * twopi;
  this.dead = false
};
Point.prototype.draw = function () {
  this.update();
  ctx.beginPath();
  ctx.arc(this.coords[0], this.coords[1], this.radius, 0, twopi);
  ctx.fillStyle = this.color;
  ctx.fill()
};
Point.prototype.update = function () {
  this.coords[0] += this.motion[0];
  this.coords[1] += this.motion[1];
  this.motion[0] *= this.scaler;
  this.motion[1] *= this.scaler;
  this.theta += (Math.random() * 0.25 - 0.125) * this.scatter;
  this.motion[0] += Math.sin(this.theta) * 0.01;
  this.motion[1] += Math.cos(this.theta) * 0.01;
  this.radius *= this.scaler;
  this.dead = this.radius < 1;
  return this
};
var lineY = Math.floor(h / 2),
  lineX = 0;

function doAnim() {
  ctx.clearRect(0, 0, w, h);
  lineX = lineX > w ? 0 : lineX + 3;
  lineY = (Math.sin(w - lineX / 0.01) * h / 6) + h / 2;
  for (var a = 0; a < 4; a++) {
    points.push(spawnPoint(lineX, lineY))
  }
  for (var a = points.length - 1; a >= 0; a--) {
    var b = points[a];
    b.update();
    if (b.dead) {
      points.splice(a, 1)
    } else {
      b.draw()
    }
  }
  clearDrop = setTimeout(doAnim, 26)
}

function spawnPoint(a, b) {
  a = a || Math.random() * w << 0;
  b = b || Math.random() * h << 0;
  return new Point(a, b, 0)
}
window.onload = function () {
  document.getElementById("clients")
    .appendChild(c)
};
window.addEventListener("resize", function () {
  jsCanvasSnow.resize(window.innerWidth, 604);
  jsCanvasSnow.init("flower", options)
}, false);
window.addEventListener("load", function () {
  var a = {
    amount: 170,
    size: [8, 24],
    rotation: [1, 5],
    speed: [40, 80],
    swing: [0.1, 1],
    amplitude: [30, 50],
    alpha: [0.1, 0.95],
    images: ["http://otsukatomoya.com/admin/wp-content/themes/portfolio_spec_v1.0/img/flowrS.png"]
  };
  jsCanvasSnow.init("flower", a);
  jsCanvasSnow.start()
}, false);

function jsParticle(a, f, d, b, e, i, g) {
  this.origin = a;
  this.position = new Vector2(a.x, a.y);
  this.velocity = f || new Vector2(0, 0);
  this.size = d;
  this.rspeed = e;
  this.amplitude = b;
  this.alpha = i;
  this.image = g;
  this.dx = Math.random() * 100;
  this.rotation = Math.random() * 360;
  this.update = function (j) {
    this.dx += this.velocity.x * j;
    this.position.y += this.velocity.y * j;
    this.position.x = this.origin.x + (this.amplitude * Math.sin(this.dx));
    this.rotation += this.rspeed * j
  }
}
var jsCanvasSnow = {
  canvas: null,
  ctx: null,
  particles: [],
  running: false,
  pImageObjects: [],
  start_time: 0,
  frame_time: 0,
  init: function (a, b) {
    this.canvas = document.getElementById(a);
    this.ctx = this.canvas.getContext("2d");
    this.resize(window.innerWidth, 604);
    this.pAmount = b.amount || 500;
    this.pSize = b.size || [8, 26];
    this.pRotation = b.rotation || [-5, 5];
    this.pSwing = b.swing || [0.1, 1];
    this.pSpeed = b.speed || [40, 100];
    this.pAmplitude = b.amplitude || [20, 50];
    this.pAlpha = b.alpha || [0.25, 1];
    this.pImageNames = b.images || [];
    for (var d = 0; d < this.pImageNames.length; d++) {
      var e = new Image();
      e.src = this.pImageNames[d];
      this.pImageObjects.push(e)
    }
    this._init_particles()
  },
  start: function () {
    this.running = true;
    this.start_time = this.frame_time = microtime();
    this._loop()
  },
  stop: function () {
    this.running = false
  },
  resize: function (a, b) {
    this.canvas.width = a;
    this.canvas.height = b
  },
  _loop: function () {
    if (jsCanvasSnow.running) {
      jsCanvasSnow._clear();
      jsCanvasSnow._update();
      jsCanvasSnow._draw();
      jsCanvasSnow._queue()
    }
  },
  _init_particles: function () {
    this.particles.length = 0;
    for (var e = 0; e < this.pAmount; e++) {
      var a = new Vector2(frand(0, this.canvas.width), frand(-this.canvas.height, 0));
      var g = new Vector2(frand(this.pSwing[0], this.pSwing[1]), frand(this.pSpeed[0], this.pSpeed[1]));
      var d = frand(this.pSize[0], this.pSize[1]);
      var b = frand(this.pAmplitude[0], this.pAmplitude[1]);
      var f = frand(this.pRotation[0], this.pRotation[1]) * ((Math.random() < 0.5) ? -1 : 1);
      var k = frand(this.pAlpha[0], this.pAlpha[1]);
      var j = (this.pImageObjects.length > 0) ? irand(0, this.pImageObjects.length - 1) : -1;
      this.particles.push(new jsParticle(a, g, d, b, f, k, j))
    }
  },
  _update: function () {
    var d = microtime();
    var a = d - this.frame_time;
    for (var b = 0; b < this.particles.length; b++) {
      var e = this.particles[b];
      e.update(a);
      if (e.position.y - e.size > this.canvas.height) {
        e.position.y = -e.size * 2;
        e.position.x = e.origin.x = Math.random() * this.canvas.width
      }
    }
    this.frame_time = d
  },
  _draw: function () {
    this.ctx.fillStyle = "rgb(255,255,255)";
    for (var b = 0; b < this.particles.length; b++) {
      var d = this.particles[b];
      var a = -(d.size / 2);
      this.ctx.save();
      this.ctx.translate(d.position.x, d.position.y);
      this.ctx.rotate(d.rotation);
      this.ctx.globalAlpha = this.particles[b].alpha;
      if (d.image == -1) {
        this.ctx.fillRect(a, a, d.size, d.size)
      } else {
        this.ctx.drawImage(this.pImageObjects[d.image], a, a, d.size, d.size)
      }
      this.ctx.restore()
    }
  },
  _clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  _queue: function () {
    window.requestAnimationFrame(jsCanvasSnow._loop)
  }
};

function microtime() {
  return new Date()
    .getTime() * 0.001
}

function irand(b, a) {
  return Math.floor((b || 0) + Math.random() * ((a + 1 || 100) - (b || 0)))
}

function frand(b, a) {
  return (b || 0) + Math.random() * ((a || 1) - (b || 0))
}

function clamp(d, b, a) {
  return Math.min(Math.max(d, b), a)
}

function Vector2(a, b) {
  this.x = a || 0;
  this.y = b || 0;
  this.add = function (d) {
    this.x += d.x;
    this.y += d.y
  };
  this.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}

function Color(e, d, a) {
  this.r = e || 0;
  this.g = d || 0;
  this.b = a || 0
};