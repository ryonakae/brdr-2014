$ ->
  'use strict'

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
      $(@).on 'load', ->
        $(@).transition 'opacity' : 1 , 800, ->
          $(@).parent().removeClass 'imgLoading'
          $(@).attr 'src', $(@).attr('src') + '?' + (new Date().getTime())


  # img resize
  $.fn.imgResize = (options) ->
    options = $.extend
      parent : $(@).parent()
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
    $progressbar = $('#js-progressbar')


    # preload
    $.preload
      forward: $.pjax.follow
      check: $.pjax.getCache
      encode: true
      ajax:
        xhr: ->
          xhr = $.ajaxSettings.xhr()
          # $progressbar.css 'width':'5%'
          if xhr instanceof Object && 'onprogress' in xhr
            xhr.addEventListener 'progress', (event) ->
              `var percentage = event.total ? event.loaded / event.total : 0.4`
              percentage = percentage * 90 + 5
              $progressbar.css 'width':percentage + '%'
            , false
            xhr.addEventListener 'load', (event) ->
              $progressbar.css 'width':'95%'
            , false
            xhr.addEventListener 'error', (event) ->
              $progressbar.css 'background-color':'#00f'
            , false
          return xhr
        success: (data, textStatus, XMLHttpRequest) ->
          !$.pjax.getCache( this.url ) && $.pjax.setCache( this.url, null, textStatus, XMLHttpRequest )
        done: (data, textStatus, XMLHttpRequest) ->
          !$.pjax.getCache( this.url ) && $.pjax.setCache( this.url, null, textStatus, XMLHttpRequest )
          console.log 'preload done'


    # pjax
    $.pjax
      area: '#js-pjaxArea'
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
      ajax:
        timeout: 3000
      callbacks:
        update:
          content:
            after: ->
              $progressbar.css 'width':'40%'
              console.log 'content loaded'
          css:
            after: ->
              $progressbar.css 'width':'60%'
              console.log 'css loaded'
          script:
            after: ->
              $progressbar.css 'width':'80%'
              console.log 'script loaded'

    $(document).on 'pjax:fetch', ->
      $progressbar.css 'width':''
      $progressbar.removeClass 'is-hidden'
      console.log 'load started'

    $(document).on 'pjax:render', ->
      $progressbar.css 'width':'100%'
      setTimeout ->
        $progressbar.addClass 'is-hidden'
      , 300
      console.log 'load complete'

    # loader
    $loader = $('#js-loader')

    $(document).on 'pjax.request', ->
      clearTimeout $.data($loader.get(0), 'pjax-effect-id')
      $.data $loader.get(0), 'pjax-effect-id', setTimeout ->
        $loader.fadeIn(100)
      , 1000

    $(document).on 'pjax.render', ->
      clearTimeout $.data($loader.get(0), 'pjax-effect-id')
      $loader.fadeOut(500)
      $.data $loader.get(0), 'pjax-effect-id', 0

    $(document).on 'pjax.rady', ->
      $(document).trigger('preload')


    ###
    pjax event
    ###
    # before pjax
    $(document).on 'pjax.request', ->
      console.log '1 ajaxリクエスト送信前'
      # 多分Preloadのおかげでここスキップされてる

    $(window).on 'pjax.unload', ->
      console.log '2 ajaxリクエスト更新前'
      # eventhandler off
      $(window).off 'load'
      $(window).off 'resize'
      $(document).off 'imagesLoades', $('#js-mainvisual-image')

    # after reload DOM set pageclass
    $(document).on 'pjax.DOMContentLoaded', ->
      console.log '3 すべての更新範囲更新後'
      pageClass = $('#js-pjaxArea').attr 'data-pageclass'
      $('body').removeClass().addClass pageClass

      # mainvisual resize
      if document.getElementById("js-mainvisual") != null
        if $('body').hasClass('page-index')
          $('#js-mainvisual').boxResize
            parent: $(window)
            scaleHeight: 1

    # after render DOM
    $(document).on 'pjax.render', ->
      console.log '4 すべての更新範囲描画後'

      commonGoogleCodePrettify()

      # eventhandler on
      $(window).on 'resize', ->
        if $('body').hasClass('page-index')
          indexMainvisualResize()
        else
          commonMainvisualResize()

      if document.getElementById("js-mainvisual") != null
        $('#js-mainvisual-image').imagesLoaded().done (instance) ->
          commonMainvisualShow()

          if $('body').hasClass('page-index')
            indexMainvisualResize()
            console.log 'now:index'
          else
            commonMainvisualResize()
            console.log 'now:other'


  # common global navigation toggle
  commonglobalNavToggle = ->
    $('#js-navigation-toggle').on 'click', ->
      $('body').toggleClass('is-nav-open')

    $('#js-navigation a, #js-overlay').on 'click', ->
      if $('body').hasClass('is-nav-open')
        $('body').removeClass('is-nav-open')


  # common mainvisual resize
  commonMainvisualResize = ->
    $('#js-mainvisual-image img').imgResize()
    console.log 'common mainvisual resized'


  # common mainvisual show
  commonMainvisualShow = ->
    $('#js-mainvisual-image').transition
      'opacity': 1
      'visibility': 'visible'
    , 800, ->
      $('#js-mainvisual-text').removeClass 'is-hidden'

    $('#js-mainvisual').addClass('is-loaded')


  # common google code prettify
  commonGoogleCodePrettify = ->
    $('pre').addClass 'prettyprint'
    prettyPrint()


  # index mainvisual resize
  indexMainvisualResize = ->
    $('#js-mainvisual').boxResize
      parent: $(window)
      scaleHeight: 1
    $('#js-mainvisual-image img').imgResize()
    console.log 'index mainvisual resized'


  ###
  Do Function
  ###
  # ready
  # $(document).on 'ready', ->
  setPjax()
  $('#js-backtop').backTop()
  commonglobalNavToggle()
  commonGoogleCodePrettify()

  if document.getElementById("js-mainvisual") != null
    if $('body').hasClass('page-index')
      $('#js-mainvisual').boxResize
        parent: $(window)
        scaleHeight: 1


  # load
  if document.getElementById("js-mainvisual") != null
    $('#js-mainvisual-image').imagesLoaded().done (instance) ->
      if $('body').hasClass('page-index')
        indexMainvisualResize()
      else
        commonMainvisualResize()
      commonMainvisualShow()
  else
    #$(window).on 'load', ->


  # resize
  $(window).on 'resize', ->
    if $('body').hasClass('page-index')
      indexMainvisualResize()
    else
      commonMainvisualResize()