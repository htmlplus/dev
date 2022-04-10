import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';

export const getMembers = (target: PlusElement): any => {
  return target.constructor[CONSTANTS.STATIC_MEMBERS] ?? target[CONSTANTS.STATIC_MEMBERS];
};
