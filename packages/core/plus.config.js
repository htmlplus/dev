import {
  attach,
  customElementReact,
  extract,
  parse,
  print,
  read,
  style,
  uhtml,
  validate
} from '@htmlplus/element/compiler';

export default [
  read(),
  parse(),
  validate(),
  extract({
    prefix: 'plus'
  }),
  style({
    sass: {
      loadPaths: ['./src/styles']
    }
  }),
  attach(),
  uhtml(),
  print(),
  customElementReact({
    compact: true,
    dist: '../proxies/react',
    eventName(eventName) {
      return eventName.replace(/plus(\S*)/g, (match, group) => group.charAt(0).toLowerCase() + group.substr(1));
    },
    importerComponent(context) {
      return `@htmlplus/core/dist/components/${context.fileName}/${context.fileName}#${context.componentClassName}`;
    },
    importerComponentType(context) {
      return `@htmlplus/core/dist/components/${context.fileName}/${context.fileName}#${context.componentClassName}JSX`;
    }
  })
];
