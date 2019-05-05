import { createSelector } from 'reselect';

import { getProjectByKey } from './projects.selectors';

/**
 * Получить статус о том, произошла ли какая-нибудь ошибка
 * @param {object} state
 */
export const getIsError = state => state.globalStore.isError;

/**
 * Получить сообщение для выпадашки
 * @param {object} state
 */
export const getMessage = state => state.globalStore.message;

/**
 * Получить статус обновления
 * @param {object} state
 */
export const getUpdatingStatus = state => state.globalStore.updating;

/**
 * Получить дату последнего обновления авто тестов и прогонов
 * @param {object} state
 */
export const getLastUpdatedDate = state => state.globalStore.lastUpdated;

/**
 * Получить дату последнего обновления тестов из битбакета
 * @param {object} state
 */
export const getLustUpdatedBitbucketTestsDate = state => state.globalStore.lastUpdatedBitbucket;

/**
 * Получить дату последнего обновления для страницы
 * @param {object} state
 */
export const getLastUpdatedByRoute = (state, path) => {
  if (path === '/test/state') return getLustUpdatedBitbucketTestsDate(state);
  if (path === '/test/runs-status') return null;
  return getLastUpdatedDate(state);
};

/**
 * Массив спринтов
 * @param {object} state
 */
export const getSprints = state => state.globalStore.sprints;

export const getActualSprint = createSelector(
  [getSprints],
  sprints => (sprints ? sprints.find(s => s.state === 'active') : null)
);

export const setActualSprintId = state => {
  const actualSprint = getActualSprint(state);
  return actualSprint ? actualSprint.id : null;
};

/**
 * Получить массив номеров спринтов
 * @param {object} state
 */
const getSprintsNums = createSelector(
  getSprints,
  sprints => sprints.map(sprint => sprint.id)
);

/**
 * Количество спринтов
 * @param {object} state
 */
const getAmountOfSprints = state => state.globalStore.sprints.length;

/**
 * Получить активый спринт
 * @param {*} state
 */
const findActiveSprint = state => state.globalStore.sprints[0];

/**
 * Id выбранного спринта
 */
const findActiveSprintId = (state, projectKey) => {
  const project = getProjectByKey(state, projectKey);
  return project !== null ? project.activeSprint.id : 0;
};

/**
 * Получить информацию по всем спринтам конкретного проекта
 * @param {object} state
 * @param {string} projectKey
 * @returns
 */
const getSprintInfo = (state, projectKey) => {
  const project = getProjectByKey(state, projectKey);
  const sprintTests = project !== null ? project.sprintsStat : null;
  return sprintTests || [];
};

/**
 * Найти в проекте спринт со статусом show = true, для пагинации
 * @param {object} state
 * @param {string} projectKey
 * @returns
 */
export const findSprintWithShowStatus = (state, projectKey) => {
  const sprintTests = getSprintInfo(state, projectKey);
  return !!sprintTests.find(s => s.show);
};

/**
 * Получить статистику автоматизации проекта за активный спринт
 */
const findSprintInfoBySprintId = (state, sprintId, projectKey) => {
  const sprintsInfo = getSprintInfo(state, projectKey);
  return sprintsInfo ? sprintsInfo.find(s => s.sprint.id === sprintId) : null;
};

/**
 * Получить прогресс автоматизации за активный спринт
 */
const getActiveSprintProgress = (state, projectKey) => {
  const actualSprintId = setActualSprintId(state);
  const sprintInfo = findSprintInfoBySprintId(state, actualSprintId, projectKey);
  return sprintInfo ? sprintInfo.automated : 0;
};

/**
 * Количество автоматизированных тестов за выбранные спринт
 */
const getAutomatedTestsBySprint = (state, projectKey) => {
  const sprintId = findActiveSprintId(state, projectKey);
  const sprintInfo = findSprintInfoBySprintId(state, sprintId + 1, projectKey);
  return sprintInfo ? sprintInfo.automated : 0;
};

const getListOfAutomatedSprintTests = (state, projectKey) => {
  const sprintInfo = getSprintInfo(state, projectKey);
  return sprintInfo.map(s => s.automated);
};

export {
  getAmountOfSprints,
  findActiveSprintId,
  getSprintInfo,
  findActiveSprint,
  getSprintsNums,
  getActiveSprintProgress,
  getAutomatedTestsBySprint,
  getListOfAutomatedSprintTests
};
