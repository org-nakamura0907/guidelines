// @ts-check
import { defineConfig } from "astro/config";
import { APP_BASE_PATH, APP_BASE_URL } from "./src/shared/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { unified } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

// GFMタスクリストの <input type="checkbox" disabled> はラベルなしでレンダリングされるため
// スクリーンリーダーから隠す (装飾的な状態インジケーターとして扱う)
function rehypeTaskListA11y() {
    return (/** @type {any} */ tree) => {
        visit(tree, "element", (node) => {
            if (
                node.tagName === "input" &&
                node.properties?.type === "checkbox" &&
                "disabled" in node.properties
            ) {
                node.properties["aria-hidden"] = "true";
            }
        });
    };
}

// https://astro.build/config
export default defineConfig({
    site: APP_BASE_URL,
    base: APP_BASE_PATH,
    integrations: [mdx(), react()],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        processor: unified({ rehypePlugins: [rehypeTaskListA11y] }),
    },
});
