import React from 'react';

import { PROJECT_TYPES, CHART_TYPES } from '../utils/constants';

import CardContainer from '../containers/card-container';

export default class MainPage extends React.PureComponent {
  componentDidMount = () => {
    this.props.fetchSprints();
    this.props.fetchUpdatingStatus();
  }

  render() {
    const { projects } = this.props;
    return (
      <div className="row">
        <div>
          <div className="col-6 col-12-sm">
            <h2>Статус автоматизации</h2>
            {projects.map((p, indx) => p.showForSprint && (
            <CardContainer
              key={p.key}
              projectKey={p.key}
              type={PROJECT_TYPES.SPRINT}
              name={p.name}
              link={p.id}
              firstChartName={CHART_TYPES.PROGRESS}
              secondChartName={CHART_TYPES.RUN}
              automated={p.automated}
              automatedPercent={p.automatedPercent}
              total={p.total}
              last={p.last}
              runPassed={p.totalPassedRuns}
              runFaild={p.totalFailedRuns}
              runNoRun={p.totalNotExecutedRuns}
              runTotal={p.totalRuns}
              runInProgress={p.totalInProgressRuns}
              expanded={indx === 0}
            />
            ))}
          </div>
          <div className="col-6 col-12-sm">
            <h2>Статус тестирования</h2>
            {projects.map((p, indx) => p.showForRelease && (
            <CardContainer
              key={p.key}
              projectKey={p.key}
              type={PROJECT_TYPES.RELEASE}
              name={p.name}
              link={p.id}
              firstChartName={CHART_TYPES.IFT}
              secondChartName={CHART_TYPES.REGRESS}
              expanded={indx === 0}
              disabled={!p.releaseBlockActive}
            />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
