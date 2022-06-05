import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import glob from 'fast-glob';
import fs from 'fs';

import { components } from '@app/data';

const ComponentCodesandbox = ({ content }: any) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ComponentCodesandbox;

export const getStaticProps: GetStaticProps = async (context) => {
  const { example, framework, key } = context.params || {};
  const content = fs.readFileSync(`../examples.new/src/${key}/${example}/codesandbox/${framework}.html`, 'utf8');
  return {
    props: { content }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // glob.sync(`../examples.new/src/*/*/codesandbox/*.html`)
  return {
    paths: components.map((component: any) => `/react/component/${component.key}/default/codesandbox`),
    fallback: false
  };
};
