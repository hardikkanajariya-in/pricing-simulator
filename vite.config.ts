import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to inline all bundled CSS into index.html to remove render-blocking stylesheet requests
const inlineCss = () => ({
  name: 'inline-css',
  enforce: 'post' as const,
  generateBundle(options: any, bundle: any) {
    const cssFiles = Object.keys(bundle).filter(name => name.endsWith('.css'));
    if (cssFiles.length === 0) return;

    const htmlFile = bundle['index.html'];
    if (!htmlFile) return;

    let html = htmlFile.source.toString();

    for (const cssName of cssFiles) {
      const cssAsset = bundle[cssName];
      if (!cssAsset) continue;

      const cssContent = cssAsset.source.toString();
      
      // Match link tags referencing this css file
      const linkRegex = new RegExp(`<link[^>]*href=["']\\/?${cssName.replace(/\./g, '\\.')}["'][^>]*>`, 'i');
      if (linkRegex.test(html)) {
        html = html.replace(linkRegex, `<style>${cssContent}</style>`);
        delete bundle[cssName]; // Prevent writing stylesheet to disk
      }
    }

    htmlFile.source = html;
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
  esbuild: {
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
  }
})
