<?php get_header(); ?>

<?php include('util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <?php if (have_posts()) : while (have_posts()) : the_post(); /* エントリー開始 */ ?>

  <?php include('parts-entry-content-works.php'); ?>

  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>