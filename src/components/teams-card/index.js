import React, { Component } from 'react';

import Statistic from '../statistic';
import StatisticChart from '../statistic/chart';
import LoaderComponent from '../loader';

import { QUERIES } from '../../utils/constants';
import { getCycleTypeByPage } from '../../utils/functions';

class TeamsCard extends Component {
  componentDidMount = () => {
    const {
      type, projectKey, match, releaseName, cycleNum
    } = this.props;
    const cycleType = getCycleTypeByPage(match.params.testType);
    if (type === QUERIES.AUTO) {
      this.props.fetchTeamsData(projectKey);
    } else {
      this.props.fetchTeamsCycleStats(releaseName, cycleNum, projectKey, cycleType);
    }
  }

  render() {
    const {
      isFeatchingTeams, type, teamsTestsRelease, teams
    } = this.props;
    return (
      isFeatchingTeams ? <LoaderComponent />
        : (
          <div className="teams-block">
            <h3>Статистика по командам</h3>
            <div className="teams-header">
              <div>{type === QUERIES.AUTO ? 'Автотестов проведено' : 'Тестов пройдено'}</div>
              <div>{type === QUERIES.AUTO ? 'Запуск' : 'Дефектов закрыто'}</div>
            </div>
            {type === QUERIES.AUTO && teams.map(team => (
              <div className="teams-charts" key={team.name}>
                <div className="teams-auto">
                  <Statistic
                    automated={team.automated}
                    total={team.total}
                    last={team.last}
                    firstValChunk2={0}
                    title={team.name}
                    subtitle={team.total > 0 ? `${(team.automated / team.total * 100).toFixed(1)}% из ${team.total}` : '0% из 0'}
                    link="#"
                    showTotal={false}
                    showLegend={false}
                    showTooltip
                    detailedInfo
                    showTitle
                  />
                </div>
                <div className="teams-run">
                  <StatisticChart
                    firstValue={team.totalPassedRuns}
                    thirdValue={team.totalNotExecutedRuns}
                    secondValue={team.totalFailedRuns}
                    total={team.totalRuns}
                    showTotal
                    link="#"
                    detailedInfo
                    showLegend={false}
                    showTitle={false}
                  />
                </div>
              </div>
            ))}
            {type !== QUERIES.AUTO && teamsTestsRelease.map(stat => (
              <div className="teams-charts" key={stat.teamName}>
                <div className="teams-auto">
                  <Statistic
                    automated={stat.passed}
                    total={stat.total}
                    last={stat.last}
                    faild={stat.failed}
                    fourthValue={stat.inProgress}
                    title={stat.team.name}
                    link="#"
                    showTotal={false}
                    showLegend={false}
                    showTooltip
                    detailedInfo
                    showTitle
                  />
                </div>
                <div className="teams-run">
                Нет данных
                </div>
              </div>
            ))}
          </div>
        )
    );
  }
}

export default TeamsCard;
