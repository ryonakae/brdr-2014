<nav class="localnavi">
  <ul>
    <?php
      $cats = get_categories();
      foreach ( $cats as $cat ) :
    ?>
    <li>
      <a href="<?php echo get_category_link($cat->cat_ID); ?>">
        <?php echo get_cat_name($cat->cat_ID); ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ul>
</nav>