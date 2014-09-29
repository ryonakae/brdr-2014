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
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

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
            <h1 class="entry-title">
              <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h1>
          </header>

          <section class="entry-content">
            <?php the_content('More'); ?>
          </section>
        </div>
      </article>

      <?php endwhile; endif; ?>

      <div class="pager">
        <?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } ?>
      </div>
    </div>
  </div>
</div>

<?php get_footer(); ?>