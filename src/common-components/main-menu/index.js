import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import Update from '@material-ui/icons/Update';

class MainMenu extends React.PureComponent {
  handleFullUpdate = () => this.props.handleFullUpdate()

  render() {
    const { lastUpdated, links } = this.props;

    return (
      <div className="row">
        <div className="col-12">
          <div className="main-menu">
            <div className="left-block">
              {links.map(link => (
                <Link
                  key={link.link}
                  to={link.link}
                  className={classNames({ active: link.active })}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            {lastUpdated && (
            <div className="right-block">
              <span>
                Последнее обновление:
                {' '}
                {lastUpdated}
              </span>
              <IconButton onClick={this.handleFullUpdate}>
                <Update />
              </IconButton>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

MainMenu.propTypes = {
  lastUpdated: PropTypes.string,
  handleFullUpdate: PropTypes.func,
  links: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
    show: PropTypes.bool,
    active: PropTypes.bool
  }))
};

MainMenu.defaultProps = {
  lastUpdated: null,
  handleFullUpdate: () => {},
  links: []
};

export default MainMenu;
