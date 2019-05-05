import { getBitbucketTestList } from '../../utils/api_v2';
import { SET_TESTS, SET_FETCHING, SET_SEARCH_FILTER } from './types';


const setBitbucketTests = (tests, totalElements) => (
  { type: SET_TESTS, payload: { tests, totalElements } }
);

const setFetchingTestsStatus = status => (
  { type: SET_FETCHING, payload: status }
);

export const setSearchFilter = searchFilter => (
  { type: SET_SEARCH_FILTER, payload: searchFilter }
);

export function fetchBitbucketTests(page = 0, perPage = 10, searchString = '') {
  return async dispatch => {
    dispatch(setFetchingTestsStatus(true));
    const tests = [];
    try {
      const data = await getBitbucketTestList(page, perPage, searchString);
      dispatch(setBitbucketTests(data.content, data.totalElements));
    } catch (e) {
      dispatch(setBitbucketTests(tests));
    } finally {
      dispatch(setFetchingTestsStatus(false));
    }
  };
}
