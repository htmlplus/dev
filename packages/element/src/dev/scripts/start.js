import { createServer } from 'vite';

import { extract, parse, validate } from '../../../dist/compiler/rollup-index.js';

createServer({
  root: 'src/dev',
  server: {
    open: true,
    port: 3500
  },
  resolve: {
    alias: {
      '@htmlplus/element/runtime': '../../../dist/runtime/index.js',
      '@htmlplus/element': '../../../dist/client/index.js'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '$color: pink;\n'
      }
    }
  },
  plugins: [
    {
      name: 'init',
      transform(code, id) {
        if (!id.endsWith('.tsx')) return;

        this.getModuleInfo(id).meta = {
          filePath: id
        };
      }
    },
    parse(),
    validate(),
    extract(),
    {
      name: 'htmlplus',
      // async buildStart() {
      //   await start();
      // },
      async transform(code, id) {
        if (!id.endsWith('.tsx')) return;
        const context = this.getModuleInfo(id).meta;

        console.log(context);
        const { isInvalid, script } = context;
        if (isInvalid) return;
        return script.replace('.scss', '.scss?inline');
      }
      // async buildEnd() {
      //   await finish();
      // }
    }
  ]
})
  .then((server) => server.listen())
  .catch((error) => console.log(error));
