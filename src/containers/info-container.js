import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageInfo from '../pages/info-page';

import { getProjectNameByRoute, getProjectKeyByRoute } from '../utils/functions';

import {
  getSprintInfo, getAmountOfSprints,
  findActiveSprintId, getSprintsNums,
  getAutomatedTestsBySprint, getListOfAutomatedSprintTests
} from '../store/selectors/global.selectors';

import {
  getAutomated, getTotal, getLast, getProjectIsFetching,
  getReleases, getActiveReleaseName, getCyclesName,
  getActiveCycleNum, getIftPassed, getIftFailed,
  getIftLast, getIftTotal, getRegressPassed, getRegressFailed,
  getRegressLast, getRegressTotal, getReleaseIsFetching,
  getRegressInProgress, getIftProgress, getRegressFinished,
  getIftFinished
} from '../store/selectors/projects.selectors';
import {
  fetchProjectByKey, fetchReleases,
  fetchActiveCycle, changeProjectSprint, fetchTeamsCycleStats,
  fetchDownloadingTestsStats, handleChageRelease
} from '../store/actions/projects.actions';

const mapStateToProps = (state, props) => {
  const projectName = getProjectNameByRoute(props.match.params.name);
  const projectKey = getProjectKeyByRoute(props.match.params.name);
  return {
    automated: getAutomated(state, projectKey),
    total: getTotal(state, projectKey),
    last: getLast(state, projectKey),
    sprintTests: getSprintInfo(state, projectKey),
    sprints: getAmountOfSprints(state),
    activeSprintId: findActiveSprintId(state, projectKey),
    sptintsNums: getSprintsNums(state),
    sprintInfoArray: getListOfAutomatedSprintTests(state, projectKey),
    autoTestsBySprint: getAutomatedTestsBySprint(state, projectKey),
    releasesNames: getReleases(state, projectKey),
    choosedRelease: getActiveReleaseName(state, projectKey),
    choosenSycle: getActiveCycleNum(state, projectKey),
    cyclesNames: getCyclesName(state, projectKey),
    iftPassed: getIftPassed(state, projectKey),
    iftFaild: getIftFailed(state, projectKey),
    iftNoRun: getIftLast(state, projectKey),
    iftTotal: getIftTotal(state, projectKey),
    iftInProgress: getIftProgress(state, projectKey),
    iftFinished: getIftFinished(state, projectKey),
    regressPassed: getRegressPassed(state, projectKey),
    regressFaild: getRegressFailed(state, projectKey),
    regressNoRun: getRegressLast(state, projectKey),
    regressTotal: getRegressTotal(state, projectKey),
    regressInProgress: getRegressInProgress(state, projectKey),
    regressFinished: getRegressFinished(state, projectKey),
    isFetching: getProjectIsFetching(state, projectKey),
    isFetchingRelease: getReleaseIsFetching(state, projectKey),
    projectName,
    ...props
  };
};

const mapDispatchToProps = dispatch => ({
  changeSprint: (sprintId, projectKey) => dispatch(changeProjectSprint(sprintId, projectKey)),
  changeCycle: (cycleNum, releaseName, projectKey, cycleType) => dispatch(fetchActiveCycle(cycleNum, releaseName, projectKey, cycleType)),
  fetchProjectByKey: projectKey => dispatch(fetchProjectByKey(projectKey)),
  fetchReleases: (projectKey, cycleType) => dispatch(fetchReleases(projectKey, cycleType)),
  fetchTeamsCycleStats: (name, cycleNum, projectKey) => dispatch(fetchTeamsCycleStats(name, cycleNum, projectKey)),
  downloadFile: projectKey => dispatch(fetchDownloadingTestsStats(projectKey)),
  handleChageRelease: (releaseName, projectKey, cycleType) => dispatch(handleChageRelease(releaseName, projectKey, cycleType))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PageInfo));
