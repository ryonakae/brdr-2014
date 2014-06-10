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
    options = $.extend({
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


  // index top resize
  function index_top_resize() {
    jQuery(".l-index-top").css({
      "width": winWidth,
      "height": winHeight
    })
    .children(".index-top-image").imgResize();
  };


  jQuery(window).on("load", function(){
    jQuery(".logo").addClass("is-shown");

    index_top_resize();

    jQuery(".index-top-image").transition({"opacity" : 1}, 1000);
  });


  jQuery(window).on("resize", function(){
    index_top_resize();
  });


});