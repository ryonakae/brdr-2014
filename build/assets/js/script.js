(function(){var e=[].indexOf||function(e){for(var n=0,t=this.length;t>n;n++)if(n in this&&this[n]===e)return n;return-1};$(function(){"use strict";var n,t,a,s,i,o,r,u,l,d,c,g;return d=!/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent),l=navigator.userAgent.match("CriOS"),$.fn.imgResize=function(e){var n,t,a,s,i,o,r,u,l,d,c,g;return e=$.extend({parent:$(this).parent()},e),u=$(e.parent).width(),r=$(e.parent).height(),t=$(this),o=t.width(),a=t.height(),d=u/o,l=r/a,n=Math.max(d,l),g=Math.floor(o*n),c=Math.floor(a*n),i=Math.floor((c-r)/-2),s=Math.floor((g-u)/-2),t.css({width:g,height:c,top:i,left:s})},$.fn.boxResize=function(e){var n,t,a,s;return e=$.extend({parent:$(this).parent(),scaleWidth:1,scaleHeight:1},e),t=$(e.parent).width(),n=$(e.parent).height(),s=e.scaleWidth,a=e.scaleHeight,$(this).css({width:t*s,height:n*a})},n=function(){return $("#js-backtop").click(function(){return $("html, body").stop().animate({scrollTop:0},1e3,"swing")})},c=function(){var n;return n=$("#js-progressbar"),d&&$.preload({forward:$.pjax.follow,check:$.pjax.getCache,encode:!0,ajax:{xhr:function(){var t;return t=$.ajaxSettings.xhr(),t instanceof Object&&e.call(t,"onprogress")>=0&&(t.addEventListener("progress",function(e){var t,t=e.total?e.loaded/e.total:.4;return t=90*t+5,n.css({width:t+"%"})},!1),t.addEventListener("load",function(){return n.css({width:"95%"})},!1),t.addEventListener("error",function(){return n.css({"background-color":"#00f"})},!1)),t},success:function(e,n,t){return!$.pjax.getCache(this.url)&&$.pjax.setCache(this.url,null,n,t)},done:function(e,n,t){return!$.pjax.getCache(this.url)&&$.pjax.setCache(this.url,null,n,t)}}}),$.pjax({area:"#js-pjaxArea",wait:0,cache:{click:!0,submit:!1,popstate:!0},server:{query:null},speedcheck:!0,fallback:!1,ajax:{timeout:3e3},callbacks:{update:{content:{after:function(){return n.css({width:"40%"})}},css:{after:function(){return n.css({width:"60%"})}},script:{after:function(){return n.css({width:"80%"})}}}}}),$(document).on("pjax:fetch",function(){return n.css({width:""}),n.removeClass("is-hidden")}),$(window).on("pjax:unload",function(){return $(window).off("load"),$(window).off("resize"),$(document).off("imagesLoades",$("#js-mainvisual-image"))}),$(document).on("pjax:DOMContentLoaded",function(){var e;return e=$("#js-pjaxArea").attr("data-pageclass"),$("body").removeClass().addClass(e),null!==document.getElementById("js-mainvisual")&&$("body").hasClass("page-index")?$("#js-mainvisual").boxResize({parent:$(window),scaleHeight:1}):void 0}),$(document).on("pjax:ready",function(){return $(document).trigger("preload")}),$(document).on("pjax:render",function(){var e;return $("body").hasClass("page-single")&&(t(),g()),n.css({width:"100%"}),setTimeout(function(){return n.addClass("is-hidden")},300),$(window).on("resize",function(){return $("body").hasClass("page-index")||$("body").hasClass("single-works")?(u(),r()):a()}),null!==document.getElementById("js-mainvisual")?(e=$("#js-mainvisual-image").find("img"),l&&(e.attr("src",e.attr("src")+"?t="+(new Date).getTime()),console.log("image timestamped")),$("body").hasClass("page-index")||$("body").hasClass("single-works")?(u(),$("#js-mainvisual-image").imagesLoaded().done(function(){return r(),s()})):$("#js-mainvisual-image").imagesLoaded().done(function(){return a(),s()})):void 0}),$(window).on("pjax:load",function(){})},i=function(){var e;return e=e=d?"click":"touchstart",$("#js-navigation-toggle").on(e,function(){return $("body").toggleClass("is-nav-open")}),$("#js-navigation a").on("click",function(){return $("body").removeClass("is-nav-open")}),$("#js-overlay").on(e,function(){return $("body").hasClass("is-nav-open")?$("body").removeClass("is-nav-open"):void 0})},a=function(){return $("#js-mainvisual-image img").imgResize()},s=function(){return $("#js-mainvisual-image").removeClass("is-hidden"),$("#js-mainvisual-text").delay(1e3).queue(function(){return $(this).removeClass("is-hidden").dequeue()}),$("#js-mainvisual").addClass("is-loaded")},t=function(){return $("pre").addClass("prettyprint"),prettyPrint()},u=function(){return $("#js-mainvisual").boxResize({parent:$(window),scaleHeight:1})},r=function(){return $("#js-mainvisual-image img").imgResize()},g=function(){var e;return e=$("#js-share"),e.sharrre({enableHover:!1,enableCounter:!1,share:{googlePlus:!0,facebook:!0,twitter:!0},buttons:{googlePlus:{size:"medium",lang:"ja",annotation:"bubble"},facebook:{layout:"button_count",lang:"ja_JP"},twitter:{count:"horizontal",lang:"ja"}}})},c(),n(),i(),t(),null!==document.getElementById("js-mainvisual")&&($("body").hasClass("page-index")||$("body").hasClass("single-works"))&&$("#js-mainvisual").boxResize({parent:$(window),scaleHeight:1}),$("body").hasClass("page-single")&&g(),null!==document.getElementById("js-mainvisual")&&(o=$("#js-mainvisual-image").find("img"),l&&(o.attr("src",o.attr("src")+"?t="+(new Date).getTime()),console.log("image timestamped")),$("body").hasClass("page-index")||$("body").hasClass("single-works")?(u(),$("#js-mainvisual-image").imagesLoaded().done(function(){return r(),s()})):$("#js-mainvisual-image").imagesLoaded().done(function(){return a(),s()})),null!==document.getElementById("js-mainvisual")?$(window).on("resize",function(){return $("body").hasClass("page-index")||$("body").hasClass("single-works")?(u(),r()):a()}):void 0})}).call(this);