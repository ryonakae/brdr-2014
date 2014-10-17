<div class="entry-share">
  <div class="share-button share-facebook">
    <div class="fb-like" data-href="<?php the_permalink(); ?>" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
  </div>
  <div class="share-button share-gplus">
    <div class="g-plusone" data-size="medium" data-href="<?php the_permalink(); ?>"></div>
  </div>
  <div class="share-button share-hatena">
    <a href="http://b.hatena.ne.jp/entry/<?php the_permalink(); ?>" class="hatena-bookmark-button" data-hatena-bookmark-title="<?php wp_title('/', true, 'right'); bloginfo('name'); ?>" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>
  </div>
  <div class="share-button share-twitter">
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
    <a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php the_permalink(); ?> http://brdr.jp" data-text~"<?php wp_title('/', true, 'right'); bloginfo('name'); ?>" data-via="ryo_dg" data-lang="ja" data-related="ryo_dg">ツイート</a>
  </div>
</div>