import {
  ROUTES, PROJECTS, PROJECT_KEYS, QUERIES, CYCLE_TYPES
} from './constants';

const getProjectNameByRoute = route => {
  switch (route) {
    case ROUTES.SBBOL:
      return PROJECTS.SBBOL;
    case ROUTES.IOS:
      return PROJECTS.IOS;
    case ROUTES.ANDRIOD:
      return PROJECTS.ANDRIOD;
    case ROUTES.WINDOWS:
      return PROJECTS.WINDOWS;
    case ROUTES.SBB:
      return PROJECTS.SBB;
    case ROUTES.FINTECH:
      return PROJECT_KEYS.FINTECH;
    default:
      return PROJECTS.SBBOL;
  }
};

const getProjectKeyByRoute = route => {
  switch (route) {
    case ROUTES.SBBOL:
      return PROJECT_KEYS.DCB;
    case ROUTES.IOS:
      return PROJECT_KEYS.IOS;
    case ROUTES.ANDRIOD:
      return PROJECT_KEYS.ANDROID;
    case ROUTES.WINDOWS:
      return PROJECT_KEYS.WINDOWS;
    case ROUTES.SBB:
      return PROJECT_KEYS.SBB;
    case ROUTES.FINTECH:
      return PROJECT_KEYS.FINTECH;
    default:
      return PROJECT_KEYS.SBBOL;
  }
};

export const getCycleTypeByPage = route => {
  if (route === QUERIES.IFT) {
    return CYCLE_TYPES.ift;
  }
  return CYCLE_TYPES.regress;
};

export function isAutoTests(testType) {
  return testType === QUERIES.AUTO;
}

export {
  getProjectNameByRoute,
  getProjectKeyByRoute
};
