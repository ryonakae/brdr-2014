<?php get_header(); ?>

<?php include('util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <nav class="localnavi">
    <ul>
      <li><a href="">Information</a></li>
      <li><a href="">Design</a></li>
      <li><a href="">Other</a></li>
    </ul>
  </nav>

  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <?php if ( have_posts() ) : ?>
      <div class="l-row">

        <?php while ( have_posts() ) : the_post(); ?>
        <div class="l-grid-4">
          <article class="entry box box-works">
            <figure class="box-image">
              <a href="<?php the_permalink(); ?>">
                <?php if (has_post_thumbnail()) : ?>
                  <?php the_post_thumbnail('square_medium'); ?>
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
        <?php endwhile; ?>

        </div>
      <?php endif; ?>

      <div class="pager">
        <?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } ?>
      </div>
    </div>
  </div>
</div>

<?php get_footer(); ?>