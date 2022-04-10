import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';
import { call, isReady, render, task } from '../utils';

const targets = new Map();

export const request = (target: PlusElement, state?): Promise<boolean> => {
  if (!isReady(target)) return Promise.resolve(false);
  let run = targets.get(target);
  if (run) return run(state);
  run = task({
    canStart: (states, state) => {
      return /* hasChange */ true;
    },
    canRun: (states) => {
      return /* shouldUpdate */ true;
    },
    run: (states) => {
      call(target, CONSTANTS.LIFECYCLE_UPDATE, states);
      render(target);
      call(target, CONSTANTS.LIFECYCLE_UPDATED, states);
    }
  });
  targets.set(target, run);
  return run(state);
};
