import { host } from './host.js';

export const query = (target, selector: string) => host(target).querySelector(selector);