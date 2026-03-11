import { defineConfig } from 'vite';
import webExtension from 'vite-plugin-web-extension';

const target = process.env.TARGET || 'firefox';

export default defineConfig({
    build: {
        outDir: `dist/${target}`,
        emptyOutDir: true,
    },
    plugins:[
        webExtension({
            manifest: () => {
                const base = {
                    name: "in\u00D8sight",
                    version: "2.1.0",
                    author: "planetrenox@pm.me",
                    homepage_url: "https://github.com/planetrenox/inzerosight",
                    description: "Communicate undetected in plain sight.",
                    icons: { "48": "icon_500.png" },
                };

                if (target === 'chrome') {
                    return {
                        ...base,
                        manifest_version: 3,
                        action: {
                            default_icon: { "48": "icon_500.png" },
                            default_title: "in\u00D8sight",
                            default_popup: "index.html",
                        },
                    };
                }

                return {
                    ...base,
                    manifest_version: 2,
                    browser_action: {
                        browser_style: false,
                        default_icon: "icon_500.png",
                        default_title: "in\u00D8sight",
                        default_popup: "index.html",
                    },
                    content_security_policy: "script-src 'self'; style-src 'self';",
                    browser_specific_settings: {
                        gecko: {
                            id: "{0a73f41c-c59c-404b-9e07-f7392fa830d4}",
                        },
                    },
                };
            },
        }),
    ],
});
