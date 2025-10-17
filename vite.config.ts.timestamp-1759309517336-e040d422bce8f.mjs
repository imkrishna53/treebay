// vite.config.ts
import { defineConfig } from "file:///C:/Users/KRISHNA/Downloads/abhishek/chemistry-lab-website/chemistry-website/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/KRISHNA/Downloads/abhishek/chemistry-lab-website/chemistry-website/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import runtimeErrorOverlay from "file:///C:/Users/KRISHNA/Downloads/abhishek/chemistry-lab-website/chemistry-website/node_modules/@replit/vite-plugin-runtime-error-modal/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\KRISHNA\\Downloads\\abhishek\\chemistry-lab-website\\chemistry-website";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("file:///C:/Users/KRISHNA/Downloads/abhishek/chemistry-lab-website/chemistry-website/node_modules/@replit/vite-plugin-cartographer/dist/index.mjs").then(
        (m) => m.cartographer()
      ),
      await import("file:///C:/Users/KRISHNA/Downloads/abhishek/chemistry-lab-website/chemistry-website/node_modules/@replit/vite-plugin-dev-banner/dist/index.mjs").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "client", "src"),
      "@shared": path.resolve(__vite_injected_original_dirname, "shared"),
      "@assets": path.resolve(__vite_injected_original_dirname, "attached_assets")
    }
  },
  root: path.resolve(__vite_injected_original_dirname, "client"),
  build: {
    outDir: path.resolve(__vite_injected_original_dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxLUklTSE5BXFxcXERvd25sb2Fkc1xcXFxhYmhpc2hla1xcXFxjaGVtaXN0cnktbGFiLXdlYnNpdGVcXFxcY2hlbWlzdHJ5LXdlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEtSSVNITkFcXFxcRG93bmxvYWRzXFxcXGFiaGlzaGVrXFxcXGNoZW1pc3RyeS1sYWItd2Vic2l0ZVxcXFxjaGVtaXN0cnktd2Vic2l0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvS1JJU0hOQS9Eb3dubG9hZHMvYWJoaXNoZWsvY2hlbWlzdHJ5LWxhYi13ZWJzaXRlL2NoZW1pc3RyeS13ZWJzaXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgcnVudGltZUVycm9yT3ZlcmxheSBmcm9tIFwiQHJlcGxpdC92aXRlLXBsdWdpbi1ydW50aW1lLWVycm9yLW1vZGFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBydW50aW1lRXJyb3JPdmVybGF5KCksXHJcbiAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXHJcbiAgICBwcm9jZXNzLmVudi5SRVBMX0lEICE9PSB1bmRlZmluZWRcclxuICAgICAgPyBbXHJcbiAgICAgICAgICBhd2FpdCBpbXBvcnQoXCJAcmVwbGl0L3ZpdGUtcGx1Z2luLWNhcnRvZ3JhcGhlclwiKS50aGVuKChtKSA9PlxyXG4gICAgICAgICAgICBtLmNhcnRvZ3JhcGhlcigpLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIGF3YWl0IGltcG9ydChcIkByZXBsaXQvdml0ZS1wbHVnaW4tZGV2LWJhbm5lclwiKS50aGVuKChtKSA9PlxyXG4gICAgICAgICAgICBtLmRldkJhbm5lcigpLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICBdXHJcbiAgICAgIDogW10pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShpbXBvcnQubWV0YS5kaXJuYW1lLCBcImNsaWVudFwiLCBcInNyY1wiKSxcclxuICAgICAgXCJAc2hhcmVkXCI6IHBhdGgucmVzb2x2ZShpbXBvcnQubWV0YS5kaXJuYW1lLCBcInNoYXJlZFwiKSxcclxuICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShpbXBvcnQubWV0YS5kaXJuYW1lLCBcImF0dGFjaGVkX2Fzc2V0c1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICByb290OiBwYXRoLnJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgXCJjbGllbnRcIiksXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogcGF0aC5yZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsIFwiZGlzdC9wdWJsaWNcIiksXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgZnM6IHtcclxuICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICBkZW55OiBbXCIqKi8uKlwiXSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaWEsU0FBUyxvQkFBb0I7QUFDOWIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLHlCQUF5QjtBQUhoQyxJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixvQkFBb0I7QUFBQSxJQUNwQixHQUFJLFFBQVEsSUFBSSxhQUFhLGdCQUM3QixRQUFRLElBQUksWUFBWSxTQUNwQjtBQUFBLE1BQ0UsTUFBTSxPQUFPLGtKQUFrQyxFQUFFO0FBQUEsUUFBSyxDQUFDLE1BQ3JELEVBQUUsYUFBYTtBQUFBLE1BQ2pCO0FBQUEsTUFDQSxNQUFNLE9BQU8sZ0pBQWdDLEVBQUU7QUFBQSxRQUFLLENBQUMsTUFDbkQsRUFBRSxVQUFVO0FBQUEsTUFDZDtBQUFBLElBQ0YsSUFDQSxDQUFDO0FBQUEsRUFDUDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQXFCLFVBQVUsS0FBSztBQUFBLE1BQ3RELFdBQVcsS0FBSyxRQUFRLGtDQUFxQixRQUFRO0FBQUEsTUFDckQsV0FBVyxLQUFLLFFBQVEsa0NBQXFCLGlCQUFpQjtBQUFBLElBQ2hFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTSxLQUFLLFFBQVEsa0NBQXFCLFFBQVE7QUFBQSxFQUNoRCxPQUFPO0FBQUEsSUFDTCxRQUFRLEtBQUssUUFBUSxrQ0FBcUIsYUFBYTtBQUFBLElBQ3ZELGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsTUFDUixNQUFNLENBQUMsT0FBTztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
