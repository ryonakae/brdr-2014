<!DOCTYPE html>
<html lang="ja" prefix="og: http://ogp.me/ns# fb: http://www.facebook.com/2008/fbml">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <title><?php wp_title('/', true, 'right'); bloginfo('name'); ?></title>

  <meta name="description" content="<?php bloginfo('description'); ?>">
  <meta name="robots" content="index,follow">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <!-- OGP -->
  <meta property="fb:admins" content="100001275466582">
  <meta property="og:url" content="">
  <meta property="og:type" content="website">
  <meta property="og:title" content="">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:image" content="">
  <meta property="og:description" content="">
  <meta property="og:site_name" content="">
  <!-- <meta property="article:publisher" content=""> -->

  <meta name="twitter:site" value="@brdr_slash">
  <meta name="twitter:creator" value="@ryo_dg">
  <meta name="twitter:card" value="summary_large_image">

  <link rel="author" href="https://plus.google.com/+RyoNakae">

  <?php wp_head(); ?>

  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Source+Code+Pro">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/style.css">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon.ico">
  <!-- <link rel="apple-touch-icon-precomposed" href="<?php echo get_template_directory_uri(); ?>/img/apple-touch-icon.png"> -->
  <!-- <link rel="canonical" href=""> -->

  <!-- Script -->
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <script src="//css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
  <![endif]-->
</head>

<?php include('util-pageclass.php'); ?>

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
      <li><a href="<?php bloginfo('url'); ?>/about">About</a></li>
      <li><a href="<?php bloginfo('url'); ?>/works">Works</a></li>
      <li><a href="<?php bloginfo('url'); ?>/information">Information</a></li>
      <li><a class="ext" href="http://memo.brdr.jp" target="_blank">Blog</a></li>
    </ul>
  </nav>

  <div class="navigation-toggle sp" id="js-navigation-toggle">
    <i class="icon-menu"></i>
  </div>
</div>