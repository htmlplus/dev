import { toKebabCase } from './to-kebab-case.js';

export const updateAttribute = (node, key, value) => {

    key = toKebabCase(key);

    if (value === undefined) {
        node.removeAttribute(key);
    }
    else if (value === null) {
        node.removeAttribute(key);
    }
    else if (value === false) {
        node.removeAttribute(key);
    }
    else if (value === true) {
        node.setAttribute(key, '');
    }
    else {
        node.setAttribute(key, value);
    }
}