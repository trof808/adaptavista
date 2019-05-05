import React, { PureComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import StatisticChart from './chart';


import { CHART_TYPES } from '../../utils/constants';

export default class Statistic extends PureComponent {
  render() {
    const {
      automated, total, last, automatedPercent,
      weekProgress, faild, sprintTests, newAutoTests,
      title, runDate, link, showTotal, showLegend,
      showTooltip, firstValChunk2, detailedInfo, showTitle,
      firstLegendText, secondLegendText, thirdLegendText,
      subtitle, fourthValue, fourthText
    } = this.props;
    return (
      <div className="statistic">
        {showTitle
          && (
          <Tooltip disableHoverListener={!showTooltip} title={title} placement="top">
            <div className="statistic-title">
              {`${title} `}
              <br />
              {subtitle && <span className="subtitle">{subtitle}</span>}
              {title === CHART_TYPES.PROGRESS && <span>{weekProgress ? `+ ${weekProgress} за спринт` : 'Отсутствует'}</span>}
              {title === CHART_TYPES.RUN && <span className="run-date">{runDate}</span>}
            </div>
          </Tooltip>
          )
        }
        <StatisticChart
          type={title}
          firstValue={automated}
          total={total}
          automatedPercent={automatedPercent}
          secondValue={faild}
          thirdValue={last}
          fourthValue={fourthValue}
          sprintTests={sprintTests}
          newAutoTests={newAutoTests}
          link={link}
          showTotal={showTotal}
          showLegend={showLegend}
          firstValChunk2={firstValChunk2}
          detailedInfo={detailedInfo}
          firstLegendText={firstLegendText}
          secondLegendText={secondLegendText}
          thirdLegendText={thirdLegendText}
          fourthLegendText={fourthText}
        />
      </div>
    );
  }
}
