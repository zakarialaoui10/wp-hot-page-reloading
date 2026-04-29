<?php
/**
 * Plugin Name:       Hot Page Reloading
 * Description:       Enhance developer experience with hot page reloading
 * Version:           1.0.0
 * Requires at least: 6.9
 * Requires PHP:      8.2
 * Author:            Zakaria Elalaoui
 * Author URI:        https://github.com/zakarialaoui10
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hot-page-reloading
 */

if (!defined('ABSPATH')) exit;

/**
 * Enqueue editor (Master)
 */
add_action('enqueue_block_editor_assets', function () {
    $asset_path = plugin_dir_path(__FILE__) . 'build/master.asset.php';

    if (!file_exists($asset_path)) return;

    $asset = include $asset_path;

    wp_enqueue_script(
        'hot-reload-master',
        plugin_dir_url(__FILE__) . 'build/master.js',
        $asset['dependencies'],
        $asset['version'],
        true
    );
});

/**
 * Enqueue frontend (Slave)
 */
add_action('wp_enqueue_scripts', function () {

    if (!current_user_can('edit_posts')) return;

    $asset_path = plugin_dir_path(__FILE__) . 'build/slave.asset.php';

    if (!file_exists($asset_path)) return;

    $asset = include $asset_path;

    wp_enqueue_script(
        'hot-reload-slave',
        plugin_dir_url(__FILE__) . 'build/slave.js',
        $asset['dependencies'],
        $asset['version'],
        true
    );
});