import * as React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'material-ui-flat-pagination';

const Paginator = ({
  onClick, items, activeItemId, reduced, size
}) => (
  <div className="paginator">
    <span>Спринт</span>
    <div className="paginator-item">
      <Pagination
        limit={1}
        offset={activeItemId}
        total={items}
        centerRipple
        reduced={reduced}
        size={size}
        onClick={(e, offset) => onClick(e, offset)}
        currentPageColor="primary"
        otherPageColor="inherit"
      />
    </div>
  </div>
);

Paginator.propTypes = {
  onClick: PropTypes.func,
  items: PropTypes.number,
  activeItemId: PropTypes.number,
  reduced: PropTypes.bool,
  size: PropTypes.string,
};

Paginator.defaultProps = {
  onClick: () => {},
  items: 1,
  activeItemId: 1,
  reduced: true,
  size: 'medium',
};

export default Paginator;
