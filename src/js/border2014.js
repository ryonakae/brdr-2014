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
    var worksOffset = jQuery(".l-index-works").offset();
    var worksOffsetY = worksOffset.top;

    var topImage = jQuery(".index-top-image");
    var scroll;
    var topHeight;

    jQuery(".scroll.scroll-down").click(function(){
      jQuery("html,body").animate({ scrollTop : worksOffsetY - 60 }, 1500, "easeInOutQuart");
    });

    jQuery(window).scroll(function(){
      topHeight = jQuery(window).height();
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
    commonLoaderFadeOut();

    jQuery(".logo").delay(1200).queue(function() {
      jQuery(this).addClass("is-shown").dequeue();
    });

    indexTopResize();

    indexTopScrollDown();

    indexBlogArticleResize();

    indexArticleImgResize();

    jQuery(".article").delay(1000).queue(function() {
      jQuery(this).addClass("is-shown").dequeue();
    });
  });


  // resize
  jQuery(window).on("resize", function(){
    indexTopResize();

    indexTopScrollDown();

    indexBlogArticleResize();

    indexArticleImgResize();
  });


});