import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';

export const getStyles = (target: PlusElement): string | undefined => {
  return target.constructor[CONSTANTS.STATIC_STYLES] ?? target[CONSTANTS.STATIC_STYLES];
};
