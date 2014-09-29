$ ->
  'use strict'

  is_pc = !/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent)

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
        $(@).animate 'opacity' : 1 , 800, ->
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
    if is_pc
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
      fallback: false # middleman server時だとなぜか遷移失敗扱いになるので、fallbackをfalseにして検証する
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


    ###
    pjax event
    ###
    # 1 fetch
    $(document).on 'pjax:fetch', ->
      $progressbar.css 'width':''
      console.log '1 データ取得処理前'

      $progressbar.removeClass 'is-hidden'
      console.log 'progressbar show'

    # 2 unload
    $(window).on 'pjax:unload', ->
      console.log '2 データの取得後、ページの更新前'
      # eventhandler off
      $(window).off 'load'
      $(window).off 'resize'
      $(document).off 'imagesLoades', $('#js-mainvisual-image')

    # 3 DOMContentLoaded
    $(document).on 'pjax:DOMContentLoaded', ->
      console.log '3 すべての範囲のDOMの更新後(CSSの更新とScriptの実行は未完了)'
      pageClass = $('#js-pjaxArea').attr 'data-pageclass'
      $('body').removeClass().addClass pageClass

      # mainvisual resize
      if document.getElementById("js-mainvisual") != null
        if $('body').hasClass('page-index')
          $('#js-mainvisual').boxResize
            parent: $(window)
            scaleHeight: 1

    # 4 ready
    $(document).on 'pjax:ready', ->
      $(document).trigger('preload')
      console.log '4 すべてのDOMの更新後'

    # 5 render
    $(document).on 'pjax:render', ->
      console.log '5 すべての更新範囲の描画後'

      if $('body').hasClass('page-single')
        commonGoogleCodePrettify()
        console.log 'GoogleCodePrettify done'

      $progressbar.css 'width':'100%'
      setTimeout ->
        $progressbar.addClass 'is-hidden'
      , 300
      console.log 'progressbar hide'

      # eventhandler on
      $(window).on 'resize', ->
        if $('body').hasClass('page-index') || $('body').hasClass('single-works')
          indexMainvisualResize()
          indexMainvisualImageResize()
        else
          commonMainvisualImageResize()

      if document.getElementById("js-mainvisual") != null
        if $('body').hasClass('page-index') || $('body').hasClass('single-works')
          indexMainvisualResize()

        $('#js-mainvisual-image').imagesLoaded().done (instance) ->
          commonMainvisualShow()

          if $('body').hasClass('page-index') || $('body').hasClass('single-works')
            indexMainvisualImageResize()
            console.log 'now:index'
          else
            commonMainvisualImageResize()
            console.log 'now:other'

    # 6 load
    $(window).on 'pjax:load', ->
      console.log '6 すべての画像とフレームの読み込み後'


  # common global navigation toggle
  commonglobalNavToggle = ->
    event =

    if is_pc
      event = 'click'
    else
      event = 'touchstart'

    $('#js-navigation-toggle').on event, ->
      $('body').toggleClass('is-nav-open')

    $('#js-navigation a').on 'click', ->
      $('body').removeClass('is-nav-open')

    $('#js-overlay').on event, ->
      if $('body').hasClass('is-nav-open')
        $('body').removeClass('is-nav-open')


  # common mainvisual resize
  commonMainvisualImageResize = ->
    $('#js-mainvisual-image img').imgResize()
    console.log 'common mainvisual resized'


  # common mainvisual show
  commonMainvisualShow = ->
    $('#js-mainvisual-image').removeClass 'is-hidden'
    $('#js-mainvisual-text').delay(1000).queue ->
      $(@).removeClass('is-hidden').dequeue()

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
    console.log 'index mainvisual area resized'

  # index mainvisual resize
  indexMainvisualImageResize = ->
    $('#js-mainvisual-image img').imgResize()
    console.log 'index mainvisual image resized'


  ###
  Do Function
  ###
  # ready
  # $(document).on 'ready', ->
  setPjax()
  $('#js-contentloader').addClass 'is-hidden'

  $('#js-backtop').backTop()
  commonglobalNavToggle()
  commonGoogleCodePrettify()

  if document.getElementById("js-mainvisual") != null
    if $('body').hasClass('page-index') || $('body').hasClass('single-works')
      $('#js-mainvisual').boxResize
        parent: $(window)
        scaleHeight: 1


  # load
  if document.getElementById("js-mainvisual") != null
    $('#js-mainvisual-image').imagesLoaded().done (instance) ->
      if $('body').hasClass('page-index') || $('body').hasClass('single-works')
        indexMainvisualResize()
        indexMainvisualImageResize()
      else
        commonMainvisualImageResize()
      commonMainvisualShow()


  # resize
  if document.getElementById("js-mainvisual") != null
    $(window).on 'resize', ->
      if $('body').hasClass('page-index') || $('body').hasClass('single-works')
        indexMainvisualResize()
        indexMainvisualImageResize()
      else
        commonMainvisualImageResize()