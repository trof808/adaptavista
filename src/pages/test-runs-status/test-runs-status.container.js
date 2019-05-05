import { connect } from 'react-redux';
import TestRunsStatusPage from './test-runs-status.page';

import {
  getBuilds, getIsFetchingStatus, getBuildsNumsAndDates,
  getFirstSelectActiveValue, getSecondSelectActiveValue,
  getFilteredTests, getFilters, getPullRequestsList,
  getReleases
} from '../../store/selectors/builds.selectors';
import {
  fetchBuilds, setActiveBuild, setSuccessFilter,
  setFailedFilter, setSearchField, fetchDataForPage,
  setFilterPr, fetchReleases, setSortKeyFilter
} from '../../store/actions/builds.actions';

const mapStateToProps = state => ({
  builds: getBuilds(state),
  buildsNumsAndDates: getBuildsNumsAndDates(state),
  firstSelectValue: getFirstSelectActiveValue(state),
  secondSelectValue: getSecondSelectActiveValue(state),
  isFetching: getIsFetchingStatus(state),
  tests: getFilteredTests(state),
  filters: getFilters(state),
  prs: getPullRequestsList(state),
  releases: getReleases(state)
});

const mapDispatchToProps = dispatch => ({
  fetchBuilds: releaseName => dispatch(fetchBuilds(releaseName)),
  setActiveBuild: (build, selectNum) => dispatch(setActiveBuild(build, selectNum)),
  setSuccessFilter: () => dispatch(setSuccessFilter()),
  setFailedFilter: () => dispatch(setFailedFilter()),
  setSearchField: value => dispatch(setSearchField(value)),
  fetchDataForPage: (firstBuildName, secondBuildName, activeRelease) => dispatch(fetchDataForPage(firstBuildName, secondBuildName, activeRelease)),
  handleFilterPr: pr => dispatch(setFilterPr(pr)),
  fetchReleases: () => dispatch(fetchReleases()),
  setSortKeyFilter: () => dispatch(setSortKeyFilter())
});

export default connect(mapStateToProps, mapDispatchToProps)(TestRunsStatusPage);
