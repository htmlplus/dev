import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';
import { appendToMethod, host, sync } from '../utils';

export function Attributes() {
  return function (target: PlusElement, propertyKey: PropertyKey) {
    let update;
    appendToMethod(target, CONSTANTS.LIFECYCLE_CONNECTED, function () {
      update = sync(host(this));
    });
    appendToMethod(target, CONSTANTS.LIFECYCLE_UPDATED, function () {
      update(this[propertyKey]);
    });
  };
}
