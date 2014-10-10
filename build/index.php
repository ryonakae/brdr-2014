<?php get_header(); ?>

<?php include('util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <!-- mainvisual -->
  <section class="mainvisual" id="js-mainvisual">
    <figure class="mainvisual-image is-hidden" id="js-mainvisual-image">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/main.jpg" alt="">
    </figure>

    <div class="mainvisual-text is-hidden" id="js-mainvisual-text">
      <h1 class="mainvisual-title">RYO NAKAE</h1>
      <p class="mainvisual-read">I’m a Web Designer in Japan</p>
      <a href="<?php bloginfo('url'); ?>/about" class="button button-transparent-white">About</a>
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
  </section>

  <!-- works -->
  <section class="l-section section-works">
    <div class="l-container">
      <h1 class="section-title">
        <a href="<?php bloginfo('url'); ?>/works">Works</a>
      </h1>

      <div class="l-row">
        <?php
          $wp_query = new WP_Query();
          $param = array(
            'posts_per_page' => '9',
            'post_type' => 'works',
            'post_status' => 'publish',
            'orderby' => 'date',
            'order' => 'DESC'
          );
          $wp_query->query($param);
          if( $wp_query->have_posts() ) : while( $wp_query->have_posts() ) : $wp_query->the_post();
        ?>

        <div class="l-grid-4">
          <article class="box box-works">
            <figure class="box-image">
              <a href="<?php the_permalink(); ?>">
                <?php if (has_post_thumbnail()) : ?>
                  <?php the_post_thumbnail('thumbnail'); ?>
                <?php else: ?>
                  <img class="noimage" src="<?php echo get_template_directory_uri(); ?>/assets/img/noimg_medium.jpg" alt="noimage">
                <?php endif; ?>
              </a>
            </figure>
            <h1 class="box-title">
              <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h1>
            <p class="box-info">
              <small><time pubdate="<?php the_time('Y-m-d'); ?>"><?php the_time('Y'); ?></time> / <?php echo get_the_term_list($post->ID, 'works-category','',','); ?></small>
            </p>
          </article>
        </div>

        <?php endwhile; wp_reset_postdata(); endif; ?>
      </div>

      <a href="<?php bloginfo('url'); ?>/works" class="button button-default">More</a>
    </div>
  </section>

  <!-- playgrounds -->
  <section class="l-section section-playgrounds">
    <div class="l-container">
      <h1 class="section-title">Playgrounds</h1>

      <div class="l-row">
        <div class="l-grid-4">
          <article class="box box-playgrounds">
            <figure class="box-image">
              <a href="https://dribbble.com/ryo_dg" target="_blank">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/playground_dribbble.svg" alt="Dribbble">
              </a>
            </figure>
            <h1 class="box-title"><a href="https://dribbble.com/ryo_dg" target="_blank">Dribbble</a></h1>
          </article>
        </div>

        <div class="l-grid-4">
          <article class="box box-playgrounds">
            <figure class="box-image">
              <a href="https://jypg.net/ryo_dg" target="_blank">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/playground_jaypeg.svg" alt="JAYPEG">
              </a>
            </figure>
            <h1 class="box-title"><a href="https://jypg.net/ryo_dg" target="_blank">JAYPEG</a></h1>
          </article>
        </div>

        <div class="l-grid-4">
          <article class="box box-playgrounds">
            <figure class="box-image">
              <a href="https://github.com/ryonakae" target="_blank">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/playground_github.svg" alt="GitHub">
              </a>
            </figure>
            <h1 class="box-title"><a href="https://github.com/ryonakae" target="_blank">GitHub</a></h1>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- information -->
  <section class="l-section section-information">
    <div class="l-container">
      <h1 class="section-title">
        <a href="<?php bloginfo('url'); ?>/information">Information</a>
      </h1>

      <div class="l-row">
        <?php
          $wp_query = new WP_Query();
          $param = array(
            'posts_per_page' => '4',
            'post_type' => 'post',
            'post_status' => 'publish',
            'orderby' => 'date',
            'order' => 'DESC'
          );
          $wp_query->query($param);
          if( $wp_query->have_posts() ) : while( $wp_query->have_posts() ) : $wp_query->the_post();
        ?>

        <div class="l-grid-6">
          <article class="box box-information">
            <figure class="box-image">
              <a href="<?php the_permalink(); ?>">
                <?php if (has_post_thumbnail()) : ?>
                  <?php the_post_thumbnail('thumbnail_small'); ?>
                <?php else: ?>
                  <img class="noimage" src="<?php echo get_template_directory_uri(); ?>/assets/img/noimg_small.jpg" alt="noimage">
                <?php endif; ?>
              </a>
            </figure>
            <h1 class="box-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
            <p class="box-read"><?php echo get_the_excerpt(); ?></p>
          </article>
        </div>

        <?php endwhile; wp_reset_postdata(); endif; ?>
      </div>

      <a href="<?php bloginfo('url'); ?>/information" class="button button-default">More</a>
    </div>
  </section>
</div>

<?php get_footer(); ?>