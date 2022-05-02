import t from '@babel/types';
import fs from 'fs';
import less from 'less';
import path from 'path';
import sass from 'sass';
import stylus from 'stylus';

import * as CONSTANTS from '../../constants/index.js';
import { Context } from '../../types/index.js';

console.log(less);

const resolvers = {
  css() {
    return async (context: Context) => {
      return fs.readFileSync(context.stylePath!, 'utf-8');
    };
  },
  less() {
    return async (context: Context) => {
      console.log('less: ', less);
      return 'TODO';
    };
  },
  styl() {
    return async (context: Context) => {
      const fileContent = fs.readFileSync(context.stylePath!, 'utf-8');
      const result = stylus(fileContent);

      if (result) {
        context.styleDependencies = result.deps();
        context.styleParsed = result.render();
      }
      return context.styleParsed;
    };
  },
  scss(options) {
    return async (context: Context) => {
      const { css, loadedUrls } = sass.compile(context.stylePath!, {
        ...(options || {}),
        style: 'compressed'
      });

      context.styleParsed = css.toString();

      // TODO loadedUrls;
      context.styleDependencies = [];
      return context.styleParsed;
    };
  }
};

const defaults: StyleOptions = {
  extensions: ['scss', 'css', 'styl', 'less'],
  directory(context: Context) {
    return context.directoryPath!;
  },
  filename(context: Context) {
    return context.fileName!;
  },
  resolver(context: Context) {
    const extension = context.stylePath!.split('.').pop();
    return resolvers[extension!]()(context);
  }
};

export type StyleOptions = {
  extensions?: Array<string>;
  directory?: (context: Context) => string;
  filename?: (context: Context) => string;
  resolver?: (context: Context) => string;
};

export const style = (options: StyleOptions) => {
  const name = 'style';

  options = { ...defaults, ...options };

  const next = async (context: Context) => {
    const filename = options.filename!(context);

    const directory = options.directory!(context);

    for (let extension of options.extensions!) {
      const stylePath = path.join(directory, `${filename}.${extension}`);
      if (!fs.existsSync(stylePath)) continue;
      context.stylePath = stylePath;

      break;
    }

    if (!context.stylePath) return;

    context.styleParsed = await options.resolver!(context);
    // context.parse

    // context.fileAST!.program.body.unshift(
    //   t.importDeclaration(
    //     [t.importDefaultSpecifier(t.identifier('AUTO_IMPORT_STYLE'))],
    //     t.stringLiteral(context.stylePath)
    //   )
    // );

    if (context.styleParsed) {
      context.class!.body.body.unshift(
        t.classProperty(
          t.identifier(CONSTANTS.STATIC_STYLES),
          t.stringLiteral(context.styleParsed),
          undefined,
          null,
          undefined,
          true
        )
      );
    }

    // context.class!.body.body.unshift(
    //   t.classProperty(
    //     t.identifier(CONSTANTS.STATIC_STYLES),
    //     t.identifier('AUTO_IMPORT_STYLE'),
    //     undefined,
    //     null,
    //     undefined,
    //     true
    //   )
    // );
  };

  return {
    name,
    next
  };
};
