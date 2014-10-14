<!-- main-visual -->
<div class="mainvisual" id="js-mainvisual">
  <figure class="mainvisual-image is-hidden" id="js-mainvisual-image">
    <?php the_post_thumbnail('large'); ?>
  </figure>

  <div class="mainvisual-text is-hidden" id="js-mainvisual-text">
    <h1 class="mainvisual-title"><?php the_title(); ?></h1>
    <?php if ( get_post_type() == 'works' ) : ?>
      <p class="mainvisual-read"><time pubdate="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.n'); ?></time> / <?php echo get_the_term_list($post->ID, 'works-category','',','); ?></p>
    <?php else : ?>
      <p class="mainvisual-read"><time pubdate="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.n'); ?></time></p>
    <?php endif; ?>
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
          <?php if( get_field('works-url') ) : ?>
            <h1 class="entry-link">
              <a href="<?php the_field('works-url',$post->ID); ?>" target="_blank"><?php the_title(); ?></a>
            </h1>
          <?php else : ?>
            <h1 class="entry-link">
              <?php the_title(); ?>
            </h1>
          <?php endif; ?>

          <section>
            <h1 class="entry-info-title">Release</h1>
            <p><time pubdate="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.n'); ?></time></p>
          </section>

          <?php if ( get_post_type() == 'works' ) : ?>
          <section>
            <h1 class="entry-info-title">Category</h1>
            <p><?php echo get_the_term_list($post->ID, 'works-category','',','); ?></p>
          </section>
          <?php endif; ?>

          <?php if( get_field('works-credit') ) : ?>
          <section>
            <h1 class="entry-info-title">Credit</h1>
            <dl>
              <?php while( the_repeater_field('works-credit') ) : ?>
              <dt><?php the_sub_field('works-credit-title',$post->ID); ?></dt>
              <dd><?php the_sub_field('works-credit-name',$post->ID); ?></dd>
              <?php endwhile; ?>
            </dl>
          </section>
          <?php endif; ?>

          <?php if( get_field('works-technology') ) : ?>
          <section>
            <h1 class="entry-info-title">Technology</h1>
            <ul>
              <?php
                $field = get_field_object('works-technology');
                $technologies = get_field('works-technology');
                foreach ($technologies as $technology) :
              ?>
              <li><?php echo $field['choices'][$technology]; ?></li>
            <?php endforeach; ?>
            </ul>
          </section>
          <?php endif; ?>

          <?php if( get_field('works-tool') ) : ?>
          <section>
            <h1 class="entry-info-title">Tool</h1>
            <ul>
              <?php
                $field = get_field_object('works-tool');
                $tools = get_field('works-tool');
                foreach ($tools as $tool) :
              ?>
              <li><?php echo $field['choices'][$tool]; ?></li>
            <?php endforeach; ?>
            </ul>
          </section>
          <?php endif; ?>
        </aside>
      </div>

      <div class="l-grid-9">
        <section class="entry-content">
          <?php the_content(); ?>

          <?php if( get_field('works-imagelist') ) : ?>
          <div class="entry-imagelist">
            <ul>
              <?php
                while( the_repeater_field('works-imagelist') ) :
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
              <?php endif; endwhile; ?>
            </ul>
          </div>
          <?php endif; ?>
        </section>

        <?php if ( get_post_type() == 'works' ) : ?>
        <footer class="entry-footer">
          <?php include('parts-entry-share.php'); ?>
        </footer>
        <?php endif; ?>
      </div>
    </article>

    <div class="entry-pager">
      <?php
        if(function_exists('previous_post_link_plus')) {
          previous_post_link_plus(array('format' => '%link', 'link' => '<i class="icon-angle-left"></i>'));
        }
      ?>

      <a class="pager-back" href="<?php bloginfo('url'); ?>/<?php echo get_post_type(); ?>"><i class="icon-layout"></i></a>

      <?php
        if(function_exists('next_post_link_plus')) {
          next_post_link_plus(array('format' => '%link', 'link' => '<i class="icon-angle-right"></i>'));
        }
      ?>
    </div>
  </div>
</div>