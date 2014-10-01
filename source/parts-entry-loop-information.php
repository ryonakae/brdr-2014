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