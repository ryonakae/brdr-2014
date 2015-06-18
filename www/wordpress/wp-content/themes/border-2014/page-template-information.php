<?php
/*
Template Name: Informaton
*/
?>

<?php get_header(); ?>

<?php include('partial/util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <?php include('partial/parts-localnavi.php'); ?>

  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <?php
        $paged = null;
        if (get_query_var('paged')) {
          $paged = get_query_var('paged');
        }
        else {
          $paged = 1;
        }
        $wp_query = new WP_Query();
        $param = array(
          'posts_per_page' => '5',
          'post_type' => 'post',
          'post_status' => 'publish',
          'orderby' => 'date',
          'order' => 'DESC',
          'paged' => $paged
        );
        $wp_query->query($param);
        if( $wp_query->have_posts() ) : while( $wp_query->have_posts() ) : $wp_query->the_post();

        // the_content()のmoreを機能させる
        global $more; $more=false;
      ?>

      <?php include('partial/parts-entry-loop-information.php'); ?>

      <?php endwhile; wp_reset_postdata(); endif; ?>

      <div class="pager">
        <?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } ?>
      </div>
    </div>
  </div>
</div>

<?php get_footer(); ?>