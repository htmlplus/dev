import { PlusElement } from '../../types';
import { defineProperty } from '../utils';
import { queryAll } from './query-all';

type Slots = {
  [key: string]: boolean;
};

export const slots = (target: PlusElement): Slots => {
  const result = {};
  queryAll(target, 'slot')?.forEach((slot) => {
    const name = slot.name || 'default';
    defineProperty(result, name, {
      get() {
        return !!slot.assignedNodes().filter((node) => node.nodeName != '#text' || node.nodeValue?.trim()).length;
      }
    });
  });
  return result;
};
