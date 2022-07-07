import { parse as parser } from '@babel/parser';
import { Plugin as RollupPlugin } from 'rollup';

import { Context } from '../../types';

export function parse(): RollupPlugin {
  return {
    name: 'parse',
    transform(code, id) {
      const meta = this.getModuleInfo(id)!.meta as Context;
      console.log('meta: ', meta);
      if (!!meta.fileAST) return;

      meta.fileAST = parser(code, {
        allowImportExportEverywhere: true,
        plugins: ['jsx', 'typescript', 'decorators-legacy']
      });
    }
  };
}
