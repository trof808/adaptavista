import React from 'react';
import { pure } from 'recompose';


const Legend = pure(({ firstColor, firstLegendText, show }) => (show

  ? (
    <div className="automated-legend legend">
      <i className="legend-icon" style={{ backgroundColor: firstColor }} />
      <span>{firstLegendText}</span>
    </div>
  )

  : null));

export default Legend;
