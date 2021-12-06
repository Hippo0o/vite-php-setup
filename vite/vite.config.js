// View your website at your own local server
// for example http://vite-php-setup.test

// http://localhost:3000 is serving Vite on development
// but accessing it directly will be empty
// TIP: consider changing the port for each project, see below

// IMPORTANT image urls in CSS works fine
// BUT you need to create a symlink on dev server to map this folder during dev:
// ln -s {path_to_vite}/src/assets {path_to_public_html}/assets
// or import assets manually e.g. import logoUrl from '../assets/logo.png'
// on production everything will work just fine

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import liveReload from 'vite-plugin-live-reload';
import path from 'path';

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    liveReload([
      // edit live reload paths according to your source code
      // for example:
      // __dirname + '/(app|config|views)/**/*.php',
      // using this for our example:
      __dirname + '/../public/*.php',
    ]),
  ],

  // config
  root: 'src',
  base: '/',

  build: {
    // output dir for production build
    outDir: path.resolve(__dirname, '../public/dist'),
    emptyOutDir: true,

    // emit manifest so PHP can find the hashed files
    manifest: true,

    // our entry
    rollupOptions: {
      input: path.resolve(__dirname, './src/main.js'),
    },
  },

  server: {
    // required to load scripts from custom host
    cors: true,

    // required to get absolute urls for imported assets
    origin: `http://localhost:${PORT}`,
    base: '',

    // we need a strict port to match on PHP side
    // change freely, but update on PHP to match the same port
    strictPort: true,
    port: PORT,

    // always connect websocket to localhost
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },

  // required for in-browser template compilation
  // https://v3.vuejs.org/guide/installation.html#with-a-bundler
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.vue', '.js'],
  },
});
