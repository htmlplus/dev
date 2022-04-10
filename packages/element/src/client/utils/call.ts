import { PlusElement } from '../../types';

export const call = (target: PlusElement, key: string, ...args: Array<any>): any => {
  return target[key]?.call(target, ...args);
};
