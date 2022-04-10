import { html, render as renderer } from 'uhtml';

import * as CONSTANTS from '../../configs/constants';
import { PlusElement } from '../../types';
import { call } from './call';
import { getStyles } from './get-styles';
import { host } from './host';

export const render = (target: PlusElement): void => {
  const element = host(target);
  renderer(element.shadowRoot!, () => {
    const markup = call(target, CONSTANTS.METHOD_RENDER);
    const styles = getStyles(target);
    if (!styles && !markup) return html``;
    if (!styles) return markup;
    if (!markup) return html`<style>${styles}</style>`;
    return html`<style>${styles}</style>${markup}`;
  });
};
