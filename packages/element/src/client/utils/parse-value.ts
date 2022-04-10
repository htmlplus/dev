import * as CONSTANTS from '../../configs/constants';
import { toBoolean } from './to-boolean';

// TODO: input type & validate date
export const parseValue = (value: any, type: any): any => {
  switch (type) {
    case CONSTANTS.TYPE_BOOLEAN:
      return toBoolean(value);
    case CONSTANTS.TYPE_DATE:
      return new Date(value);
    case CONSTANTS.TYPE_NUMBER:
      return parseFloat(value);
    default:
      return value;
  }
};
