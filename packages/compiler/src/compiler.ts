import * as path from 'path';
import { Context, Plugin } from './types/index.js';

const log = (namespace?: string, message?: string) => {
  if (namespace)
    console.log(`[${new Date().toLocaleTimeString()}] [${namespace}] ${message}`);
  else
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
}

export const compiler = (...plugins: Array<Plugin>) => {

  const global = {
    contexts: {}
  }

  const start = async () => {

    log(undefined, 'Starting.');

    for (const plugin of plugins) {

      if (!plugin.start) continue;

      await plugin.start(global);

      log(plugin.name, 'Started successfully.');
    }
  }

  const next = async (filename: string) => {

    const key = filename.split('\\').pop();

    const directory = path.dirname(filename);

    let context: Context = {
      filename,
      directory,
      content: '',
      tag: '',
      members: [],
      states: [],
      properties: [],
      events: [],
      methods: [],
    }

    for (const plugin of plugins) {

      if (!plugin.next) continue;

      context = await plugin.next(context, global) || context;

      log(plugin.name, `[${key}] Executed successfully.`);
    }

    global.contexts[filename] = context;

    return context;
  }

  const finish = async () => {

    for (const plugin of plugins) {

      if (!plugin.finish) continue;

      await plugin.finish(global);

      log(plugin.name, 'Finished successfully.');
    }

    log(undefined, 'Finished.');
  }

  return {
    start,
    next,
    finish,
  }
}
