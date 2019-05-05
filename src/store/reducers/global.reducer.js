import {
  SET_ERROR, SET_SPRINTS, SET_UPDATING_STATUS
} from '../actions/types';

const initialState = {
  isFetching: false,
  isFetchingUsers: false,
  isError: false,
  message: '',
  sprints: [],
  runDate: '',
  updating: false,
  lastUpdated: null,
  lastUpdatedBitbucket: null
};

/**
 * Global state
 * @param {object} action
 * @param {object} [state=initialState]
 * @returns
 */
function globalStore(state = initialState, { type, payload }) {
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        isError: payload.isError,
        message: payload.errorMessage
      };
    case SET_SPRINTS:
      return {
        ...state,
        sprints: payload.map(s => ({
          ...s,
          startDate: new Date(s.startDate).toLocaleDateString('ru-RU'),
          endDate: new Date(s.endDate).toLocaleDateString('ru-RU'),
          projects: []
        }))
      };
    case SET_UPDATING_STATUS:
      return {
        ...state,
        updating: payload.status,
        message: payload.message,
        lastUpdated: payload.date ? new Date(payload.date).toLocaleString('ru-RU') : state.lastUpdated,
        lastUpdatedBitbucket: payload.lastUpdatedBitbucket
          ? new Date(payload.lastUpdatedBitbucket).toLocaleString('ru-RU') : state.lastUpdatedBitbucket,
      };
    default:
      return state;
  }
}

export default globalStore;
