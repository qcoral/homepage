// @ts-check
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    redirects: {
        "/collectibles": "https://github.com/qcoral/collectibles",
        "/donate": "https://hcb.hackclub.com/donations/start/alex-s-fund",
    },
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: [".ngrok-free.app", ".ngrok.io"],
        },
    },

    markdown: {
        rehypePlugins: [
            [
                rehypeExternalLinks,
                {
                    target: "_blank",
                    rel: ["noopener", "noreferrer"],
                },
            ],
        ],
    },

    adapter: node({
        mode: "standalone",
    }),

    integrations: [mdx()],
});
