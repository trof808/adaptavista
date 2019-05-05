import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import MainMenu from '../../common-components/main-menu';
import SnackBar from '../snackbar';

import { getCycleTypeByPage } from '../../utils/functions';

class CustomRoute extends React.PureComponent {
  componentDidMount() {
    this.props.setActiveLink(this.props.path);
  }

  componentDidUpdate() {}

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.props.setActiveLink(this.props.path);
    }
    return null;
  }

  handleFullUpdate = () => {
    const { match } = this.props;
    const cycleType = getCycleTypeByPage(match.params.testType);
    this.props.fullUpdate(cycleType);
  }

  render() {
    const {
      component, path, lastUpdated, links, updatingStatus, isError, message
    } = this.props;
    return (
      <div>
        <SnackBar
          message={message}
          onClick={this.handleFullUpdate}
          buttonMessage="Обновить"
          open={updatingStatus || isError}
        />
        <MainMenu
          lastUpdated={lastUpdated}
          handleFullUpdate={this.handleFullUpdate}
          links={links}
        />
        <Route path={path} component={component} />
      </div>
    );
  }
}

CustomRoute.propTypes = {
  setActiveLink: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

CustomRoute.defaultProps = {};

export default CustomRoute;
