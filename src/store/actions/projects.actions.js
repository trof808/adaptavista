import uniqBy from 'lodash/uniqBy';
import {
  SET_FIRST_PAGE_INFO, SET_RELEASES_INFO, SET_CHOOSED_RELEASE,
  SET_CHOOSED_CYCLE, SET_PROJECT_FETCHING, SET_CYCLES,
  SET_RELEASE_FETCHING, SET_CYCLE_TYPES, SET_TEAMS_FETCHING,
  SET_TEAMS, CHANGE_ACTIVE_SPRINT, SET_PROJECT_SPRINT_STAT,
  SET_SHOW_SPRINT_INFO, SET_TEAMS_CYCLE_STATS
} from './types';

import {
  getLastRelease, getActiveSprintId,
  getSprintShowStatus
} from '../selectors/projects.selectors';

import { findSprintWithShowStatus } from '../selectors/global.selectors';

import { setDefaultSprint, setError } from './global.actions';

import { MESSAGES, STORAGE_KEYS } from '../../utils/constants';
import { saveToStorage, getFromStorage } from '../../utils/cache-manager';
import {
  getProjectByKey, getReleases, getCyclesByReleaseName,
  getCycleTypes, getProjectTeams, getProjectSprintStat,
  getTeamsCycleStats, downloadTestsStatistic
} from '../../utils/api_v2';


/**
 * Записать инфу о статусе автоматизации
 * @param {object} payload
 * @param {string} projectKey
 */
const setAutomatedStatus = (info, projectKey) => (
  { type: SET_FIRST_PAGE_INFO, payload: { info, projectKey } }
);

/**
 * Записать в стор инфу о релизах
 * @param {*} releases
 */
const setReleasesInfo = (releases, projectKey) => (
  { type: SET_RELEASES_INFO, payload: { releases, projectKey } }
);

const setChoosedRelease = (releaseName, projectKey) => (
  { type: SET_CHOOSED_RELEASE, payload: { releaseName, projectKey } }
);

const setReleaseCycles = (releaseName, cycles, projectKey) => (
  { type: SET_CYCLES, payload: { releaseName, cycles, projectKey } }
);

const setChoosedCycle = (cycleNum, releaseName, projectKey) => (
  { type: SET_CHOOSED_CYCLE, payload: { cycleNum, releaseName, projectKey } }
);

const setReleaseFetching = (projectKey, flag) => (
  { type: SET_RELEASE_FETCHING, payload: { projectKey, flag } }
);

const setCycleTypes = (cycleTypes, projectKey) => (
  { type: SET_CYCLE_TYPES, payload: { cycleTypes, projectKey } }
);

/**
 * Статус загрузки проекта
 * @param {string} projectKey
 * @param {boolean} flag
 */
const setProjectFetching = (projectKey, flag) => (
  { type: SET_PROJECT_FETCHING, payload: { projectKey, flag } }
);

const setTeamsFetching = (projectKey, flag) => (
  { type: SET_TEAMS_FETCHING, payload: { projectKey, flag } }
);

const setTeams = (teams, projectKey) => (
  { type: SET_TEAMS, payload: { teams, projectKey } }
);

/**
 * Изменить выбранный спринт
 */
const changeActiveSprint = (sprintNum = 0, projectKey = '') => (
  { type: CHANGE_ACTIVE_SPRINT, payload: { sprintNum, projectKey } }
);

const setProjectSprintStat = (stat, projectKey) => (
  { type: SET_PROJECT_SPRINT_STAT, payload: { stat, projectKey } }
);

export const setShowSprintInfo = (flag, projectKey, sprintId = null) => (
  { type: SET_SHOW_SPRINT_INFO, payload: { flag, projectKey, sprintId } }
);

const setTeamsCyclesStats = (stats, projectKey) => (
  { type: SET_TEAMS_CYCLE_STATS, payload: { stats, projectKey } }
);

/**
 * Поменять спринт у проекта
 */
function changeProjectSprint(projectKey = null, sprintId = null) {
  return (dispatch, getState) => {
    const state = getState();
    if (sprintId === null) {
      if (findSprintWithShowStatus(state, projectKey)) {
        dispatch(setDefaultSprint());
      }
    } else {
      const activeSprintId = getActiveSprintId(getState(), projectKey);
      if (activeSprintId === sprintId) {
        const activeSprintStatus = getSprintShowStatus(getState(), projectKey);
        dispatch(setShowSprintInfo(!activeSprintStatus, projectKey, sprintId + 1));
      } else {
        dispatch(setDefaultSprint());
        dispatch(changeActiveSprint(sprintId, projectKey));
        dispatch(setShowSprintInfo(true, projectKey, sprintId + 1));
      }
    }
  };
}

/**
 * загрузить информацию по проекту
 */
function fetchProjectByKey(projectKey) {
  return async dispatch => {
    dispatch(setProjectFetching(projectKey, true));
    let project;
    let projectSprintStat;
    return setTimeout(async () => {
      try {
        project = await getProjectByKey(projectKey);
        projectSprintStat = await getProjectSprintStat(projectKey);

        if (project) saveToStorage(`${STORAGE_KEYS.PROJECT}_${projectKey}`, project);
        if (projectSprintStat) saveToStorage(`${STORAGE_KEYS.PROJECT_SPRINT_STAT}_${projectKey}`, projectSprintStat);
      } catch (e) {
        project = await getFromStorage(`${STORAGE_KEYS.PROJECT}_${projectKey}`);
        projectSprintStat = await getFromStorage(`${STORAGE_KEYS.PROJECT_SPRINT_STAT}_${projectKey}`);
      } finally {
        if (project) dispatch(setAutomatedStatus(project, projectKey));
        if (projectSprintStat) dispatch(setProjectSprintStat(projectSprintStat, projectKey));
        dispatch(setProjectFetching(projectKey, false));
      }
    }, 0);
  };
}

