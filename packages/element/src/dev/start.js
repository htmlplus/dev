import { createServer } from 'vite';

import compiler from '../../dist/compiler/index.js';
import {
  attach,
  componentDependencyResolver,
  extract,
  parse,
  print,
  read,
  style,
  uhtml,
  validate
} from '../../dist/compiler/index.js';

const { start, next, finish } = compiler(
  read(),
  parse(),
  validate(),
  extract(),
  componentDependencyResolver(),
  style(),
  attach({
    typings: false
  }),
  uhtml(),
  print()
);

createServer({
  root: 'src/dev',
  server: {
    open: true,
    port: 3500
  },
  resolve: {
    alias: {
      '@htmlplus/element/runtime': '../../dist/runtime/index.js',
      '@htmlplus/element': '../../dist/client/index.js'
    }
  },
  plugins: [
    {
      name: 'htmlplus',
      async buildStart() {
        await start();
      },
      async load(id) {
        if (!id.endsWith('.tsx')) return;
        const { isInvalid, script } = await next(id);
        if (isInvalid) return;
        return script;
      },
      async buildEnd() {
        await finish();
      }
    }
  ]
})
  .then((server) => server.listen())
  .catch((error) => console.log(error));
