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

    commonLogoShowHover();

    indexChangeColor();

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
    indexChangeColor();

    indexTopResize();

    indexTopScrollDown();

    indexBlogArticleResize();

    indexArticleImgResize();
  });


  jQuery(window).on("load resize", function(){
    jQuery(".index-top-particle").attr("width", winWidth).attr("height", winHeight);
  });

});