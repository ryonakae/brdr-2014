<!-- footer -->
<footer class="l-footer">
  <div class="l-container">
    <p class="copyright"><?php bloginfo('description'); ?><br>(C) <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>

    <nav class="personallink">
      <ul>
        <li><a href="https://twitter.com/brdr_slash" target="_blank"><i class="icon-twitter"></i></a></li>
        <li><a href="https://www.facebook.com/brdrslash" target="_blank"><i class="icon-facebook"></i></a></li>
        <li><a href="mailto:me@ryonakae.com" target="_blank"><i class="icon-paper-plane"></i></a></li>
      </ul>
    </nav>
  </div>
</footer>

<!-- backtop -->
<div class="backtop" id="js-backtop">
  <i class="icon-up-open-big"></i>
</div>

<!-- progressbar -->
<div class="progressbar" id="js-progressbar"></div>

<!-- overlay -->
<div class="overlay" id="js-overlay"></div>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-46325777-4', 'auto');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');
</script>
<script src="//apis.google.com/js/platform.js" async defer></script>
<script src="//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0" id="facebook-jssdk" async></script>
<script src="//platform.twitter.com/widgets.js" id="twitter-wjs" async></script>
<script src="//b.st-hatena.com/js/bookmark_button.js" async></script>

<?php wp_footer(); ?>
</body>
</html>