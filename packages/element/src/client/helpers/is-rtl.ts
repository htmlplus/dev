import { PlusElement } from '../../types';
import { direction } from './direction';

export const isRTL = (target: PlusElement): boolean => direction(target) == 'rtl';
