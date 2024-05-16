import { fileURLToPath } from 'url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { rimraf } from 'rimraf';
import path,{ resolve } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const outDir = resolve(__dirname, 'build');



// const root = resolve(__dirname, 'src');
const packages = [
  { name: 'index', path: resolve(__dirname, 'index.html') },
  { name: 'module1', path: resolve(__dirname, 'module1', 'index.html') },
  { name: 'module2', path: resolve(__dirname, 'module2', 'index.html') },
  { name: 'module3', path: resolve(__dirname, 'module3', 'index.html') },
];

async function buildPackages() {
  await rimraf('./build');

  for (const _package of packages) {
    await build({
      plugins: [
        react(),
        {
          name: 'replace-attributes',
          transformIndexHtml(html) {
            // Replace 'type="module" crossorigin' with 'defer' in <script> tags
            const scriptHtml = html.replace(
              /<script type="module" crossorigin/g,
              '<script defer'
            );
            // Replace 'crossorigin' in <link> tags
            const linkHtml = scriptHtml.replace(/crossorigin/g, '');
            return linkHtml;
          },
        },
      ],
      base: './',
      build: {
        
        outDir,
        modulePreload:false,
        minify: false,
        rollupOptions: {
          input: { [_package.name]: _package.path },
          output: {
            dir:"build",
            compact: true,
            entryFileNames: 'assets/js/[name].js',
						assetFileNames: `assets/[ext]/[name].[ext]`,

          },
        },
        emptyOutDir: false,
      },
      configFile: false,
      resolve: {alias:{'@': path.resolve(__dirname, 'src',"assets",'fonts'),
    }}    

    });
  }
}

buildPackages();

