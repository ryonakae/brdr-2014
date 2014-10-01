<?php get_header(); ?>

<?php include('util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <?php if (have_posts()) : while (have_posts()) : the_post(); /* エントリー開始 */ ?>

  <!-- main-visual -->
  <div class="mainvisual" id="js-mainvisual">
    <figure class="mainvisual-image is-hidden" id="js-mainvisual-image">
      <?php the_post_thumbnail('large'); ?>
    </figure>

    <div class="mainvisual-text is-hidden" id="js-mainvisual-text">
      <h1 class="mainvisual-title"><?php the_title(); ?></h1>
      <p class="mainvisual-read"><time pubdate="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.n'); ?></time> / <?php echo get_the_term_list($post->ID, 'works-category','',','); ?></p>
    </div>

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
      <article class="l-row entry">
        <div class="l-grid-3">
          <aside class="entry-info">
            <h1 class="entry-link">
              <a href="" target="_blank"><?php the_title(); ?></a>
            </h1>

            <section>
              <h1 class="entry-info-title">Release</h1>
              <p>2013.11</p>
            </section>

            <section>
              <h1 class="entry-info-title">Credit</h1>
              <dl>
                <dt>Art Direction</dt>
                <dd>RYO NAKAE</dd>

                <dt>Design</dt>
                <dd>RYO NAKAE</dd>

                <dt>Markup</dt>
                <dd>RYO NAKAE</dd>
              </dl>
            </section>

            <section>
              <h1 class="entry-info-title">Technology</h1>
              <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>Responsive</li>
                <li>Web Font</li>
                <li>SVG</li>
              </ul>
            </section>
          </aside>
        </div>

        <div class="l-grid-9">
          <section class="entry-content">
            <?php the_content(); ?>

            <?php if( get_field('works-imagelist') ) : ?>
            <div class="entry-imagelist">
              <ul>
                <?php while( the_repeater_field('works-imagelist') ) : ?>
                  <?php
                    if( get_sub_field('works-image') ) :
                    $attachment_id = get_sub_field('works-image');
                    $image = wp_get_attachment_image_src($attachment_id, 'medium');
                    $img_src = $image[0];
                    $img_width = $image[1];
                    $img_height = $image[2];
                  ?>
                  <li class="imagelist-image">
                    <figure class="img">
                      <img src="<?php echo $img_src; ?>" width="<?php echo $img_width; ?>" height="<?php echo $img_height; ?>" alt="">
                    </figure>
                  </li>
                  <?php endif; ?>
                <?php endwhile; ?>
              </ul>
            </div>
            <?php endif; ?>
          </section>

          <footer class="entry-footer">
            footer
          </footer>
        </div>
      </article>

      <div class="entry-pager">
        <a class="pager-prev"><i class="icon-angle-left"></i></a>
        <a class="pager-back"><i class="icon-layout"></i></a>
        <a class="pager-next"><i class="icon-angle-right"></i></a>
      </div>
    </div>
  </div>

  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>