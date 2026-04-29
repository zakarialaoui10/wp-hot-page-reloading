<?php
/**
 * Plugin Name:       Hot Page Reloading
 * Description:       Enhance developer experience with hot page reloading
 * Version:           1.0.0
 * Requires at least: 6.9
 * Requires PHP:      8.2
 * Author:            Zakaria Elalaoui
 * Author URI: https://github.com/zakarialaoui10
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hot-page-reloading
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) exit;

add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'wp-live-reload-editor',
        plugin_dir_url(__FILE__) . 'build/hot-page-reloading/master.js',
        ['wp-data'],
        time(),
        true
    );
});

add_action('wp_enqueue_scripts', function () {

    if (!is_user_logged_in()) return;

    wp_enqueue_script(
        'wp-live-reload-frontend',
        plugin_dir_url(__FILE__) . 'build/hot-page-reloading/slave.js',
        [],
        time(),
        true
    );
});