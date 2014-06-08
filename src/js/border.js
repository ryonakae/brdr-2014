jQuery(function(){
  "use strict";

  jQuery(window).on("load resize", function(){
    var winWidth = jQuery(this).width();
    var winHeight = jQuery(this).height();

    jQuery(".l-index-top").css({
      "width": winWidth,
      "height": winHeight
    });
  });
});