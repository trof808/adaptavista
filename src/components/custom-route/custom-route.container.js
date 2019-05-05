import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomRoute from './custom-route';

import { setActiveLink } from '../../store/actions/pages.actions';
import { getSortedLinks } from '../../store/selectors/pages.selectors';
import {
  getLastUpdatedByRoute, getUpdatingStatus, getIsError, getMessage
} from '../../store/selectors/global.selectors';
import { fullUpdate } from '../../store/actions/global.actions';


const mapStateToProps = (state, props) => ({
  lastUpdated: getLastUpdatedByRoute(state, props.path),
  links: getSortedLinks(state),
  updatingStatus: getUpdatingStatus(state),
  isError: getIsError(state),
  message: getMessage(state)
});

const mapDispatchToProps = dispatch => ({
  setActiveLink: link => dispatch(setActiveLink(link)),
  fullUpdate: cycleType => dispatch(fullUpdate(cycleType))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomRoute));
