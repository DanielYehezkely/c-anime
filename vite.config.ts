import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.mytrendingAnimeList.net/v2",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/anilist": {
        target: "https://graphql.anilist.co",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/anilist/, ""),
      },
    },
  },
});
