import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, LineSeries, Tooltip
} from 'react-jsx-highcharts';

const plotOptions = {
  series: {
    pointStart: 1
  }
};

const LineChart = ({ values }) => (
  <div className="line-chart">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>Автоматизация</Title>

      <XAxis>
        <XAxis.Title>Спринты</XAxis.Title>
      </XAxis>

      <Tooltip padding={10} hideDelay={250} shape="square" split />

      <YAxis>
        <LineSeries name="Автоматизировано" data={values} />
      </YAxis>
    </HighchartsChart>
  </div>
);

export default withHighcharts(LineChart, Highcharts);
