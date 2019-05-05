import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MainPage from '../pages/main-page';

import { getProjectsArray } from '../store/selectors/projects.selectors';
import { fetchSprints, fetchUpdatingStatus } from '../store/actions/global.actions';

const mapStateToProps = state => ({
  projects: getProjectsArray(state)
});

const mapDispatchToProps = dispatch => ({
  fetchSprints: () => dispatch(fetchSprints()),
  fetchUpdatingStatus: () => dispatch(fetchUpdatingStatus()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage));
