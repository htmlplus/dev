import { PropertyOptions } from './property-options.js';

export interface Api {
  ready: boolean;
  host(): HTMLElement;
  render(): void;
}
