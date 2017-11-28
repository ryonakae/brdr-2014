<?php get_header(); ?>

<?php include('partial/util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <?php if (have_posts()) : while (have_posts()) : the_post(); /* エントリー開始 */ ?>

  <?php include('partial/parts-entry-content-works.php'); ?>

  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>