function fetchTeamsCycleStats(name, cycleNum, projectKey, cycleType) {
  return async dispatch => {
    dispatch(setTeamsFetching(projectKey, true));

    const storageKey = `${STORAGE_KEYS.TEAMS_CYCLES_STATS}_${projectKey}_${name}_${cycleNum}_${cycleType}`;
    let teamsCyclesStats;
    try {
      teamsCyclesStats = await getTeamsCycleStats(name, cycleNum, cycleType);
      if (teamsCyclesStats && Array.isArray(teamsCyclesStats)) saveToStorage(storageKey, teamsCyclesStats);
    } catch (e) {
      teamsCyclesStats = await getFromStorage(storageKey);
    } finally {
      if (teamsCyclesStats && Array.isArray(teamsCyclesStats)) {
        dispatch(setTeamsCyclesStats(teamsCyclesStats, projectKey));
      }
      dispatch(setTeamsFetching(projectKey, false));
    }
  };
}

/**
 * зарузить информацию по сиклу для ифт и регресс
 */
function fetchActiveCycle(cycleNum, releaseName, projectKey, cycleType) {
  return async dispatch => {
    dispatch(setReleaseFetching(projectKey, true));
    dispatch(setChoosedCycle(cycleNum, releaseName, projectKey));

    const storageKey = `${STORAGE_KEYS.CYCLES_TYPES}_${projectKey}_${cycleNum}_${releaseName}_${cycleType}`;
    let cyclesTypes;

    try {
      cyclesTypes = await getCycleTypes(releaseName, cycleNum);
      if (cyclesTypes && Array.isArray(cyclesTypes)) saveToStorage(storageKey, cyclesTypes);
    } catch (e) {
      cyclesTypes = await getFromStorage(storageKey);
    } finally {
      if (cyclesTypes && Array.isArray(cyclesTypes)) {
        dispatch(setCycleTypes(cyclesTypes, projectKey));
        if (cycleType) {
          dispatch(fetchTeamsCycleStats(releaseName, cycleNum, projectKey, cycleType));
        }
      }
      dispatch(setReleaseFetching(projectKey, false));
    }
  };
}

/**
 * загрузить циклы по релизу
 */
function fetchCycles(name, projectKey, cycleType) {
  return async dispatch => {
    const storageKey = `${STORAGE_KEYS.CYCLES}_${projectKey}_${name}_${cycleType}`;
    let cycles;

    try {
      cycles = await getCyclesByReleaseName(name);
      if (cycles && Array.isArray(cycles)) saveToStorage(storageKey, cycles);
    } catch (e) {
      cycles = await getFromStorage(storageKey);
    } finally {
      if (cycles && Array.isArray(cycles)) {
        const findActualCycle = cycles.find(c => c.actual);
        const uniqCycles = uniqBy(cycles, 'cyleNum');
        dispatch(setReleaseCycles(name, uniqCycles, projectKey));
        const lastCycleNum = findActualCycle ? findActualCycle.cyleNum : cycles[0].cyleNum;
        dispatch(fetchActiveCycle(lastCycleNum, name, projectKey, cycleType));
      }
    }
  };
}

/**
 * загрузить релизы
 */
function fetchReleases(projectKey, cycleType) {
  return async (dispatch, getState) => {
    dispatch(setProjectFetching(projectKey, true));
    const storageKey = `${STORAGE_KEYS.RELEASE}_${projectKey}`;
    let release;
    try {
      release = await getReleases();
      if (release) saveToStorage(storageKey, release);
    } catch (e) {
      release = await getFromStorage(storageKey);
    } finally {
      if (release) {
        dispatch(setReleasesInfo(release, projectKey));
        const activeRelease = getLastRelease(getState(), projectKey);
        if (activeRelease) {
          dispatch(setChoosedRelease(activeRelease.name, projectKey));
          dispatch(fetchCycles(activeRelease.name, projectKey, cycleType));
        }
      }
      dispatch(setProjectFetching(projectKey, false));
    }
  };
}

export function handleChageRelease(releaseName, projectKey, cycleType) {
  return async dispatch => {
    dispatch(setChoosedRelease(releaseName, projectKey));
    dispatch(fetchCycles(releaseName, projectKey, cycleType));
  };
}

/**
 * загрузить информацию по командам
 */
function fetchProjectTeams(projectKey) {
  return async dispatch => {
    dispatch(setTeamsFetching(projectKey, true));

    const storageKey = `${STORAGE_KEYS.PROJECT_TEAMS}_${projectKey}`;
    let teams;

    try {
      teams = await getProjectTeams(projectKey);
      if (teams && Array.isArray(teams)) saveToStorage(storageKey, teams);
    } catch (e) {
      teams = await getFromStorage(storageKey);
    } finally {
      if (teams && Array.isArray(teams)) {
        dispatch(setTeams(teams, projectKey));
      }
      dispatch(setTeamsFetching(projectKey, false));
    }
  };
}


function fetchDownloadingTestsStats(projectKey) {
  return dispatch => {
    dispatch(setError(false, ''));
    downloadTestsStatistic(projectKey)
      .then(data => window.open(data.request.responseURL))
      .catch(() => dispatch(setError(true, MESSAGES.FILE_ERROR)));
  };
}

export {
  fetchProjectByKey,
  fetchReleases,
  setChoosedCycle,
  fetchActiveCycle,
  setChoosedRelease,
  fetchProjectTeams,
  changeActiveSprint,
  changeProjectSprint,
  fetchTeamsCycleStats,
  fetchDownloadingTestsStats
};
