import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';

import { CHART_TYPES } from '../../utils/constants';

import ChartChunk from './chunk';
import Legend from './legend';

/**
 * График статистики автоматизированных,
 * зафэйленых и оставшихся тестов
 */
const StatisticChart = pure(({
  firstValue, total, automatedPercent,
  secondValue, thirdValue, sprintTests, type, link,
  showTotal, detailedInfo, showLegend, firstValChunk2,
  firstLegendText, secondLegendText, thirdLegendText,
  showLegendAlways, firstColor, secondColor, thirdColor,
  fourthValue, fourthColor, fourthLegendText
}) => (
  total !== 0 ? (
    <Link to={link} className="statistic-chart-container">
      <div className="statistic-chart">
        {firstValue > 0 && (
        <div className="block block1" style={{ flexGrow: (firstValue / (total)).toFixed(2), backgroundColor: firstColor }}>
          {detailedInfo
            ? (
              <div className="block1-chunks">
                {(firstValue - firstValChunk2) > 0
                    && (
                    <div className="block1-chunks1" style={{ flexGrow: ((firstValue - firstValChunk2) / (firstValue)).toFixed(2) }}>
                      {firstValue - firstValChunk2}
                    </div>
                    )
                  }
                {!!firstValChunk2 && (
                <div className="block1-chunks2" style={{ flexGrow: (firstValChunk2 / firstValue).toFixed(2) }}>
                  {firstValChunk2}
                </div>
                )}
              </div>
            )
            : (
              <div className="block1-full" style={{ flexGrow: (firstValue / (total)).toFixed(2) }}>
                {firstValue}
                {type === CHART_TYPES.PROGRESS && automatedPercent > 0 && (
                <span>
                  {`(${automatedPercent} %)`}
                </span>
                )}
                {type === CHART_TYPES.PROGRESS && <ChartChunk sprintTests={sprintTests} total={total} /> }
              </div>
            )
              }
        </div>
        )}
        {fourthValue > 0 && (
        <div
          className="block block4"
          style={{ flexGrow: (fourthValue / total).toFixed(2), backgroundColor: fourthColor }}
        >
          {fourthValue}

        </div>
        )}
        {secondValue > 0 && (
        <div
          className="block block2"
          style={{ flexGrow: (secondValue / total).toFixed(2), backgroundColor: secondColor }}
        >
          {secondValue}

        </div>
        )}
        {thirdValue > 0 && (
        <div
          className="block block3"
          style={{ flexGrow: (thirdValue / total).toFixed(2), backgroundColor: thirdColor }}
        >
          {thirdValue}

        </div>
        )}
        {showTotal && <div className="statistic-chart-total">{total}</div>}
      </div>
      {showLegend && (
      <div className="chart-legend">
        <Legend show={firstValue > 0 || showLegendAlways} firstColor={firstColor} firstLegendText={firstLegendText} />
        <Legend show={fourthValue > 0} firstColor={fourthColor} firstLegendText={fourthLegendText} />
        <Legend show={secondValue > 0 || showLegendAlways} firstColor={secondColor} firstLegendText={secondLegendText} />
        <Legend show firstColor={thirdColor} firstLegendText={thirdLegendText} />
      </div>
      )}
    </Link>
  )
    : (
      <div className="statistic-chart-container">
        Нет данных
      </div>
    )
));

StatisticChart.propTypes = {
  firstValue: PropTypes.number,
  total: PropTypes.number,
  automatedPercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secondValue: PropTypes.number,
  thirdValue: PropTypes.number,
  fourthValue: PropTypes.number,
  type: PropTypes.string,
  firstLegendText: PropTypes.string,
  secondLegendText: PropTypes.string,
  thirdLegendText: PropTypes.string,
  fourthLegendText: PropTypes.string,
  firstColor: PropTypes.string,
  secondColor: PropTypes.string,
  thirdColor: PropTypes.string,
  fourthColor: PropTypes.string,
  showTotal: PropTypes.bool,
  showLegend: PropTypes.bool,
  detailedInfo: PropTypes.bool,
  showLegendAlways: PropTypes.bool,
  firstValChunk2: PropTypes.number
};

StatisticChart.defaultProps = {
  firstValue: 0,
  total: 0,
  automatedPercent: 0,
  secondValue: 0,
  thirdValue: 0,
  fourthValue: 0,
  type: '',
  showTotal: true,
  showLegend: true,
  detailedInfo: false,
  showLegendAlways: false,
  firstValChunk2: 0,
  firstLegendText: 'Автоматизировано',
  secondLegendText: 'Пройдено с ошибкой',
  thirdLegendText: 'Осталось',
  fourthLegendText: 'В процессе',
  firstColor: '#4f7539',
  secondColor: '#EB6762',
  thirdColor: '#adadad',
  fourthColor: '#e68c18'
};

export default StatisticChart;
