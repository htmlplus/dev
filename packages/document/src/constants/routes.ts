import * as Constants from '@app/constants';

export const ROUTE = {
  HOME: '/',
  INTRODUCTION_WHAT: `/introduction/what-is-${Constants.PLATFORM_KEY}`,
  INTRODUCTION_WHY: `/introduction/why-${Constants.PLATFORM_KEY}`,
  INSTALLATION: '/installation',
  INSTALLATION_FRAMEWORK: '/[framework]/installation',
  BROWSERS: '/browsers',
  VISION: '/vision',
  JAVASCRIPT_INSTALLATION: '/javascript/installation',
  COMPONENT_DETAILS: '/component/[component]',
  COMPONENT_TRANSITION_PROPERTY_NAME: '/component/transition/names',
  CODEOFCONDUCT: '/code-of-conduct'
} as const;
