=== Hot Page Reloading ===
Contributors: zakarialaoui10
Donate link: https://ko-fi.com/zakariaelalaoui
Tags: zikojs, hot page reload, channel broadcast, Interprocessing communication, developer experience 
Tested up to: 6.9
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Enhance your development workflow with automatic page reloading while editing content.

== Description ==

**Hot Page Reloading** improves the WordPress editing experience by automatically refreshing the preview page whenever you save changes in the editor.

No setup required — just install and activate the plugin, and it works out of the box.

### Features

* ⚡ Instant preview refresh on save
* 🔌 Zero configuration required
* 🧑‍💻 Optimized for developers and content creators
* 🪶 Lightweight and fast
* ⚙️ Efficient :
    * Master script runs only in the editor
    * Slave script runs only for logged-in users with edit_posts capability
* 🧩 Native : 
    * No WebSockets, servers, or browser extensions.
    * Fully integrated into the WordPress lifecycle 

Whether you're tweaking layouts or updating content, this plugin keeps your preview in sync without manual refresh.

### Technical Details

Hot Page Reloading uses a **Master–Slave architecture** powered by `zikojs` IPC hooks.
It communicates via a broadcast channel between the editor and frontend tabs, and listens to the `wp.data` (`core/editor`) store to trigger reloads only after a successful post save.

Source code available on GitHub:  [zakarialaoui10/wp-hot-page-reloading](https://github.com/zakarialaoui10/wp-hot-page-reloading)


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/hot-page-reloading` directory, or install it via the WordPress Plugins screen.
2. Activate the plugin through the **Plugins** screen in WordPress.

That’s it — no additional configuration needed.

== Frequently Asked Questions ==

= What is hot page reloading? =

Hot page reloading automatically refreshes the preview page whenever you save changes in the WordPress editor. This eliminates the need to manually reload the preview, speeding up your workflow.

= Do I need to configure anything? =

No. The plugin works immediately after activation with zero configuration.

= Where does it work? =

It watches the edit page and reloads the associated preview page automatically on save.

== Changelog ==

= 1.0.0 =

* Initial release
