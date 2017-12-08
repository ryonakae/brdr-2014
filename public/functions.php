<?php

  // JavaScriptの読み込みを管理
  // function disable_jquery() {
  //   if (!is_admin()) {
  //     wp_deregister_script('jquery');
  //   }
  // }
  // add_action('wp_enqueue_scripts', 'disable_jquery');


  // head内の不要なタグを削除
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'wp_shortlink_wp_head');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'feed_links_extra', 3); // コメントのRSS
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
  // User Access Manager
  // remove_action('wp_print_scripts', array($oUserAccessManager, 'addScripts'));
  // remove_action('wp_print_styles', array($oUserAccessManager, 'addStyles'));


  // contact form 7
  // function cf7_deregister_files() {
  //   wp_dequeue_script('contact-form-7');
  //   wp_dequeue_style('contact-form-7');
  // }
  // add_action( 'wp_enqueue_scripts', 'cf7_deregister_files');


  function deregister_js() {
    // devicepx-jetpack.js
    wp_dequeue_script('devicepx');
  }
  add_action( 'wp_enqueue_scripts', 'deregister_js', 20 );

  function deregister_css() {
    // jetpack.css
    wp_dequeue_style('jetpack');
  }
  add_action( 'wp_enqueue_style', 'deregister_css', 15 );


  // インラインスタイル削除
  function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
  }
  add_action( 'widgets_init', 'remove_recent_comments_style' );


  // サイト内検索：全角スペースで区切れるようにする
  if(isset($_GET['s'])) $_GET['s']=mb_convert_kana($_GET['s'],'s','UTF-8');


  // アイキャッチ画像の有効化
  add_theme_support('post-thumbnails');
  add_image_size('thumbnail_small', 320, 9999);
  // add_image_size('square_medium', 640, 640, true);


  // アイキャッチ画像生成時の画質を変更
  add_filter('jpeg_quality', function($arg){return 98;});


  // 画像のサイズを削除
  add_filter('intermediate_image_sizes_advanced', function($sizes){
    // medium_large(Advanced Custom Fields)
    update_option('medium_large_size_w', 0);
    // unset($sizes['thumbnail']);
  	// unset($sizes['medium']);
  	// unset($sizes['large']);
  	return $sizes;
  });


  // セルフピンバックの無効化
  function no_self_ping(&$links){
    $home = get_option('home');
    foreach($links as $l => $link)
      if(0 === strpos($link, $home))
        unset($links[$l]);
    }
  add_action('pre_ping', 'no_self_ping');


  // 管理画面カスタマイズ: ログイン画面のロゴ画像の変更
  function custom_login_logo() {
    echo '<style type="text/css">h1 a { background: url('.get_bloginfo('template_directory').'/img/admin_logo.png) 50% 50% no-repeat !important; }</style>';
  }
  add_action('login_head', 'custom_login_logo');


  // 投稿に画像を挿入するときのフォーマットを変更
  function my_remove_img_attr($html, $id, $alt, $title, $align, $size){
      //$html = preg_replace('/ width="\d+"/', '', $html);
      //$html = preg_replace('/ height="\d+"/', '', $html);
      $html = preg_replace('/ class=".+"/', '', $html);
      $html = preg_replace('/ title=".+"/', '', $html);
    return $html;
  }
  add_action( 'get_image_tag', 'my_remove_img_attr', 1 ,6);

  function my_image_send_to_editor( $html, $id, $caption, $title, $align, $url, $size ) {
    $html = preg_replace('/<a href=".+">/', '', $html);
    $html = preg_replace('/<\/a>/', '', $html);
    $html = preg_replace('/" \/>/', '">', $html);
    $html = '<figure class="img">' .$html .'</figure>';
  return $html;
  }
  add_action( 'image_send_to_editor', 'my_image_send_to_editor', 10 ,7);


  // 抜粋表示をいい感じにする
  function my_excerpt_more($more) {
    return ' ...';
  }
  function my_excerpt_length($length) {
    return 100;
  }
  function my_excerpt_mblength($length) {
    return 50;
  }
  add_filter('excerpt_more', 'my_excerpt_more');
  add_filter('excerpt_length', 'my_excerpt_length');
  add_filter('excerpt_mblength', 'my_excerpt_mblength');


  // moreリンクの遷移先を記事の一番上に
  function remove_more_hash($link) {
    $offset = strpos($link, '#more-');
    if ($offset) {
      $end = strpos($link, '"',$offset);
    }
    if ($end) {
      $link = substr_replace($link, '', $offset, $end-$offset);
    }
    return $link;
  }
  add_filter('the_content_more_link', 'remove_more_hash');


  // pre_get_posts
  function modify_posts_loop( $wp_query ) {
    if ( is_admin() || !$wp_query->is_main_query() )
      return;

    // information(post) archive
    elseif ( $wp_query->is_archive() && $wp_query->is_post_type_archive('post') ) {
      $wp_query->set( 'posts_per_page', 5 );
      $wp_query->set( 'orderby', 'date' );
      $wp_query->set( 'order', 'DESC' );
    }

    // works archive
    elseif ( $wp_query->is_post_type_archive('works') || $wp_query->is_tax('works-category') ) {
      $wp_query->set( 'post_type', 'works' );
      $wp_query->set( 'posts_per_page', 12 );
      $wp_query->set( 'orderby', 'date' );
      $wp_query->set( 'order', 'DESC' );
    }

    // closed works archive
    elseif ( $wp_query->is_post_type_archive('closed-works') ) {
      $wp_query->set( 'post_type', 'closed-works' );
      $wp_query->set( 'posts_per_page', 12 );
      $wp_query->set( 'orderby', 'date' );
      $wp_query->set( 'order', 'DESC' );
    }
  }
  add_action( 'pre_get_posts', 'modify_posts_loop' );

?>
