import {
  SET_ERROR, SET_SPRINTS, SET_UPDATING_STATUS
} from './types';

import { STORAGE_KEYS, MESSAGES } from '../../utils/constants';

import { getSprints, getUpdatingInfo } from '../../utils/api_v2';
import { saveToStorage, getFromStorage } from '../../utils/cache-manager';

import {
  changeActiveSprint, setShowSprintInfo, fetchProjectByKey,
  fetchReleases, fetchProjectTeams
} from './projects.actions';
import { getProjectsKeysList } from '../selectors/projects.selectors';
import { setActualSprintId, getSprints as getSprintsFromStore } from '../selectors/global.selectors';

/**
 * Записать в стор стэйт ошибки
 * @param {boolean} isError
 * @param {string} errorMessage
 */
const setError = (isError, errorMessage) => (
  { type: SET_ERROR, payload: { isError, errorMessage } }
);

const setSptints = sprints => (
  { type: SET_SPRINTS, payload: sprints }
);

const setUpdatingStatus = (status, date = null, lastUpdatedBitbucket = null, message = '') => (
  {
    type: SET_UPDATING_STATUS,
    payload: {
      status, message, date, lastUpdatedBitbucket
    }
  }
);

/**
 * Установить активный спринт. Если активного нет, установить последний
 *
 * @returns
 */
function setDefaultSprint() {
  return (dispatch, getState) => {
    const findActualSprintId = setActualSprintId(getState());
    const sprints = getSprintsFromStore(getState());
    const projects = getProjectsKeysList(getState());
    return projects.forEach(p => {
      const actualSprint = findActualSprintId ? findActualSprintId - 1 : sprints[sprints.length - 1];
      dispatch(changeActiveSprint(actualSprint || 1, p));
      dispatch(setShowSprintInfo(false, p));
    });
  };
}

/**
 * выгрузить спринты
 */
function fetchSprints() {
  return async dispatch => {
    let sprints;

    try {
      sprints = await getSprints();
      if (sprints && Array.isArray(sprints)) saveToStorage(STORAGE_KEYS.SPRINTS, sprints);
    } catch (e) {
      sprints = await getFromStorage(STORAGE_KEYS.SPRINTS);
    } finally {
      if (sprints && Array.isArray(sprints)) {
        dispatch(setSptints(sprints));
        dispatch(setDefaultSprint());
      } else {
        dispatch(setSptints([]));
      }
    }
  };
}

function fetchUpdatingStatus() {
  return async dispatch => {
    dispatch(setUpdatingStatus(false));

    const storageKey = `${STORAGE_KEYS.UPDATED_DATE}`;
    let data;
    try {
      data = await getUpdatingInfo();
      if (data) saveToStorage(storageKey, data);
    } catch (e) {
      data = await getFromStorage(storageKey);
    } finally {
      if (data) {
        dispatch(setUpdatingStatus(data.updating, data.lastUpdated, data.lastUpdatedBitbucket, MESSAGES.UPDATING));
      }
    }
  };
}

function fullUpdate(cycleType) {
  return (dispatch, getState) => {
    dispatch(setError(false, ''));
    const projectKeys = getProjectsKeysList(getState());
    dispatch(fetchUpdatingStatus());
    dispatch(fetchSprints());
    projectKeys.forEach(k => {
      dispatch(fetchProjectByKey(k));
      dispatch(fetchProjectTeams(k));
    });
    dispatch(fetchReleases('DCB', cycleType));
  };
}

export {
  setError,
  fetchSprints,
  setDefaultSprint,
  fetchUpdatingStatus,
  fullUpdate
};
