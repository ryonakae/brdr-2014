<?php
/*
Template Name: Default
*/
?>

<?php
  // if ( is_page('contact') && function_exists('wpcf7_enqueue_scripts')) {
  //   wpcf7_enqueue_scripts();
  // }
?>

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
            <?php if( get_field('page-description') ) : ?>
            <dl>
              <dt class="entry-info-subtitle">Description</dt>
              <dd><?php the_field('page-description'); ?></dd>
            </dl>
            <?php endif; ?>
          </aside>
        </dic>

        <div class="l-grid-9">
          <header class="entry-header">
            <h1 class="entry-title"><?php the_title(); ?></h1>
          </header>

          <section class="entry-content">
            <?php the_content(); ?>
          </section>
        </div>
      </div>
    </div>
  </div>

  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>