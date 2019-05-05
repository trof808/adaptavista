import { connect } from 'react-redux';
import TestStatePage from './test-state.page';

import {
  getBitbucketTests, getFetchingStatus, getTotalElements
} from '../../store/selectors/tests.selectors';
import { fetchBitbucketTests, setSearchFilter } from '../../store/actions/tests.actions';
import { fetchUpdatingStatus } from '../../store/actions/global.actions';

const mapStateToProps = state => ({
  tests: getBitbucketTests(state),
  isFetchingTests: getFetchingStatus(state),
  totalElements: getTotalElements(state)
});

const mapDispatchToProps = dispatch => ({
  fetchBitbucketTests: (page, perPage, searchString) => dispatch(fetchBitbucketTests(page, perPage, searchString)),
  setSearchFilter: searchFilter => dispatch(setSearchFilter(searchFilter)),
  fetchUpdatingStatus: () => dispatch(fetchUpdatingStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(TestStatePage);
