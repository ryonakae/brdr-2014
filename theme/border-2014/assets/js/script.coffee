$ ->
  'use strict'

  is_pc = !/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test window.navigator.userAgent
  is_iosChrome = navigator.userAgent.match 'CriOS'

  ###
  Set Function Common
  ###
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
  backTop = ->
    $('#js-backtop').click ->
      $('html, body').stop().animate scrollTop : 0, 1000, 'swing'


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
          done: (data, textStatus, XMLHttpRequest) ->
            !$.pjax.getCache this.url && $.pjax.setCache this.url, null, textStatus, XMLHttpRequest
            #console.log 'preload done'


    # pjax
    $.pjax
      area: '#js-pjaxArea'
      wait: 0
      load:
        head: 'base, meta, link'
      cache:
        click: true
        submit: false
        popstate: true
      server:
        query: null
      speedcheck: true
      #fallback: false # middleman server時だとなぜか遷移失敗扱いになるので、fallbackをfalseにして検証する
      fallback: true
      ajax:
        timeout: 5000
      callbacks:
        update:
          content:
            after: ->
              $progressbar.css 'width':'70%'
              # console.log 'content loaded'
          css:
            after: ->
              $progressbar.css 'width':'80%'
              # console.log 'css loaded'
          script:
            after: ->
              $progressbar.css 'width':'90%'
              # console.log 'script loaded'


    ###
    pjax event
    ###
    # 1 fetch
    $(document).on 'pjax:fetch', ->
      # console.log '1 データ取得処理前'
      $progressbar
        .removeClass 'is-hidden'
        .css 'width':'20%'
      # console.log 'progressbar show'

    # 2 unload
    $(window).on 'pjax:unload', ->
      # console.log '2 データの取得後、ページの更新前'
      $progressbar.css 'width':'40%'
      # eventhandler off
      $(window).off 'load'
      $(window).off 'resize'
      $(document).off 'imagesLoades', $('#js-mainvisual-image')

    # 3 DOMContentLoaded
    $(document).on 'pjax:DOMContentLoaded', ->
      # console.log '3 すべての範囲のDOMの更新後(CSSの更新とScriptの実行は未完了)'
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
      # console.log '4 すべてのDOMの更新後'

    # 5 render
    $(document).on 'pjax:render', ->
      # console.log '5 すべての更新範囲の描画後'

      $progressbar.css 'width':'100%'
      setTimeout ->
        $progressbar.addClass 'is-hidden'
      , 300
      # console.log 'progressbar hide'

      # when page-single
      if $('body').hasClass('page-single')
        commonGoogleCodePrettify()
        # console.log 'GoogleCodePrettify done'

        # social button
        # $('.share-twitter > *').replaceWith '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" data-url="' + encodeURI(location.href) + '" data-text="' + document.title + '" data-via="ryo_dg" data-lang="ja" data-related="ryo_dg">ツイート</a>'
        # $('.share-facebook > *').replaceWith '<div class="fb-like" data-href="' + encodeURI(location.href) + '" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>'
        # $('.share-gplus > *').replaceWith '<div class="g-plusone" data-size="medium" data-href="' + encodeURI(location.href) + '"></div>'
        # $('.share-hatena > *').replaceWith '<a href="http://b.hatena.ne.jp/entry/' + encodeURI(location.href) + '" class="hatena-bookmark-button" data-hatena-bookmark-title="' + document.title + '" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>'

        # gapi.plusone.go()
        # twttr.widgets.load()
        # FB.XFBML.parse()
        # Hatena.Bookmark.BookmarkButton.setup()

      # eventhandler on
      _resizeTimer = false
      $(window).on 'resize', ->
        if _resizeTimer != false
          clearTimeout _resizeTimer
        _resizeTimer = setTimeout ->
          if $('body').hasClass('page-index') || $('body').hasClass('single-works')
            indexMainvisualResize()
            indexMainvisualImageResize()
          else
            commonMainvisualImageResize()
        , 200

      if document.getElementById("js-mainvisual") != null
        image = $('#js-mainvisual-image').find('img')

        if is_iosChrome
          image.attr "src", image.attr("src") + "?t=" + (new Date().getTime())
          console.log 'image timestamped'

        if $('body').hasClass('page-index') || $('body').hasClass('single-works')
          indexMainvisualResize()
          $('#js-mainvisual-image').imagesLoaded().done (instance) ->
            indexMainvisualImageResize()
            commonMainvisualShow()
          # console.log 'now:index'
        else
          $('#js-mainvisual-image').imagesLoaded().done (instance) ->
            commonMainvisualImageResize()
            commonMainvisualShow()
          # console.log 'now:other'

    # 6 load
    $(window).on 'pjax:load', ->
      # console.log '6 すべての画像とフレームの読み込み後'


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
    # console.log 'common mainvisual resized'


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
    # console.log 'index mainvisual area resized'

  # index mainvisual resize
  indexMainvisualImageResize = ->
    $('#js-mainvisual-image img').imgResize()
    # console.log 'index mainvisual image resized'


  ###
  Do Function
  ###
  # ready
  # $(document).on 'ready', ->
  setPjax()
  backTop()
  commonglobalNavToggle()
  commonGoogleCodePrettify()

  if document.getElementById("js-mainvisual") != null
    if $('body').hasClass('page-index') || $('body').hasClass('single-works')
      $('#js-mainvisual').boxResize
        parent: $(window)
        scaleHeight: 1


  # load
  if document.getElementById("js-mainvisual") != null
    image = $('#js-mainvisual-image').find('img')

    if is_iosChrome
      image.attr "src", image.attr("src") + "?t=" + (new Date().getTime())
      console.log 'image timestamped'

    if $('body').hasClass('page-index') || $('body').hasClass('single-works')
      indexMainvisualResize()
      $('#js-mainvisual-image').imagesLoaded().done (instance) ->
        indexMainvisualImageResize()
        commonMainvisualShow()
    else
      $('#js-mainvisual-image').imagesLoaded().done (instance) ->
        commonMainvisualImageResize()
        commonMainvisualShow()


  # resize
  if document.getElementById("js-mainvisual") != null
    _resizeTimer = false
    $(window).on 'resize', ->
      if _resizeTimer != false
        clearTimeout _resizeTimer
      _resizeTimer = setTimeout ->
        if $('body').hasClass('page-index') || $('body').hasClass('single-works')
          indexMainvisualResize()
          indexMainvisualImageResize()
        else
          commonMainvisualImageResize()
      , 200