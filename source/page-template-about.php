<?php
/*
Template Name: About
*/
?>

<?php get_header(); ?>

<?php include('util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="page-page">
  <!-- main-visual -->
  <div class="mainvisual" id="js-mainvisual">
    <figure class="mainvisual-image is-hidden" id="js-mainvisual-image">
      <img src="https://farm8.staticflickr.com/7390/12534523893_de31ce5613_k.jpg" alt="">
    </figure>

    <div class="mainvisual-loader">
      <div class="loader-square square-1">
        <div class="square-inner"></div>
      </div>
      <div class="loader-square square-2">
        <div class="square-inner"></div>
      </div>
      <div class="loader-square square-3">
        <div class="square-inner"></div>
      </div>
      <div class="loader-square square-4">
        <div class="square-inner"></div>
      </div>
    </div>
  </div>

  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <div class="l-row">
        <dic class="l-grid-3">
          <aside class="entry-info">
            <dl>
              <dt class="entry-info-subtitle">Author</dt>
              <dd>by RYO NAKAE</dd>
            </dl>
          </aside>
        </dic>

        <div class="l-grid-9">
          <header class="entry-header">
            <h1 class="entry-title">About</h1>
          </header>

          <section class="entry-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa debitis cumque facilis, tempora rerum necessitatibus ullam. Perspiciatis corporis iusto perferendis, excepturi minima repudiandae ipsa non possimus! Labore quam aliquam, perferendis.</p>
            <p>Border/ is my portfolio, blog, diary, memo pad, photo album, etc.<br>Powerd by WordPress.</p>
            <p>Border/ is my portfolio, blog, diary, memo pad, photo album, etc.<br>Powerd by WordPress.</p>
            <p><strong>Border/ is my portfolio, blog, diary, memo pad, photo album, etc.<br>Powerd by WordPress.</strong></p>

            <h2>RYO NAKAE / 中江 亮</h2>
            <p>I’m a Web Designer in Kyoto, Japan.</p>

            <hr>

            <h3>Contact me</h3>
            <p>Please contact me.</p>
            <ul>
              <li><a href="">Facebook</a></li>
              <li><a href="">Twitter</a></li>
              <li><a href="">Dribbble</a></li>
              <li><a href="" target="_blank">JAYPEG</a></li>
            </ul>
          </section>

          <footer class="entry-footer">
            footer
          </footer>
        </div>
      </div>
    </div>
  </div>
</div>

<?php get_footer(); ?>