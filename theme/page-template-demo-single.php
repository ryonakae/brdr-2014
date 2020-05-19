<?php
/*
Template Name: Demo Single
*/
?>

<?php get_header(); ?>

<?php include('partial/util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <?php if (have_posts()) : while (have_posts()) : the_post(); /* エントリー開始 */ ?>

  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <div class="l-row">
        <dic class="l-grid-3">
          <aside class="entry-info">
            <dl>
              <?php if( get_field('page-description') ) : ?>
                <dt class="entry-info-subtitle">Description</dt>
                <dd><?php the_field('page-description'); ?></dd>
              <?php endif; ?>
              <dt>Last Modified</dt>
              <dd><time pubdate="<?php the_modified_date('Y-m-d'); ?>"><?php the_modified_date('Y.n.j'); ?></time></dd>
              <?php if( get_field('demo-originalPost') ) : ?>
                <dt class="entry-info-subtitle">Original Post</dt>
                <dd>
                  <?php
                    $obj = get_field('demo-originalPost');
                    $obj_title = get_the_title($obj->ID);
                    $obj_url = get_permalink($obj->ID);
                    echo '<a href="'.$obj_url.'">'.$obj_title.'</a>';
                  ?>
                </dd>
              <?php endif; ?>
            </dl>
          </aside>
        </dic>

        <div class="l-grid-9">
          <header class="entry-header">
            <h1 class="entry-title"><?php the_title(); ?></h1>
          </header>

          <section class="entry-content">
            <?php if( get_field('demo-js') ) : ?>
              <!-- Script -->
              <script src="<?php the_field('demo-js'); ?>"></script>
            <?php endif; ?>
            <?php if( get_field('demo-js-inline') ) : ?>
              <!-- Script(inline) -->
              <script><?php the_field('demo-js-inline'); ?></script>
            <?php endif; ?>
            <?php if( get_field('demo-css') ) : ?>
              <!-- CSS -->
              <style scoped><?php the_field('demo-css'); ?></style>
            <?php endif; ?>
            <?php
              if( get_field('demo-html') ) {
                echo '<!-- HTML -->';
                the_field('demo-html');
              }
            ?>
          </section>
        </div>
      </div>
    </div>
  </div>

  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>