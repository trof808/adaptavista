import axios from 'axios';
import { NEW_API_BASE, NEW_API_URLS } from './constants';

async function fetchData(url, params = {}) {
  const newUrl = NEW_API_BASE + url;
  const result = await axios.get(newUrl, { params });
  if (result.data) {
    return result.data;
  }
  return Promise.reject(`Не удалось загрузить ${url}`);
}

function fetchFile(url) {
  const newUrl = NEW_API_BASE + url;
  return axios.get(newUrl)
    .then(response => response)
    .catch(error => {
      console.log(error);
    });
}

/**
 * Получить все спринты
 * @returns {object[]} - массив спринтов
 */
export function getSprints() {
  return fetchData(NEW_API_URLS.GET_SPRINTS).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить информацию проекта по ключу
 * @param {string} projectKey - ключ проета
 * @returns {object}
 */
export function getProjectByKey(projectKey) {
  return fetchData(`${NEW_API_URLS.GET_PROJECTS}/${projectKey}`).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить все имена и ключи проектов
 * @returns - массив проектов
 */
export function getProjects() {
  return fetchData(NEW_API_URLS.GET_PROJECTS).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить команды проекта
 * @param {string} projectKey - ключ проекта
 * @returns {object[]} - массив команд
 */
export function getProjectTeams(projectKey) {
  return fetchData(NEW_API_URLS.GET_PROJECT_TEAMS_BY_KEY(projectKey)).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить статистику тестировани по спринтам для команды
 * @param {string} projectKey - ключ проекта
 * @returns {object[]} - массив спринтов со статистикой
 */
export function getProjectSprintStat(projectKey) {
  return fetchData(NEW_API_URLS.GET_PROJECT_SPRINT_STAT(projectKey)).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить все названия релизов
 * @returns {object[]} - массив релизов
 */
export function getReleases() {
  return fetchData(NEW_API_URLS.GET_RELEASES).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить циклы релиза
 * @param {string} releaseName - название релиза
 * @returns
 */
export function getCyclesByReleaseName(releaseName) {
  return fetchData(NEW_API_URLS.GET_CYCLES_BY_RELEASE_NAME(releaseName)).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить статистику по типам циклов
 * @param {string} releaseName - название релиза
 * @param {int} cycleNum - номер цикла
 * @returns
 */
export function getCycleTypes(releaseName, cycleNum) {
  return fetchData(NEW_API_URLS.GET_CYCLE_TYPES_BY_RELEASE_AND_CYCLE_NUM(releaseName, cycleNum)).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить статус обновления из адаптависты
 */
export function getUpdatingInfo() {
  return fetchData(NEW_API_URLS.GET_UPDATING_INFO).catch(err => {
    throw new Error(err);
  });
}

/**
 * Получить статистику команд по прогону
 */
export function getTeamsCycleStats(name, cycleNum, cycleType) {
  return fetchData(NEW_API_URLS.GET_TEAM_CYCLES_STATS(name, cycleNum, cycleType)).catch(err => {
    throw new Error(err);
  });
}

/**
 * Загрузить файл со статистикой по тестам
 */
export function downloadTestsStatistic(projectKey) {
  return fetchFile(NEW_API_URLS.DOWNLOAD_TESTS(projectKey));
}

/**
 * Загрузить список билдов
 */
export function getBuilds(releaseName) {
  return fetchData(NEW_API_URLS.BUILDS, { releaseName }).catch(err => {
    throw new Error(err);
  });
}

/**
 * Загрузить тесты по выбранным билдам
 *
 * @param {number} firstBuild
 * @param {number} lastBuild
 * @param {string} release
 */
export function getBuildsTests(firstBuild, lastBuild, release) {
  return fetchData(NEW_API_URLS.BUILDS_TESTS, { firstBuild, lastBuild, release }).catch(err => {
    throw new Error(err);
  });
}

/**
 * Загрузить пулл реквесты по выбранным билдам
 *
 * @param {number} firstBuild
 * @param {number} lastBuild
 * @param {string} release
 */
export function getPullRequests(firstBuild, lastBuild, release) {
  return fetchData(NEW_API_URLS.BUILDS_PRS, { firstBuild, lastBuild, release }).catch(err => {
    throw new Error(err);
  });
}

/**
 * Загрузить релизы для харвестера
 */
export function getReleasesForHarvester() {
  return fetchData(NEW_API_URLS.BUILDS_RELEASES).catch(err => {
    throw new Error(err);
  });
}

export function getBitbucketTestList(page, perPage, searchString = '') {
  return fetchData(NEW_API_URLS.BITBUCKET_TESTS, { search: searchString, page, perPage }).catch(err => {
    throw new Error(err);
  });
}
