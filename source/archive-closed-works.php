<?php
  if ( !is_user_logged_in() ){
    auth_redirect();
  }
?>

<?php get_header(); ?>

<?php include('util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <?php if ( have_posts() ) : ?>
      <div class="l-row">

        <?php while ( have_posts() ) : the_post(); ?>
        <?php include('parts-entry-loop-works.php'); ?>
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