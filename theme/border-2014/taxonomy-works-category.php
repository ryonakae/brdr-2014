<?php get_header(); ?>

<?php include('partial/util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <nav class="localnavi">
    <ul>
      <?php
        wp_list_categories(array(
          'title_li' => '',
          'taxonomy' => 'works-category'
        ));
      ?>
    </ul>
  </nav>

  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <?php if ( have_posts() ) : ?>
      <div class="l-row">

        <?php while ( have_posts() ) : the_post(); ?>
        <?php include('partial/parts-entry-loop-works.php'); ?>
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