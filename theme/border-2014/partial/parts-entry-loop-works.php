<div class="l-grid-4">
  <article class="entry box box-works">
    <figure class="box-image">
      <a href="<?php the_permalink(); ?>">
        <?php if (has_post_thumbnail()) : ?>
          <?php the_post_thumbnail('thumbnail'); ?>
        <?php else: ?>
          <img class="noimage" src="<?php echo get_template_directory_uri(); ?>/assets/img/noimg_medium.jpg" alt="noimage" width="320" height="320">
        <?php endif; ?>
      </a>
    </figure>
    <h1 class="box-title">
      <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    </h1>
    <p class="box-info">
      <?php $catlist = get_the_term_list($post->ID, 'works-category','',','); ?>
      <small><time pubdate="<?php the_time('Y-m-d'); ?>"><?php the_time('Y'); ?></time><?php if ( !empty($catlist) ) { echo ' / '.$catlist; } ?></small>
    </p>
  </article>
</div>