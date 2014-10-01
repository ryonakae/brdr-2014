<?php
/**
 * WordPress の基本設定
 *
 * このファイルは、MySQL、テーブル接頭辞、秘密鍵、言語、ABSPATH の設定を含みます。
 * より詳しい情報は {@link http://wpdocs.sourceforge.jp/wp-config.php_%E3%81%AE%E7%B7%A8%E9%9B%86
 * wp-config.php の編集} を参照してください。MySQL の設定情報はホスティング先より入手できます。
 *
 * このファイルはインストール時に wp-config.php 作成ウィザードが利用します。
 * ウィザードを介さず、このファイルを "wp-config.php" という名前でコピーして直接編集し値を
 * 入力してもかまいません。
 *
 * @package WordPress
 */

// 注意:
// Windows の "メモ帳" でこのファイルを編集しないでください !
// 問題なく使えるテキストエディタ
// (http://wpdocs.sourceforge.jp/Codex:%E8%AB%87%E8%A9%B1%E5%AE%A4 参照)
// を使用し、必ず UTF-8 の BOM なし (UTF-8N) で保存してください。

// ** MySQL 設定 - この情報はホスティング先から入手してください。 ** //
/** WordPress のためのデータベース名 */
define('DB_NAME', 'brdr.jp');

/** MySQL データベースのユーザー名 */
define('DB_USER', 'wpadmin');

/** MySQL データベースのパスワード */
define('DB_PASSWORD', 'hVkViEqNjtePPoMLvgppRNhwuxh3DKFNBxMMmnCypeXqyGcZ7x');

/** MySQL のホスト名 */
define('DB_HOST', 'localhost');

/** データベースのテーブルを作成する際のデータベースの文字セット */
define('DB_CHARSET', 'utf8');

/** データベースの照合順序 (ほとんどの場合変更する必要はありません) */
define('DB_COLLATE', '');

/**#@+
 * 認証用ユニークキー
 *
 * それぞれを異なるユニーク (一意) な文字列に変更してください。
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org の秘密鍵サービス} で自動生成することもできます。
 * 後でいつでも変更して、既存のすべての cookie を無効にできます。これにより、すべてのユーザーを強制的に再ログインさせることになります。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '^eN+3G:WwQS&R/wd2FK?5]zHFU/JA0W%Jh};1a(=To&iYVJ@+-X?tWd2Ym{GCk@t');
define('SECURE_AUTH_KEY',  '1dZO+>XX>Jy1<LR|+U;>y)]]4@@27wm19+gtgV /+F<q*-gT$--<;43NYor_@*pW');
define('LOGGED_IN_KEY',    'xp)QO+B +PTh}e=9`j]35Xe$7`)7yC`0gxw,K;v>Ex7Z),)l&1@ffoIz*:6`)P5u');
define('NONCE_KEY',        '+`H?8#]=G=Uw*oY.MtyobWkl3|d|T+M-gnP.P.fF7e_|RWsO%|K-U4LHYQJ$vFZ.');
define('AUTH_SALT',        '*+&j|Hc>AQb1,W =4nPCykj^_9[sC;` :s5@b7c&>)BTUzPf5wl9C5.yZz#5%?,k');
define('SECURE_AUTH_SALT', 'D?dP>Qs6dKlhv(GbVq$.>h_+8qXK./?:rE+#q:3%S,Gr03h=+-;E2da9C R?W$C[');
define('LOGGED_IN_SALT',   'k?o/uxR]5:;:qki1vt0*w0e7TFY+]>]j/gR&k^u@-rOmbP8Z3Pu@f_6r-dJPL*EM');
define('NONCE_SALT',       '.&}2@;+[+!0??nP[8BTNAYLg>m7xB!+aOf;uni?R;s+z0uIR)%-ku-6sv-FNSxgV');

/**#@-*/

/**
 * WordPress データベーステーブルの接頭辞
 *
 * それぞれにユニーク (一意) な接頭辞を与えることで一つのデータベースに複数の WordPress を
 * インストールすることができます。半角英数字と下線のみを使用してください。
 */
$table_prefix  = 'wp_';

/**
 * 開発者へ: WordPress デバッグモード
 *
 * この値を true にすると、開発中に注意 (notice) を表示します。
 * テーマおよびプラグインの開発者には、その開発環境においてこの WP_DEBUG を使用することを強く推奨します。
 */
define('WP_DEBUG', true);

// define('WP_ALLOW_REPAIR', true);

/* 編集が必要なのはここまでです ! WordPress でブログをお楽しみください。 */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
