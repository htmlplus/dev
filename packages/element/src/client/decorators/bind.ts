import { defineProperty } from '../utils';

export function Bind() {
  return function (target: Object, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    return {
      configurable: true,
      get() {
        const value = descriptor?.value!.bind(this);
        defineProperty(this, propertyKey, {
          value,
          configurable: true,
          writable: true
        });
        return value;
      }
    };
  };
}
