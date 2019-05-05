import {
  SET_BUILDS, SET_BUILDS_TESTS, SET_FETCHING_BUILDS, SET_FIRST_SELECT,
  SET_SECOND_SELECT, SET_SUCCESS_FILTER, SET_FAILED_FILTER, SET_SEARCH_FIELD,
  SET_PULL_REQUESTS, SET_PR_FILTER, SET_RELEASES, SET_KEY_SORT, CLEAR_BUILDS_FILTER
} from './types';
import {
  getBuilds, getBuildsTests, getPullRequests, getReleasesForHarvester
} from '../../utils/api_v2';
import { getBuildByNum } from '../selectors/builds.selectors';

/**
 * Записать релизы харвестера в стор
 *
 * @param {Array} releases
 */
const setReleases = releases => (
  { type: SET_RELEASES, payload: releases }
);

/**
 * Записать список билдов в стор
 *
 * @param {Array} builds
 */
const setBuilds = builds => (
  { type: SET_BUILDS, payload: builds }
);

/**
 * Записать статусы тестов по выбранным билдам в стор
 *
 * @param {Array} tests
 */
const setBuildsTests = tests => (
  { type: SET_BUILDS_TESTS, payload: tests }
);

/**
 * Установить статус загрузки билдов и тестов
 *
 * @param {boolean} flag
 */
const setFetching = flag => (
  { type: SET_FETCHING_BUILDS, payload: flag }
);

/**
 * установить выбранный билд в первом селекте
 *
 * @param {*} firstBuild
 */
const setFirstSelect = firstBuild => (
  { type: SET_FIRST_SELECT, payload: firstBuild }
);

/**
 * Установить выбранный билд во втором селекте
 *
 * @param {*} secondBuild
 */
const setSecondSelect = secondBuild => (
  { type: SET_SECOND_SELECT, payload: secondBuild }
);

/**
 * Установить фильтр успешных тестов
 */
export const setSuccessFilter = () => (
  { type: SET_SUCCESS_FILTER }
);

/**
 * Установить фильтр неудачных тестов
 */
export const setFailedFilter = () => (
  { type: SET_FAILED_FILTER }
);

export const setSearchField = value => (
  { type: SET_SEARCH_FIELD, payload: value }
);

/**
 * Установить тип сортировки тестов по ключам
 */
export const setSortKeyFilter = () => (
  { type: SET_KEY_SORT }
);

/**
 * Записать пулл реквесты в стор
 */
export const setPullRequests = prs => (
  { type: SET_PULL_REQUESTS, payload: prs }
);

/**
 * Установить фильтр по пул реквесту
 */
export const setFilterPr = pr => (
  { type: SET_PR_FILTER, payload: pr }
);

/**
 * Установить фильтры в дефолтное состояние
 */
export const clearFilters = () => (
  { type: CLEAR_BUILDS_FILTER }
);

/**
 * Выгружаем релизы и записываем в стор
 *
 * @returns
 */
export function fetchReleases() {
  return async dispatch => {
    dispatch(setFetching(true));
    let releases = [];
    try {
      releases = await getReleasesForHarvester();
    } catch (e) {
      releases = [];
      dispatch(setFetching(false));
    } finally {
      dispatch(setReleases(releases));
    }
  };
}

/**
 * Установить выбранный билд в соответствующий селект
 *
 * @export
 * @param {string | object} build - билд или стркоа с номером и датой билда
 * @param {string} selectNum - в какой селект установить
 * @returns
 */
export function setActiveBuild(build, selectNum) {
  return (dispatch, getState) => {
    if (typeof build === 'string') {
      const state = getState();
      const buildNum = build.split(' / ')[0];
      const build1 = getBuildByNum(state, buildNum);
      if (selectNum === 'first' && build1) dispatch(setFirstSelect(build1));
      if (selectNum === 'second' && build1) dispatch(setSecondSelect(build1));
    } else {
      const build1 = getState().buildsStore.builds[build];
      if (selectNum === 'first' && build1) dispatch(setFirstSelect(build1));
      if (selectNum === 'second' && build1) dispatch(setSecondSelect(build1));
    }
  };
}

/**
 * Выгружаем билды и записываем в стор
 *
 * @returns
 */
export function fetchBuilds(releaseName) {
  return async dispatch => {
    dispatch(clearFilters());
    dispatch(setFetching(true));
    let builds = [];
    try {
      builds = await getBuilds(releaseName);
    } catch (e) {
      builds = [];
      dispatch(setFetching(false));
    } finally {
      dispatch(setBuilds(builds));
      dispatch(setActiveBuild(0, 'second'));
      dispatch(setActiveBuild(1, 'first'));
    }
  };
}

/**
 * Получить тесты по выбранным билдам
 *
 * @param {string} firstBuildName
 * @param {string} secondBuildName
 */
export function fetchTests(firstBuildName, secondBuildName, release) {
  return async dispatch => {
    let tests = [];

    dispatch(setFetching(true));
    try {
      const firstBuildNum = parseInt(firstBuildName.split(' / ')[0], 10);
      const secondBuildNum = parseInt(secondBuildName.split(' / ')[0], 10);

      if (secondBuildNum < firstBuildNum) return;

      if (firstBuildNum && secondBuildNum) {
        tests = await getBuildsTests(firstBuildNum, secondBuildNum, release);
      }
    } catch (e) {
      tests = [];
    } finally {
      dispatch(setBuildsTests(tests));
      dispatch(setActiveBuild(firstBuildName, 'first'));
      dispatch(setActiveBuild(secondBuildName, 'second'));
      dispatch(setFetching(false));
    }
  };
}

export function fetchPullRequests(firstBuildName, secondBuildName, activeRelease) {
  return async dispatch => {
    let prs = [];
    try {
      const firstBuildNum = parseInt(firstBuildName.split(' / ')[0], 10);
      const secondBuildNum = parseInt(secondBuildName.split(' / ')[0], 10);

      if (secondBuildNum < firstBuildNum) return;

      if (firstBuildNum && secondBuildNum) {
        prs = await getPullRequests(firstBuildNum, secondBuildNum, activeRelease);
      }
    } catch (e) {
      prs = [];
    } finally {
      dispatch(setPullRequests(prs));
    }
  };
}

export function fetchDataForPage(firstBuildName, secondBuildName, activeRelease) {
  return async dispatch => {
    await dispatch(fetchPullRequests(firstBuildName, secondBuildName, activeRelease));
    await dispatch(fetchTests(firstBuildName, secondBuildName, activeRelease));
  };
}
