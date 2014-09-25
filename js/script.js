(function(){var e=[].indexOf||function(e){for(var n=0,t=this.length;t>n;n++)if(n in this&&this[n]===e)return n;return-1};$(function(){"use strict";var n,t,o,s,a,i,r;return i=!/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent),$.fn.lazyLoad=function(){return this.each(function(){var e;return e=$(this).attr("data-src"),"undefined"!==e&&e!==!1&&$(this).attr("src",e),$(this).on("load",function(){return $(this).transition({opacity:1},800,function(){return $(this).parent().removeClass("imgLoading"),$(this).attr("src",$(this).attr("src")+"?"+(new Date).getTime())})})})},$.fn.imgResize=function(e){var n,t,o,s,a,i,r,l,d,c,u,h;return e=$.extend({parent:$(this).parent()},e),l=$(e.parent).width(),r=$(e.parent).height(),t=$(this),i=t.width(),o=t.height(),c=l/i,d=r/o,n=Math.max(c,d),h=Math.floor(i*n),u=Math.floor(o*n),a=Math.floor((u-r)/-2),s=Math.floor((h-l)/-2),t.css({width:h,height:u,top:a,left:s})},$.fn.boxResize=function(e){var n,t,o,s;return e=$.extend({parent:$(this).parent(),scaleWidth:1,scaleHeight:1},e),t=$(e.parent).width(),n=$(e.parent).height(),s=e.scaleWidth,o=e.scaleHeight,$(this).css({width:t*s,height:n*o})},$.fn.backTop=function(){return this.click(function(){return $("html, body").stop().animate({scrollTop:0},1e3,"easeInOutCubic")})},r=function(){var s,r;return r=$("#js-progressbar"),s=$("#js-loader"),i&&$.preload({forward:$.pjax.follow,check:$.pjax.getCache,encode:!0,ajax:{xhr:function(){var n;return n=$.ajaxSettings.xhr(),n instanceof Object&&e.call(n,"onprogress")>=0&&(n.addEventListener("progress",function(e){var n,n=e.total?e.loaded/e.total:.4;return n=90*n+5,r.css({width:n+"%"})},!1),n.addEventListener("load",function(){return r.css({width:"95%"})},!1),n.addEventListener("error",function(){return r.css({"background-color":"#00f"})},!1)),n},success:function(e,n,t){return!$.pjax.getCache(this.url)&&$.pjax.setCache(this.url,null,n,t)},done:function(e,n,t){return!$.pjax.getCache(this.url)&&$.pjax.setCache(this.url,null,n,t),console.log("preload done")}}}),$.pjax({area:"#js-pjaxArea",wait:0,cache:{click:!0,submit:!1,popstate:!0},server:{query:null},speedcheck:!0,fallback:!1,ajax:{timeout:3e3},callbacks:{update:{content:{after:function(){return r.css({width:"40%"}),console.log("content loaded")}},css:{after:function(){return r.css({width:"60%"}),console.log("css loaded")}},script:{after:function(){return r.css({width:"80%"}),console.log("script loaded")}}}}}),$(document).on("pjax:fetch",function(){return r.css({width:""}),console.log("1 データ取得処理前"),r.removeClass("is-hidden"),console.log("progressbar show"),clearTimeout($.data(s.get(0),"pjax-effect-id")),$.data(s.get(0),"pjax-effect-id",setTimeout(function(){return s.removeClass("is-hidden"),console.log("loader show")},1e3))}),$(window).on("pjax:unload",function(){return console.log("2 データの取得後、ページの更新前"),$(window).off("load"),$(window).off("resize"),$(document).off("imagesLoades",$("#js-mainvisual-image"))}),$(document).on("pjax:DOMContentLoaded",function(){var e;return console.log("3 すべての範囲のDOMの更新後(CSSの更新とScriptの実行は未完了)"),e=$("#js-pjaxArea").attr("data-pageclass"),$("body").removeClass().addClass(e),null!==document.getElementById("js-mainvisual")&&$("body").hasClass("page-index")?$("#js-mainvisual").boxResize({parent:$(window),scaleHeight:1}):void 0}),$(document).on("pjax:ready",function(){return $(document).trigger("preload"),console.log("4 すべてのDOMの更新後")}),$(document).on("pjax:render",function(){return console.log("5 すべての更新範囲の描画後"),n(),r.css({width:"100%"}),setTimeout(function(){return r.addClass("is-hidden")},300),console.log("progressbar hide"),clearTimeout($.data(s.get(0),"pjax-effect-id")),s.addClass("is-hidden"),$.data(s.get(0),"pjax-effect-id",0),console.log("loader hide"),$(window).on("resize",function(){return $("body").hasClass("page-index")||$("body").hasClass("single-works")?a():t()}),null!==document.getElementById("js-mainvisual")?$("#js-mainvisual-image").imagesLoaded().done(function(){return o(),$("body").hasClass("page-index")||$("body").hasClass("single-works")?(a(),console.log("now:index")):(t(),console.log("now:other"))}):void 0}),$(window).on("pjax:load",function(){return console.log("6 すべての画像とフレームの読み込み後")})},s=function(){var e;return e=e=i?"click":"touchstart",$("#js-navigation-toggle").on(e,function(){return $("body").toggleClass("is-nav-open")}),$("#js-navigation a").on("click",function(){return $("body").removeClass("is-nav-open")}),$("#js-overlay").on(e,function(){return $("body").hasClass("is-nav-open")?$("body").removeClass("is-nav-open"):void 0})},t=function(){return $("#js-mainvisual-image img").imgResize(),console.log("common mainvisual resized")},o=function(){var e;return e=e=$("body").hasClass("single-works")?.7:.9,$("#js-mainvisual-image").removeClass("is-hidden"),$("#js-mainvisual-text").delay(1e3).queue(function(){return $(this).removeClass("is-hidden").dequeue()}),$("#js-mainvisual").addClass("is-loaded")},n=function(){return $("pre").addClass("prettyprint"),prettyPrint()},a=function(){return $("#js-mainvisual").boxResize({parent:$(window),scaleHeight:1}),$("#js-mainvisual-image img").imgResize(),console.log("index mainvisual resized")},r(),$("#js-backtop").backTop(),s(),n(),null!==document.getElementById("js-mainvisual")&&($("body").hasClass("page-index")||$("body").hasClass("single-works"))&&$("#js-mainvisual").boxResize({parent:$(window),scaleHeight:1}),null!==document.getElementById("js-mainvisual")&&$("#js-mainvisual-image").imagesLoaded().done(function(){return $("body").hasClass("page-index")||$("body").hasClass("single-works")?a():t(),o()}),null!==document.getElementById("js-mainvisual")?$(window).on("resize",function(){return $("body").hasClass("page-index")||$("body").hasClass("single-works")?a():t()}):void 0})}).call(this);