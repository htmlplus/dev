import { PlusElement } from '../../types';
import { defineProperty, host, onReady } from '../utils';

export function Method() {
  return function (target: PlusElement, propertyKey: PropertyKey) {
    onReady(target, function () {
      defineProperty(host(this), propertyKey, {
        get: () => {
          return this[propertyKey].bind(this);
        }
      });
    });
  };
}
