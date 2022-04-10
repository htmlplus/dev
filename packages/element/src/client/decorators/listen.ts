import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';
import { appendToMethod, host, on, off } from '../utils';
import { Bind } from './bind';

const defaults: ListenOptions = {
  target: 'host'
};

export interface ListenOptions {
  target?: 'host' | 'body' | 'document' | 'window';
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
  capture?: boolean;
}

export function Listen(name: string, options: ListenOptions = defaults) {
  return function (target: PlusElement, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    // TODO: types
    const element = (instance) => {
      switch (options.target) {
        case 'body':
          return window.document.body;
        case 'document':
          return window.document;
        case 'window':
          return window;
        case 'host':
          return host(instance);
      }
    };

    appendToMethod(target, CONSTANTS.LIFECYCLE_CONNECTED, function () {
      on(element(this)!, name, this[propertyKey], options);
    });

    appendToMethod(target, CONSTANTS.LIFECYCLE_DISCONNECTED, function () {
      off(element(this)!, name, this[propertyKey], options);
    });

    return Bind()(target, propertyKey, descriptor);
  };
}
