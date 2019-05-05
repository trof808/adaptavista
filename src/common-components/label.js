import React from 'react';
import { pure } from 'recompose';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Label = pure(({ status }) => (
  <div className={classNames({
    label: true,
    disabled: status === 'disabled',
    on: status === 'on',
    off: status === 'off'
  })}
  />
));

Label.propTypes = {
  status: PropTypes.string
};

Label.defaultProps = {
  status: 'disabled'
};

export default Label;
