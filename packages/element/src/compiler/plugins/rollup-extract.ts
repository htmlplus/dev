import * as t from '@babel/types';
import { ClassMethod, ClassProperty } from '@babel/types';
import { pascalCase, paramCase } from 'change-case';
import path from 'path';
import { Plugin as RollupPlugin } from 'rollup';

import * as CONSTANTS from '../../constants/index.js';
import { Context } from '../../types/context.js';
import { hasDecorator, visitor } from '../utils/index.js';

export interface ExtractOptions {
  prefix?: string;
}

export const extract = (options?: ExtractOptions): RollupPlugin => {
  return {
    name: 'exract',
    transform(code, id) {
      const meta = this.getModuleInfo(id)!.meta as Context;
      console.log('extract meta: ', meta);

      if (!meta.fileAST) throw Error('Extract plugin should be used after parse plugin');

      visitor(meta.fileAST as any, {
        ClassDeclaration: {
          exit(path) {
            meta.class = path.node;
            meta.classMembers = meta.class?.body?.body || [];
            path.skip();
          }
        },
        Decorator(path) {
          const name = path.node.expression.callee?.name;

          // TODO
          if (CONSTANTS.DECORATOR_ELEMENT == name) {
            const [argument] = path.node.expression.arguments;

            if (argument) {
              meta.componentTag = argument?.value;
              return;
            }

            meta.componentTag = paramCase(path.parent.id.name);

            if (options?.prefix) meta.componentTag = options.prefix + '-' + meta.componentTag;

            path.replaceWith(
              t.decorator(
                t.callExpression(t.identifier(name), [
                  t.stringLiteral(meta.componentTag),
                  ...path.node.expression.arguments.slice(1)
                ])
              )
            );

            return;
          }
        }
      });

      meta.directoryPath = path.dirname(meta.filePath!);

      meta.directoryName = path.basename(meta.directoryPath!);

      meta.fileExtension = path.extname(meta.filePath!);

      meta.fileName = path.basename(meta.filePath!, meta.fileExtension);

      meta.className = meta.class?.id?.name!;

      // TODO
      // meta.componentKey = paramCase(meta.className);
      meta.componentClassName = pascalCase(meta.componentTag?.split('-').slice(1).join('-') ?? 'TODO');
      meta.componentInterfaceName = `HTML${meta.componentClassName}Element`;

      // TODO
      // const componentClassName           = "DialogBody";              [OK]
      // const componentInterfaceName       = "HTMLDialogBodyElement";   [OK]
      // const componentTag                 = "plus-dialog-body";        [OK]
      // const componentClassNameInCategory = "Body";                    [RAW]
      // const componentKey                 = "dialog-body-1";           [RAW]
      // const fileName                     = "dialogBodyNew";           [OK]
      // const className                    = "DialogBody1";             [OK]
      // const category                     = "Dialog";                  [RAW]

      meta.classEvents = (meta.classMembers || []).filter((member) =>
        hasDecorator(member, CONSTANTS.DECORATOR_EVENT)
      ) as Array<ClassProperty>;

      meta.classMethods = (meta.classMembers || []).filter((member) =>
        hasDecorator(member, CONSTANTS.DECORATOR_METHOD)
      ) as Array<ClassMethod>;

      meta.classProperties = (meta.classMembers || []).filter((member) =>
        hasDecorator(member, CONSTANTS.DECORATOR_PROPERTY)
      ) as Array<ClassProperty>;

      meta.classStates = (meta.classMembers || []).filter((member) =>
        hasDecorator(member, CONSTANTS.DECORATOR_STATE)
      ) as Array<ClassProperty>;

      meta.classHasMount = (meta.classMembers || []).some(
        (member) => member['key'].name == CONSTANTS.LIFECYCLE_CONNECTED
      );

      meta.classHasUnmount = (meta.classMembers || []).some(
        (member) => member['key'].name == CONSTANTS.LIFECYCLE_DISCONNECTED
      );

      meta.classRender = (meta.classMembers || []).find(
        (member) => member['key'].name == CONSTANTS.METHOD_RENDER
      ) as ClassMethod;
    }
  };
};
