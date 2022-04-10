import { on, off } from './event';
import { isEvent } from './is-event';
import { toEvent } from './to-event';
import { updateAttribute } from './update-attribute';

export const sync = (node: HTMLElement) => {
  let prev: any = {};
  return (next: any = {}) => {
    const prevClass = (prev.class || '').split(' ');
    const nextClass = (next.class || '').split(' ');

    const newClass = node.className
      .split(' ')
      .filter((key) => !prevClass.includes(key) && !nextClass.includes(key))
      .concat(nextClass)
      .filter((key) => key)
      .join(' ');

    updateAttribute(node, 'class', newClass || undefined);

    if (prev.style || next.style) node.setAttribute('style', next.style || '');

    for (const key in prev) isEvent(key) && off(node, toEvent(key), prev[key]);

    for (const key in next) {
      if (['class', 'style'].includes(key)) continue;
      if (isEvent(key)) on(node, toEvent(key), next[key]);
      else updateAttribute(node, key, next[key]);
    }

    prev = { ...next };
  };
};
