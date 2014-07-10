#= require core/jquery.min.js
#= require core/jquery.easing.min.js
#= require core/jquery.transit.min.js
#= require_tree .


$ ->
  ###
  Set Function Common
  ###
  # lazyLoad
  $.fn.lazyLoad = ->
    @.each ->
      imgSrc = $(@).attr 'data-src'

      # data-src is true
      if imgSrc != 'undefined' && imgSrc != false
        $(@).attr 'src', imgSrc

      # after load
      $(@)
      .on 'load', ->
        $(@).transition 'opacity' : 1 , 800, ->
          $(@).parent().removeClass 'imgLoading'
      .attr 'src', $(@).attr('src') + '?' + (new Date().getTime())


  # img resize
  $.fn.imgResize = (options) ->
    options = $.extend
      parent : $(@).parent()
      type : 'both' # horizontal, vertical, both
    , options

    parentWidth = $(options.parent).width()
    parentHeight = $(options.parent).height()

    img = $(@)
    imgWidth = img.width()
    imgHeight = img.height()
    scaleWidth = parentWidth / imgWidth
    scaleHeight = parentHeight / imgHeight
    fixScale = Math.max scaleWidth, scaleHeight
    setWidth = Math.floor imgWidth * fixScale
    setHeight = Math.floor imgHeight * fixScale
    imgTop = Math.floor (setHeight - parentHeight) / -2
    imgLeft = Math.floor (setWidth - parentWidth) / -2

    if options.type == 'horizontal'
      img.css
        'width' : setWidth
        'height' : setHeight
        'left' : imgLeft
    else if options.type == 'vertical'
      img.css
        'width' : setWidth
        'height' : setHeight
        'top' : imgTop
    else
      img.css
        'width' : setWidth
        'height' : setHeight
        'top' : imgTop
        'left' : imgLeft


  # box resize
  $.fn.boxResize = (options) ->
    options = $.extend
      parent : $(@).parent()
      scaleWidth : 1
      scaleHeight : 1
    , options

    parentWidth = $(options.parent).width()
    parentHeight = $(options.parent).height()
    scaleWidth = options.scaleWidth
    scaleHeight = options.scaleHeight

    $(@).css
      'width': parentWidth * scaleWidth
      'height': parentHeight * scaleHeight


  # backtop
  $.fn.backTop = ->
    @.click ->
      $('html, body').stop().animate scrollTop : 0, 1000, 'easeInOutCubic'


  # pjax
  setPjax = ->
    # preload
    $.preload
      forward: $.pjax.follow
      check: $.pjax.getCache
      encode: true
      ajax:
        done: (data, textStatus, XMLHttpRequest) ->
          !$.pjax.getCache( this.url ) && $.pjax.setCache( this.url, null, textStatus, XMLHttpRequest )
          console.log 'preload done'

    # pjax
    $.pjax
      area: '#pjaxArea'
      wait: 0
      cache:
        click: true
        submit: false
        popstate: true
      server:
        query: null
      speedcheck: true
      # middleman server時だとなぜか遷移失敗扱いになるので、fallbackをfalseにして検証する
      fallback: false

    # loader
    $(document).on 'pjax.request', ->
      clearTimeout $.data($('div.loading').get(0), 'pjax-effect-id')
      $.data $('div.loading').get(0), 'pjax-effect-id', setTimeout ->
        $('div.loading').fadeIn(100)
      , 1000

    $(document).on 'pjax.render', ->
      clearTimeout $.data($('div.loading').get(0), 'pjax-effect-id')
      $('div.loading').fadeOut(500)
      $.data $('div.loading').get(0), 'pjax-effect-id', 0

    $(document).on 'pjax.rady', ->
      $(document).trigger('preload')

    # pjax event
    $(document).on 'pjax.request', ->
      console.log 'ajaxリクエスト送信前'

    $(document).on 'pjax.render', ->
      console.log 'すべての更新範囲描画後'

    # pageClass = $('#pjaxArea').attr 'data-pageclass'

    # pageclass
    $(document).on 'pjax.DOMContentLoaded', ->
      pageClass = $('#pjaxArea').attr 'data-pageclass'
      $('body').removeClass().addClass pageClass

      console.log pageClass

      if pageClass == 'page-index'
        console.log 'indexなう'

      else if pageClass == 'page-page'
        console.log 'pageなう'


  ###
  Set Function Index
  ###
  indexMainvisualResize = ->
    $('.mainvisual').boxResize
      parent: $(window)
      scaleHeight: 0.5
    console.log 'mainvisual resized'


  ###
  Do Function
  ###
  # ready
  setPjax()
  $('#backtop').backTop()


  # load
  $(window).on 'load', ->


  # resize
  $(window).on 'resize', ->