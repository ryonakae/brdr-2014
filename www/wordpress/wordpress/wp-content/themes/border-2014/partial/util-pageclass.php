<?php
  $demo_id = '';
  if ( get_page_by_path('demo') ) {
    $demo_id = get_page_by_path('demo');
    $demo_id = $demo_id->ID;
  }

  if ( is_home() ) {
    $pageClass = 'page-index';
  }
  elseif( is_page() && !is_page('information') ) {
    if( is_page('demo') || $post->post_parent == $demo_id ) {
      $pageClass = 'page-page page-demo';
    }
    else {
      $pageClass = 'page-page';
    }
  }
  elseif( is_category() || is_page('information') ) {
    $pageClass = 'page-archive archive-information';
  }
  elseif ( is_post_type_archive() || is_tax() ) {
    $posttype_slug = esc_html(get_post_type_object(get_post_type())->name);
    $pageClass = 'page-archive archive-' . $posttype_slug;
  }
  elseif ( is_single() ) {
    if ( get_post_type() == 'post' ) {
      // $cat = get_the_category();
      // $cat = $cat[0];
      // $pageClass = 'page-single single-' . $cat->category_nicename;
      $pageClass = 'page-single single-information';
    }
    else {
      $posttype_slug = esc_html(get_post_type_object(get_post_type())->name);
      if ( $posttype_slug == 'closed-works' ) {
        $pageClass = 'page-single single-works';
      }
      else {
        $pageClass = 'page-single single-' . $posttype_slug;
      }
    }
  }
  else {
    $pageClass = '';
  }
?>