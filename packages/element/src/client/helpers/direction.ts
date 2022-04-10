import { PlusElement } from '../../types';
import { host } from '../utils';

export type Direction = 'ltr' | 'rtl';

export const direction = (target: PlusElement): Direction => {
  return getComputedStyle(host(target)).getPropertyValue('direction').toLowerCase() as Direction;
};
