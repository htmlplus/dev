/* eslint-disable */
/* tslint:disable */

/**************************************************
 * THIS FILE IS AUTO-GENERATED, DO NOT EDIT MANUALY
 **************************************************/

import { proxy } from '../proxy';

import '@htmlplus/core/dialog-content';
import type { PlusDialogContentJSX as Type } from '@htmlplus/core/types/components/dialog-content/dialog-content';

type Rename<T, R extends { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }> = { [P in keyof T as P extends keyof R ? R[P] : P]: T[P] }

type Renamed = Rename<Type, { 
}>

export const DialogContent = /*@__PURE__*/ proxy<HTMLPlusDialogContentElement, Renamed>(
  'plus-dialog-content', 
  ['scrollable', ], 
  [],
);