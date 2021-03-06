/* eslint-disable */
/* tslint:disable */

/**************************************************
 * THIS FILE IS AUTO-GENERATED, DO NOT EDIT MANUALY
 **************************************************/

import { proxy } from '../proxy';

import '@htmlplus/core/cropper';
import type { PlusCropperJSX as Type } from '@htmlplus/core/types/components/cropper/cropper';

type Rename<T, R extends { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }> = { [P in keyof T as P extends keyof R ? R[P] : P]: T[P] }

type Renamed = Rename<Type, { 
  plusReady: 'onReady',
  plusCrop: 'onCrop',
  plusZoom: 'onZoom',
}>

export const Cropper = /*@__PURE__*/ proxy<HTMLPlusCropperElement, Renamed>(
  'plus-cropper', 
  ['area', 'aspectRatio', 'backdrop', 'background', 'disabled', 'guides', 'indicator', 'mode', 'resizer', 'resizerShape', 'responsive', 'shape', 'src', 'value', 'view', 'zoomable', 'zoomRatio', ], 
  ['plusReady', 'plusCrop', 'plusZoom', ],
);