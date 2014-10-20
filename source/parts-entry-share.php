<?php
  $twimageurl = '';

  $twuserid = 'rydg_';
  $snaptw = get_post_meta($post->ID, 'snapTW', true);

  if ( $snaptw ) {
    $unserialize = maybe_unserialize($snaptw);
    $twimageid = $unserialize[0]['pgID'];
    $twimageurl = 'https://twitter.com/' . $twuserid . '/status/' . $twimageid . '/photo/1';
  }
?>

<ul class="entry-share">
  <li class="share-button share-facebook">
    <a href="http://www.facebook.com/share.php?u=<?php the_permalink(); ?>" onclick="ga('send', 'event', 'share_facebook', 'click', '<?php the_permalink(); ?>');" target="_blank">Share on Facebook</a>
  </li>
  <li class="share-button share-twitter">
    <a href="https://twitter.com/intent/tweet?text=<?php echo get_the_title(); ?> <?php the_permalink(); ?> <?php echo $twimageurl; ?>" target="_blank" onclick="ga('send', 'event', 'share_twitter', 'click', '<?php the_permalink(); ?>');">Share on Twitter</a>
  </li>
  <li class="share-button share-hatena">
    <a href="http://b.hatena.ne.jp/add?mode=confirm&url=<?php the_permalink() ?>" onclick="ga('send', 'event', 'share_hatebu', 'click', '<?php the_permalink(); ?>');" target="_blank">Bookmark on Hatena</a>
  </li>
</ul>
