/* eslint-disable */
/* tslint:disable */

/**************************************************
 * THIS FILE IS AUTO-GENERATED, DO NOT EDIT MANUALY
 **************************************************/

import { proxy } from '../proxy';

import '@htmlplus/core/tabs';
import type { PlusTabsJSX as Type } from '@htmlplus/core/types/components/tabs/tabs';

type Rename<T, R extends { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }> = { [P in keyof T as P extends keyof R ? R[P] : P]: T[P] }

type Renamed = Rename<Type, { 
  plusChange: 'onChange',
}>

export const Tabs = /*@__PURE__*/ proxy<HTMLPlusTabsElement, Renamed>(
  'plus-tabs', 
  ['value', 'vertical', 'connector', ], 
  ['plusChange', ],
);