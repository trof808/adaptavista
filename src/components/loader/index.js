import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const LoaderComponent = () => (
  <div className="loader">
    <CircularProgress size={50} />
  </div>
);

export default LoaderComponent;
