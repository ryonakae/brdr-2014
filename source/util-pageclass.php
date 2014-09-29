<?php
  if ( is_home() ) {
    $pageClass = 'page-index';
  }
  elseif( is_page() ) {
    $pageClass = 'page-page';
  }
  elseif( is_category() ) {
    $pageClass = 'page-archive archive-information';
  }
  elseif ( is_post_type_archive() ) {
    $posttype_slug = esc_html(get_post_type_object(get_post_type())->name);
    $pageClass = 'page-archive archive-' . $posttype_slug;
  }
  elseif( is_single() ) {
    $cat = get_the_category();
    $cat = $cat[0];
    if ( $cat->category_parent ) {
      $cat = get_category($cat->category_parent);
      $cat = $cat->slug;
    }
    else {
      $cat = $cat->slug;
    }
    $pageClass = 'page-single single-' . $cat;
  }
  else {
    $pageClass = '';
  }
?>