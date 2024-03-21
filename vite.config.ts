import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import viteCompression from "vite-plugin-compression";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   build: { outDir: "build", },
   resolve: {
      alias: {
         src: path.resolve(__dirname, "src"),
         assets: path.resolve(__dirname, "src", "assets"),
         styles: path.resolve(__dirname, "src", "styles"),
         components: path.resolve(__dirname, "src", "components"),
         contexts: path.resolve(__dirname, "src", "contexts"),
         constants: path.resolve(__dirname, "src", "constants"),
         hooks: path.resolve(__dirname, "src", "hooks"),
         interface: path.resolve(__dirname, "src", "interface"),
         layout: path.resolve(__dirname, "src", "layout"),
         pages: path.resolve(__dirname, "src", "pages"),
         api: path.resolve(__dirname, "src", "api"),
         utils: path.resolve(__dirname, "src", "utils"),
         types: path.resolve(__dirname, "src", "types"),
         store: path.resolve(__dirname, "src", "store"),
      },
   },
});
