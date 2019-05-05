import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TeamsCard from '../components/teams-card';

import { getProjectKeyByRoute } from '../utils/functions';
import { fetchProjectTeams, fetchTeamsCycleStats } from '../store/actions/projects.actions';
import { getTeams, teamsIsFetching, teamsCycleStats } from '../store/selectors/projects.selectors';

const mapStateToProps = (state, props) => {
  const projectKey = getProjectKeyByRoute(props.project);
  return {
    isFeatchingTeams: teamsIsFetching(state, projectKey),
    teamsTestsRelease: teamsCycleStats(state, projectKey),
    teams: getTeams(state, projectKey),
    ...props
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTeamsData: projectKey => dispatch(fetchProjectTeams(projectKey)),
  fetchTeamsCycleStats: (name, cycleNum, projectKey, cycleType) => dispatch(fetchTeamsCycleStats(name, cycleNum, projectKey, cycleType))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsCard));
