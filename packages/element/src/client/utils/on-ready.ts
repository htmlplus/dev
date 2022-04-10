import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';

export function onReady(target: PlusElement, callback: (this) => void): void {
  (target[CONSTANTS.API_SETUP] ??= []).push(callback);
}
