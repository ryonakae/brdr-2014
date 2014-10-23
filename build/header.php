<!DOCTYPE html>
<!--
　　　　　　　　/{ :/　　 /　.／ 　 　|　i　 　 ＼　 　 　　 ＼
.　　　　　　　/: }/　　 / ／　　　　 |　|　　　　 ＼　　 ＼　 ＼
　　　　　　　′:ｉ 　　/ '゜　______ 　 ｌ　{ ､ ＼. 　 　＼　　 ヽ:::.. ヽ
　　 　 　 　 |｛:::| 　 .′''"　 　　 ｀　 、::. ＼_____ ＼. ヽ　　 :::::::::::}
　　 　 　 　 |:::/| 　 |　 ,.斗=ミヽ　　　＼ゝ￣｀ヽ＼　 、　　 ﾟ,ﾊ:ヾ
　　　　　　　y: :{ 　 lイ　__)尓 ＼　　　 ,.斗=ﾐk　　|ヽ }: ‘.　 .|　}::i
　　 　 　 　 :.:.:.个t ﾊ　乂r少 　　　　 ″__)尓‘， }:::}八:::}::.. |　|::|
　　 　 　 　 i:.:.| l:.:.{＼＼:i:i:i:　　　　　　 乂r少　}〉'::/:::::}::ﾊ:::,　 }ﾉ
　　 　 　 　 |　| |　{　　　　　　 　 ′ 　 :i:i:i::　 ´∧:::}:::// ﾉ/　/
　　 　 　 　 |　ゝ 　 :, 　 　 r――- 、　　　　　/、:}::}/ﾚ　}′ ′
　　 　 　 　 |　　{＼　:,　 　 、　　　/ 　 　 　 /　}/:ｲ::::.. 〈i　　＜ ソースを見てくれるなんて…ハラショーよ！
　　 　 　 　 l＼ ﾊ 　ヽ}、　　｀ ー　　 　 　 　 _,ノ::}＼::::: . |
　 　 　 　 　 : .{＼ゝ-/ 丶　　　　　　　　ｨ7´　｀ヾ}　　:,::|│
　　　 　 　 　乂　 　｀¨¨¨ヽ　ｰ―ｧ f´:.:.:./　　　　j 　 ﾉ人|
　　　 　 　 ´￣｀＼ー―-- ＼　/､_,|:.:.:. {　　　　/　〃　 ﾉ
　　　　/ 　　　 　 　 　 ヽ 　　 ＼j]　;.:.:.　 、
　　　 .′　　　　　　　 　 ‘, 厂￣}i　 ＼　　＼________　　　　　 ___rv～ｰｭ
　　　;　　　　　　　　　　　 ‘,} : : ﾉ丁j⌒¨¨ヽー―=ミ｀ヽ　 　_(γ ´ ￣￣ ｀ヽ
　　 /{　　 　 　 　 　 ＼ 　　|、/:／ ｀ヽ¨¨¨¨ヽ :,　　 }　　γ:(./: ' : , : ' : , : ' , :,
　　 | |　　　　　 　 　 　 ＼　い/: : : : : |＼: : : }､} 　 ﾉ　　 | ::){: , : : , : : : : ,_:_:_:}｀ヽ
　　 |　:　　　　　　　　　　　＼_}＼: : :.:.:ﾄ　 ＼_〉 ＼　 　 rﾍ::(.{: : : , : : ' ／｀ヽ　　ﾊ
　　 |　 :　 　 ＼　　　　　　　　｀i　｀ヽ:_j　＼　{　 　 ヽ　 { (￣｀ヾ´￣￣　＼__j/./ }
　　 | 　i　　　　 ＼　 　 　 　 　 L.　　　　 　 ｰ'　 　 　 :,｛. ヽ 　　　 ﾉ⌒ヽ..,,_ 　　/)
　　 |　 |i　 　 　 　 ＼　　　　　　 }　　　　 　 　 　 　 　 } }　厂￣￣)　　 /　(＼/_)
-->
<html lang="ja" prefix="og: http://ogp.me/ns# fb: http://www.facebook.com/2008/fbml">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <?php
    $site_title = '';
    $site_suffix = ' / RYO NAKAE, Web Designer';

    if ( is_home() ) {
      $site_title = get_bloginfo('name') . $site_suffix;
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
      if ( is_home() ) {
        $og_title = get_bloginfo('name') . $site_suffix;
      }
      else {
        $og_title = get_bloginfo('name');
      }

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
  <meta property="fb:admins" content="100001275466582">
  <meta property="og:url" content="<?php echo $og_url; ?>">
  <meta property="og:type" content="<?php echo $og_type; ?>">
  <meta property="og:title" content="<?php echo $og_title; ?>">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:image" content="<?php echo $og_image; ?>">
  <meta property="og:description" content="<?php echo $og_description; ?>">
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
  <?php if ( is_single() ) : ?>
    <meta property="article:publisher" content="https://www.facebook.com/brdrslash">
  <?php endif; ?>

  <meta name="twitter:site" value="@brdr_slash">
  <meta name="twitter:creator" value="@ryo_dg">
  <meta name="twitter:card" value="summary_large_image">

  <link rel="author" href="https://plus.google.com/+RyoNakae">

  <?php wp_head(); ?>

  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Source+Code+Pro">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon.ico">

  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/lib.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/script.js"></script>
  <script src="//typesquare.com/accessor/script/typesquare.js?2JJvOMvDhIE%3D"></script>

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
      <li><a href="<?php bloginfo('url'); ?>/about/">About</a></li>
      <li><a href="<?php bloginfo('url'); ?>/works/">Works</a></li>
      <?php if ( is_user_logged_in() ) : ?>
        <li><a href="<?php bloginfo('url'); ?>/closed-works/">Closed Works</a></li>
      <? endif; ?>
      <li><a href="<?php bloginfo('url'); ?>/information/">Information</a></li>
      <li><a class="ext" href="http://memo.brdr.jp" target="_blank">Blog</a></li>
      <?php if ( is_user_logged_in() ) : ?>
        <li><a href="<?php echo wp_logout_url(); ?>">Logout</a></li>
      <? endif; ?>
    </ul>
  </nav>

  <div class="navigation-toggle sp" id="js-navigation-toggle">
    <i class="icon-menu"></i>
  </div>
</div>