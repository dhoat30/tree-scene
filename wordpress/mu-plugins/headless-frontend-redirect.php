<?php
/**
 * Plugin Name: Headless front-end redirect
 * Description: Sends theme-rendered pages on cms.treescene.co.nz to the matching page on treescene.co.nz.
 *
 * The public site is the Next.js app. This CMS's theme renders blank pages, and Google
 * was indexing them as duplicates of the real pages. A 301 tells Google which URL counts.
 *
 * Install: upload this file to wp-content/mu-plugins/ on the CMS (create the folder if missing).
 * The REST API (/wp-json), wp-admin, wp-login.php and /wp-content/uploads are not affected,
 * because template_redirect only fires for requests the theme would render.
 */

if (!defined('ABSPATH')) {
    exit;
}

const TREESCENE_FRONTEND = 'https://treescene.co.nz';

// Stop WordPress core publishing /wp-sitemap.xml once the Yoast sitemap is switched off.
add_filter('wp_sitemaps_enabled', '__return_false');

add_action('template_redirect', function () {
    if (is_robots() || is_favicon() || is_preview()) {
        return;
    }

    $path = trim((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

    // CMS slugs whose front-end route lives at a different path.
    $map = [
        'home'           => '',
        'get-free-quote' => 'get-a-quote',
        'gallery'        => 'our-work/gallery',
        'video-gallery'  => 'our-work/video-gallery',
    ];

    if (isset($map[$path])) {
        $path = $map[$path];
    } elseif (strpos($path, 'service/') === 0) {
        $path = 'services/' . substr($path, strlen('service/'));
    }

    wp_redirect(TREESCENE_FRONTEND . ($path === '' ? '' : '/' . $path), 301, 'Tree Scene CMS');
    exit;
});
