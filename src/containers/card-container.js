import { connect } from 'react-redux';
import ProjectCard from '../components/project-card';
import {
  getAmountOfSprints, findActiveSprintId,
  getSprintInfo, getActiveSprintProgress
} from '../store/selectors/global.selectors';

import {
  fetchProjectByKey, fetchReleases,
  fetchActiveCycle, changeProjectSprint, handleChageRelease
} from '../store/actions/projects.actions';

import {
  getProjectIsFetching, getReleases,
  getActiveReleaseName, getCyclesName, getActiveCycleNum,
  getReleaseIsFetching, getRegressTotal, getRegressPassed,
  getRegressFailed, getRegressLast, getIftTotal, getIftPassed,
  getIftFailed, getIftLast, getIftProgress, getRegressInProgress
} from '../store/selectors/projects.selectors';


const mapStateToProps = (state, props) => ({
  sprints: getAmountOfSprints(state),
  weekProgress: getActiveSprintProgress(state, props.projectKey),
  activeSprintId: findActiveSprintId(state, props.projectKey),
  releasesNames: getReleases(state, props.projectKey),
  choosedRelease: getActiveReleaseName(state, props.projectKey),
  sprintTests: getSprintInfo(state, props.projectKey),
  iftPassed: getIftPassed(state, props.projectKey),
  iftFaild: getIftFailed(state, props.projectKey),
  iftNoRun: getIftLast(state, props.projectKey),
  iftTotal: getIftTotal(state, props.projectKey),
  iftInProgress: getIftProgress(state, props.projectKey),
  regressPassed: getRegressPassed(state, props.projectKey),
  regressFaild: getRegressFailed(state, props.projectKey),
  regressNoRun: getRegressLast(state, props.projectKey),
  regressTotal: getRegressTotal(state, props.projectKey),
  regressInProgress: getRegressInProgress(state, props.projectKey),
  choosenSycle: getActiveCycleNum(state, props.projectKey),
  cyclesNames: getCyclesName(state, props.projectKey),
  isFetching: getProjectIsFetching(state, props.projectKey),
  isFetchingRelease: getReleaseIsFetching(state, props.projectKey),
  ...props
});

const mapDispatchToProps = dispatch => ({
  changeSprint: (sprintId, projectKey) => dispatch(changeProjectSprint(sprintId, projectKey)),
  changeCycle: (cycleNum, releaseName, projectKey) => dispatch(fetchActiveCycle(cycleNum, releaseName, projectKey)),
  fetchProjectByKey: key => dispatch(fetchProjectByKey(key)),
  fetchReleases: projectKey => dispatch(fetchReleases(projectKey)),
  handleChageRelease: (releaseName, projectKey) => dispatch(handleChageRelease(releaseName, projectKey))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectCard);
