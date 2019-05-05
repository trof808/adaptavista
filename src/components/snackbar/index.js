import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Update from '@material-ui/icons/Update';

const ActionButton = ({ buttonMessage, onClick }) => (
  <Button color="secondary" size="small" onClick={onClick}>
    <Update />
    {buttonMessage}
  </Button>
);

const SnackBar = ({
  message, onClick, buttonMessage, open
}) => (
  <div className="snackbar">
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      message={message}
      action={<ActionButton buttonMessage={buttonMessage} onClick={onClick} />}
      open={open}
    />
  </div>
);

export default SnackBar;
