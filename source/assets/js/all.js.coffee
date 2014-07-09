#= require core/jquery.min.js
#= require core/jquery.easing.min.js
#= require core/jquery.transit.min.js
#= require_tree .


$ ->
  ###
  Set Function
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
      area : $(@).parent()
      type : 'both' # horizontal, vertical, both
    , options

    areaWidth = $(options.area).width()
    areaHeight = $(options.area).height()

    img = $(this)
    imgWidth = img.width()
    imgHeight = img.height()
    scaleWidth = areaWidth / imgWidth
    scaleHeight = areaHeight / imgHeight
    fixScale = Math.max scaleWidth, scaleHeight
    setWidth = Math.floor imgWidth * fixScale
    setHeight = Math.floor imgHeight * fixScale
    imgTop = Math.floor (setHeight - areaHeight) / -2
    imgLeft = Math.floor (setWidth - areaWidth) / -2

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


  # backtop
  backTop = ->
    $('#backTop').click ->
      $('html, body').stop().animate scrollTop : 0, 1000, 'easeInOutCubic'


  ###
  Do Function
  ###
  # ready
  backTop()


  # load
  $(window).on 'load', ->


  # resize
  $(window).on 'resize', ->