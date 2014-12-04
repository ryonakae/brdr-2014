<?php get_header(); ?>

<?php include('partial/util-pageclass.php'); ?>

<!-- content -->
<div class="l-content" id="js-pjaxArea" data-pageClass="<?php echo $pageClass; ?>">
  <?php include('partial/parts-localnavi.php'); ?>

  <?php if (have_posts()) : while (have_posts()) : the_post(); /* エントリー開始 */ ?>
  <!-- main -->
  <div class="l-section">
    <div class="l-container">
      <article class="l-row entry">
        <div class="l-grid-3">
          <aside class="entry-info">
            <dl>
              <dt>Date</dt>
              <dd><time pubdate="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.n.j'); ?></time></dd>

              <dt>Category</dt>
              <dd><?php the_category(', '); ?></dd>

              <dt>Author</dt>
              <dd>by <?php the_author(); ?></dd>
            </dl>
          </aside>
        </div>

        <div class="l-grid-9">
          <header class="entry-header">
            <h1 class="entry-title"><?php the_title(); ?></h1>
          </header>

          <section class="entry-content">
            <?php the_content(); ?>
          </section>

          <footer class="entry-footer">
            <?php include('partial/parts-entry-share.php'); ?>
          </footer>
        </div>
      </article>

      <div class="entry-pager">
        <?php previous_post_link('%link','<i class="icon-angle-left"></i>'); ?>

        <a class="pager-back" href="<?php bloginfo('url'); ?>/information/"><i class="icon-layout"></i></a>

        <?php next_post_link('%link','<i class="icon-angle-right"></i>'); ?>
      </div>
    </div>
  </div>
  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>