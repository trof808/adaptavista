import { SET_TESTS, SET_FETCHING, SET_SEARCH_FILTER } from '../actions/types';

const initialState = {
  tests: [],
  isFetching: false,
  totalElements: 0
};

const bitbucketTests = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TESTS:
      return {
        ...state,
        tests: payload.tests,
        totalElements: payload.totalElements
      };
    case SET_FETCHING:
      return {
        ...state,
        isFetching: payload
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: payload
      };
    default:
      return state;
  }
};

export default bitbucketTests;
