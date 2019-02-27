<!DOCTYPE html>
<html lang="ja" prefix="og: http://ogp.me/ns# fb: http://www.facebook.com/2008/fbml">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <?php
    $site_title = '';

    if ( is_home() ) {
      $site_title = get_bloginfo('name');
    }
    elseif ( is_tax() ) {
      $taxonomy = $wp_query->get_queried_object();
      $site_title = esc_html($taxonomy->name.' / '.get_bloginfo('name'));
    }
    else {
      $site_title = wp_title('/', false, 'right').get_bloginfo('name');
    }
  ?>
  <title><?php echo $site_title; ?></title>

  <?php
    $description = '';

    if ( is_home() || is_archive() || is_post_type_archive() || is_tax() || is_page('information') ) {
      $description = get_bloginfo('description');
    }
    else {
      if ( get_the_excerpt() != '' ) {
        $description = get_the_excerpt();
      }
      elseif ( is_page('about') ) {
        $description = get_field('page-description');
      }
      else {
        $post_id = get_the_ID();
        $post = get_post($post_id);
        $content = $post->post_content;
        $content = apply_filters('the_content', $content);
        $content = strip_tags($content);
        $content = str_replace(" ", "", $content);
        $content = str_replace("　", "", $content);
        $description = mb_strimwidth($content, 0, 200, "…");
      }
    }
  ?>
  <meta name="description" content="<?php echo $description; ?>">
  <meta name="robots" content="index,follow">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <!-- OGP -->
  <?php
    $og_url = '';
    $og_title = '';
    $og_description = '';
    $og_type = '';
    $og_image = '';

    if ( is_home() || is_archive() || is_post_type_archive() || is_tax() || is_page('information') ) {
      $og_title = get_bloginfo('name');

      $og_url = get_bloginfo('url');
      $og_description = get_bloginfo('description');
      $og_type = 'website';
      $og_image = get_template_directory_uri().'/assets/img/ogp.png';
    }
    else {
      $og_url = get_permalink();
      $og_title = wp_title('/', false, 'right').get_bloginfo('name');

      if ( get_the_excerpt() != '' ) {
        $og_description = get_the_excerpt();
      }
      elseif ( is_page('about') ) {
        $og_description = get_field('page-description');
      }
      else {
        $post_id = get_the_ID();
        $post = get_post($post_id);
        $content = $post->post_content;
        $content = apply_filters('the_content', $content);
        $content = strip_tags($content);
        $content = str_replace(" ", "", $content);
        $content = str_replace("　", "", $content);
        $og_description = mb_strimwidth($content, 0, 200, "…");
      }

      $og_type = 'article';

      if ( has_post_thumbnail() ) {
        $thumbnail_id = get_post_thumbnail_id($post->ID);
        $image = wp_get_attachment_image_src( $thumbnail_id, 'medium' );
        $og_image = $image[0];
      }
      else {
        $og_image = get_template_directory_uri().'/assets/img/ogp.png';
      }
    }
  ?>
  <meta property="og:url" content="<?php echo $og_url; ?>">
  <meta property="og:type" content="<?php echo $og_type; ?>">
  <meta property="og:title" content="<?php echo $og_title; ?>">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:image" content="<?php echo $og_image; ?>">
  <meta property="og:description" content="<?php echo $og_description; ?>">
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>">

  <meta name="twitter:site" content="@brdr_slash">
  <meta name="twitter:creator" content="@ryo_dg">
  <meta name="twitter:card" content="summary_large_image">

  <?php wp_head(); ?>

  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon.ico">

  <!-- Script -->
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/lib.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/script.js"></script>

  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>

<?php include('partial/util-pageclass.php'); ?>

<body class="<?php echo $pageClass; ?>">
<!-- header -->
<header class="l-header">
  <h1 class="logo">
    <a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a>
  </h1>
</header>

<!-- navigation -->
<div class="l-navigation">
  <nav class="navigation" id="js-navigation">
    <ul>
      <li><a href="<?php bloginfo('url'); ?>/about/">About</a></li>
      <li><a href="<?php bloginfo('url'); ?>/works/">Works</a></li>
      <?php if ( is_user_logged_in() ) : ?>
        <li><a href="<?php bloginfo('url'); ?>/closed-works/">Closed Works</a></li>
      <?php endif; ?>
      <li><a href="<?php bloginfo('url'); ?>/information/">Information</a></li>
      <li><a class="ext" href="http://memo.brdr.jp" target="_blank">Blog</a></li>
      <?php if ( is_user_logged_in() ) : ?>
        <li><a href="<?php echo wp_logout_url(); ?>">Logout</a></li>
      <?php endif; ?>
    </ul>
  </nav>

  <div class="navigation-toggle sp" id="js-navigation-toggle">
    <i class="icon-menu"></i>
  </div>
</div>
