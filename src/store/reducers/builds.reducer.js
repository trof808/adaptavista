// @flow

import {
  SET_BUILDS, SET_BUILDS_TESTS, SET_FETCHING_BUILDS, SET_FIRST_SELECT, SET_SECOND_SELECT,
  SET_SUCCESS_FILTER, SET_FAILED_FILTER, SET_SEARCH_FIELD, SET_PULL_REQUESTS, SET_PR_FILTER,
  SET_RELEASES, SET_KEY_SORT, CLEAR_BUILDS_FILTER
} from '../actions/types';

type Build = {
    +id: number,
    +name: string,
    +buildNum: number,
    +link: string,
    +startDate: string
}

type Filters = {
  +showSuccess: boolean,
  +showFailed: boolean,
  +search: string,
  +activePr: string,
  +sortKeys: string
}

type State = {
  +releases: Array<{
    +id: number,
    +name: string
  }>,
  +builds: Array<Build>,
  +tests: Array<{
    +id: number,
    +key: string,
    +status: string,
    +firstBuild: string,
    +lastBuild: string,
    +parentUid: string,
    +uid: string,
    +prList: Array<string>
  }>,
  +prs: Array<{
    +id: number,
    +prId: string,
    +firstBuild: string,
    +lastBuild: string
  }>,
  +firstChoosedBuild: Build,
  +secondChoosedBuild: Build,
  +filters: Filters,
  +isFetching: boolean
}

const initialState: State = {
  releases: [],
  builds: [],
  tests: [],
  prs: [],
  firstChoosedBuild: {},
  secondChoosedBuild: {},
  filters: {
    showSuccess: false,
    showFailed: false,
    search: '',
    activePr: '',
    sortKeys: true
  },
  isFetching: true,
};

/**
 * Редюсер для билдов и для тестов по этим билдам
 *
 * @param {*} [state=initialState]
 * @param {*} { type, payload }
 * @returns
 */
const builds = (state: State = initialState, { type, payload }: {type: string, payload: any}) => {
  switch (type) {
    case SET_RELEASES:
      return { ...state, releases: payload };
    case SET_BUILDS:
      return {
        ...state,
        builds: payload.map(build => ({
          ...build,
          startDate: new Date(build.startDate).toLocaleDateString('ru-RU')
        }))
      };
    case SET_BUILDS_TESTS:
      return { ...state, tests: payload };

    case SET_FETCHING_BUILDS:
      return { ...state, isFetching: payload };

    case SET_FIRST_SELECT:
      return { ...state, firstChoosedBuild: payload };
    case SET_PULL_REQUESTS:
      return { ...state, prs: payload };
    case SET_SECOND_SELECT:
      return { ...state, secondChoosedBuild: payload };
    case SET_SUCCESS_FILTER:
      return { ...state, filters: { ...state.filters, showSuccess: !state.filters.showSuccess } };
    case SET_FAILED_FILTER:
      return { ...state, filters: { ...state.filters, showFailed: !state.filters.showFailed } };
    case SET_SEARCH_FIELD:
      return { ...state, filters: { ...state.filters, search: payload } };
    case SET_PR_FILTER:
      return { ...state, filters: { ...state.filters, activePr: state.filters.activePr !== payload ? payload : '' } };
    case SET_KEY_SORT:
      return { ...state, filters: { ...state.filters, sortKeys: !state.filters.sortKeys } };
    case CLEAR_BUILDS_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          showSuccess: false,
          showFailed: false,
          search: '',
          activePr: '',
          sortKeys: true
        }
      };
    default:
      return state;
  }
};

export default builds;
