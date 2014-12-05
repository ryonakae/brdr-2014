<?php get_header(); ?>

<?php include('partial/util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <?php include('partial/parts-localnavi.php'); ?>

  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

      <?php include('partial/parts-entry-loop-information.php'); ?>

      <?php endwhile; endif; ?>

      <div class="pager">
        <?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } ?>
      </div>
    </div>
  </div>
</div>

<?php get_footer(); ?>