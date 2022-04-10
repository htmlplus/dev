import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';

export const host = (target: PlusElement): HTMLElement => {
  return target[CONSTANTS.API_HOST]();
};
