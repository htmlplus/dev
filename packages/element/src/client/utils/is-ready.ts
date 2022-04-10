import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';

export const isReady = (target: PlusElement): boolean => {
  return target[CONSTANTS.API_READY];
};
