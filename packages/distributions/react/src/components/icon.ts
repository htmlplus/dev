/* eslint-disable */
/* tslint:disable */

/**************************************************
 * THIS FILE IS AUTO-GENERATED, DO NOT EDIT MANUALY
 **************************************************/

import { proxy } from '../proxy';

import '@htmlplus/core/icon';
import type { PlusIconJSX as Type } from '@htmlplus/core/types/components/icon/icon';

type Rename<T, R extends { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }> = { [P in keyof T as P extends keyof R ? R[P] : P]: T[P] }

type Renamed = Rename<Type, { 
}>

export const Icon = /*@__PURE__*/ proxy<HTMLPlusIconElement, Renamed>(
  'plus-icon', 
  ['color', 'flip', 'name', 'rotate', 'size', ], 
  [],
);