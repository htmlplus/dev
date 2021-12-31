import compiler from '@htmlplus/element/compiler';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import glob from 'glob';
import path from 'path';
import { rollup } from 'rollup';
import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import plugins from '../plus.config.js';

const { start, next, finish } = compiler(...plugins);

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: glob.sync('./src/**/*.tsx'),
  output: [
    {
      format: 'esm',
      dir: 'dist',
      chunkFileNames: '[name].js',
      manualChunks(id) {

        const name = path.basename(id, path.extname(id));

        if (id.includes('cropperjs')) return 'core.cropperjs';

        if (id.includes('helpers')) return 'core.helpers';

        if (id.includes('media')) return 'core.media';
        
        if (id.includes('popperjs')) return 'core.popperjs';

        if (id.includes('services')) return 'core.' + name;

        if (id.endsWith('.tsx')) return null;

        return 'core';
      },
    },
  ],
  plugins: [
    {
      name: 'htmlplus',
      async buildStart() {
        await start();
      },
      async load(id) {

        if (!id.endsWith('.tsx')) return null;

        const { script } = await next(id);

        return script;
      },
      async buildEnd() {
        await finish();
      },
    },

    resolve({
      browser: true
    }),

    commonjs(),

    typescript(),

    terser({ 
      format: {
        comments: false
      }
    }),

    summary()
  ],
};

(async () => {

  try {

    const time = Date.now();

    const bundle = await rollup(options);

    for (const output of options.output)
      await bundle.write(output);

    await bundle.close();

    console.log(`Build in ${Date.now() - time}ms`);
  }
  catch (error) {
    console.log(error);
  }
})();
