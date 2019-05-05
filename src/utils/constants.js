export const NEW_API_BASE = process.env.NODE_ENV === 'production' ? 'http://localhost:8080' : 'http://10.36.6.230:8888';

export const NEW_API_URLS = {
  GET_PROJECT_BY_KEY: key => `/project/${key}`,

  GET_PROJECTS: '/project',

  GET_SPRINTS: '/sprint',

  GET_PROJECT_TEAMS_BY_KEY: key => `/project/${key}/team`,

  GET_PROJECT_SPRINT_STAT: key => `/project/${key}/sprint`,

  GET_RELEASES: '/release',

  GET_CYCLES_BY_RELEASE_NAME: name => `/release/${name}/cycle`,

  GET_CYCLE_TYPES_BY_RELEASE_AND_CYCLE_NUM: (name, cycleNum) => `/release/${name}/cycle/${cycleNum}/cycleType`,

  GET_UPDATING_INFO: '/info',

  GET_TEAM_CYCLES_STATS: (name, cycleNum, cycleType) => `/release/${name}/cycle/${cycleNum}/cycleType/${cycleType}/team`,

  DOWNLOAD_TESTS: projectKey => `/download/${projectKey}/tests`,

  BITBUCKET_TESTS: '/bitbucket/test',

  BUILDS: '/build',

  BUILDS_TESTS: '/build/test',

  BUILDS_PRS: '/build/pull-request',

  BUILDS_RELEASES: '/build/release'
};

export const MESSAGES = {
  MAIN: 'Сервер не доступен или был перезапущен',
  UPDATING: 'Сервер был перезагружен. Данные обновляются из адаптависты. Может занять от 10 до 15 минут',
  FILE_ERROR: 'Ошибка при загрузке файла',
  FILE_DOWNLOADED: 'Файл сохранен'
};

export const PROJECTS = {
  SBBOL: 'СББОЛ',
  IOS: 'IOS',
  ANDRIOD: 'Android',
  WINDOWS: 'Windows',
  SBB: 'СББ',
  SBK: 'СБК',
};

export const PROJECT_TYPES = {
  RELEASE: 'release',
  SPRINT: 'sprint'
};

export const ROUTES = {
  SBBOL: 'sbbol',
  IOS: 'ios',
  ANDRIOD: 'android',
  WINDOWS: 'windows',
  SBB: 'sbb',
  SBK: 'sbk',
  FINTECH: 'fintech'
};

export const PROJECT_KEYS = {
  DCB: 'DCB',
  IOS: 'IOS',
  ANDROID: 'ANDROID',
  WINDOWS: 'WINDOWS',
  SBB: 'SBB',
  SBK: 'SBK',
  FINTECH: 'FINTECH'
};

export const CHART_TYPES = {
  PROGRESS: 'Прогресс',
  RUN: 'Запуск',
  IFT: 'ИФТ',
  REGRESS: 'Регресс'
};

export const TEST_TYPES = {
  REGRESS: 'Регресс',
  IFT: 'ИФТ',
  AUTO: 'АВТО'
};

export const QUERIES = {
  REGRESS: 'regress',
  IFT: 'ift',
  AUTO: 'auto'
};

export const CYCLE_TYPES = {
  regress: 'Regress',
  ift: 'IFT'
};

export const STORAGE_KEYS = {
  STATUS: 'STATUS',
  SPRINTS: 'SPRINTS',
  PROJECT: 'PROJECT',
  PROJECT_SPRINT_STAT: 'PROJECT_SPRINT_STAT',
  RELEASE: 'RELEASE',
  CYCLES: 'CYCLES',
  CYCLES_TYPES: 'CYCLES_TYPES',
  TEAMS_CYCLES_STATS: 'TEAMS_CYCLES_STATS',
  PROJECT_TEAMS: 'PROJECT_TEAMS',
  UPDATED_DATE: 'UPDATED_DATE',
  BUILDS: 'BUILDS',
  BUILDS_TESTS: 'BUILDS_TESTS'
};
