import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    commonjs(),
    rollupNodePolyFill()
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      // sys: 'util',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      string_decoder: __dirname + '/node_modules/rollup-plugin-node-polyfills/polyfills/string-decoder.js'
      // querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      // url: 'rollup-plugin-node-polyfills/polyfills/url',
      // http: 'rollup-plugin-node-polyfills/polyfills/http',
      // https: 'rollup-plugin-node-polyfills/polyfills/http',
      // os: 'rollup-plugin-node-polyfills/polyfills/os',
      // assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      // constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      // _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      // _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      // _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      // _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
      // _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
      // timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      // console: 'rollup-plugin-node-polyfills/polyfills/console',
      // vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      // tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      // domain: 'rollup-plugin-node-polyfills/polyfills/domain',
    }
  }
});
