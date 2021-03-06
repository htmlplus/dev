/* eslint-disable */
/* tslint:disable */

/**************************************************
 * THIS FILE IS AUTO-GENERATED, DO NOT EDIT MANUALY
 **************************************************/

import { proxy } from '../proxy';

import '@htmlplus/core/drawer';
import type { PlusDrawerJSX as Type } from '@htmlplus/core/types/components/drawer/drawer';

type Rename<T, R extends { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }> = { [P in keyof T as P extends keyof R ? R[P] : P]: T[P] }

type Renamed = Rename<Type, { 
  plusClose: 'onClose',
  plusClosed: 'onClosed',
  plusOpen: 'onOpen',
  plusOpened: 'onOpened',
}>

export const Drawer = /*@__PURE__*/ proxy<HTMLPlusDrawerElement, Renamed>(
  'plus-drawer', 
  ['animation', 'backdrop', 'breakpoint', 'connector', 'mini', 'miniSize', 'open', 'persistent', 'placement', 'flexible', 'size', 'temporary', ], 
  ['plusClose', 'plusClosed', 'plusOpen', 'plusOpened', ],
);