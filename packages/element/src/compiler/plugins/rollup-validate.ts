import { Plugin as RollupPlugin } from 'rollup';

import * as CONSTANTS from '../../constants/index.js';
import { Context } from '../../types/index.js';
import { hasDecorator, visitor } from '../utils/index.js';

export function validate(): RollupPlugin {
  return {
    name: 'validate',
    transform(code, id) {
      const meta = this.getModuleInfo(id)!.meta as Context;
      console.log('validate meta: ', meta);

      let hasValidImport, hasValidExport;

      visitor(meta.fileAST!, {
        ImportDeclaration(path) {
          if (path.node.source?.value !== CONSTANTS.PACKAGE_NAME) return;
          for (const specifier of path.node.specifiers) {
            if (specifier.imported.name !== CONSTANTS.DECORATOR_ELEMENT) continue;
            hasValidImport = true;
            path.stop();
          }
        },
        ExportNamedDeclaration(path) {
          if (hasValidExport) {
            hasValidExport = false;
            return path.stop();
          }
          if (path.node.declaration?.type !== 'ClassDeclaration') return;
          if (!hasDecorator(path.node.declaration, CONSTANTS.DECORATOR_ELEMENT)) return;
          hasValidExport = true;
        }
      });

      meta.isInvalid = !hasValidImport || !hasValidExport;
    }
  };
}
