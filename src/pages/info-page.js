import React, { Component } from 'react';

import PageTitle from '../components/page/title';
import StatisticChart from '../components/statistic/chart';
import Paginator from '../components/paginator';
import LineChart from '../components/line-chart';
import TeamsContainer from '../containers/team-container';
import SelectComponent from '../common-components/select';
import LoaderComponent from '../components/loader';

import { QUERIES, ROUTES } from '../utils/constants';
import { getProjectKeyByRoute, isAutoTests, getCycleTypeByPage } from '../utils/functions';

export default class InfoPage extends Component {
  componentDidMount() {
    const { match, history, choosedRelease } = this.props;

    const projectKey = getProjectKeyByRoute(match.params.name);
    if (
      !Object.values(QUERIES).includes(match.params.testType)
      || !Object.values(ROUTES).includes(match.params.name)
    ) {
      return history.replace('/');
    }
    if (isAutoTests(match.params.testType)) {
      this.props.fetchProjectByKey(projectKey);
    } else if (!choosedRelease) {
      const cycleType = getCycleTypeByPage(match.params.testType);
      this.props.fetchReleases(projectKey, cycleType);
    }
    return null;
  }

  handleChangeSprint = (e, offset) => {
    e.preventDefault();
    e.stopPropagation();
    const projectKey = getProjectKeyByRoute(this.props.match.params.name);
    this.props.changeSprint(projectKey, offset);
  }

  handleChangeRelease = e => {
    const { match } = this.props;
    const cycleType = getCycleTypeByPage(match.params.testType);
    const projectKey = getProjectKeyByRoute(match.params.name);
    this.props.handleChageRelease(e.target.value, projectKey, cycleType);
  }

  handleChangeCycle = e => {
    const { match, choosedRelease } = this.props;
    const projectKey = getProjectKeyByRoute(match.params.name);
    const cycleType = getCycleTypeByPage(match.params.testType);
    this.props.changeCycle(
      e.target.value, choosedRelease, projectKey, cycleType
    );
  }

  handleDownloadFile = () => {
    const projectKey = getProjectKeyByRoute(this.props.match.params.name);
    this.props.downloadFile(projectKey);
  }

  render() {
    const {
      match, automated, isFetching,
      last, total, sprintTests, sprints,
      activeSprintId, sptintsNums, sprintInfoArray,
      autoTestsBySprint, releasesNames, choosedRelease,
      cyclesNames, choosenSycle, iftPassed, iftFaild, iftNoRun,
      regressPassed, regressFaild, regressNoRun, iftTotal, regressTotal,
      history, iftFinished, regressFinished, isFetchingRelease, regressInProgress,
      iftInProgress
    } = this.props;
    const projectKey = getProjectKeyByRoute(match.params.name);
    return (
      <div className="row">
        <div className="row1 col-12">
          {isAutoTests(match.params.testType) && (
            <PageTitle
              projectName={match.params.name}
              type={match.params.testType}
              firstValue={total}
              firstText="Запланировано"
              secondValue={automated}
              secondText="Автоматизировано"
              thirdValue={last}
              thirdText="Осталось"
              link="/"
              handleDownloadFile={this.handleDownloadFile}
            />
          )}
          {!isAutoTests(match.params.testType) && (
            <PageTitle
              projectName={match.params.name}
              type={match.params.testType}
              firstValue={match.params.testType === QUERIES.REGRESS ? regressTotal : iftTotal}
              firstText="Запланировано"
              secondValue={match.params.testType === QUERIES.REGRESS ? regressFinished : iftFinished}
              secondText="Пройдено"
              thirdValue={match.params.testType === QUERIES.REGRESS ? regressNoRun : iftNoRun}
              thirdText="Осталось"
              link="/"
            />
          )}
        </div>
        <div className="row2 col-12">
          {isAutoTests(match.params.testType)
            ? (
              <Paginator
                items={sprints}
                onClick={this.handleChangeSprint}
                activeItemId={activeSprintId}
                size="large"
                reduced={false}
              />
            )
            : (
              <div className="filter-release">
                <SelectComponent
                  onChange={this.handleChangeRelease}
                  items={releasesNames}
                  activeValue={choosedRelease}
                  label="Релиз"
                />
                <SelectComponent
                  onChange={this.handleChangeCycle}
                  items={cyclesNames}
                  activeValue={choosenSycle}
                  label="Прогон"
                />
              </div>
            )
            }
        </div>
        <div className="row3 col-12">
          {(isFetching || isFetchingRelease) && <LoaderComponent />}
          {!isFetching && !isFetchingRelease && (
            isAutoTests(match.params.testType) ? (
              <StatisticChart
                firstValue={automated}
                firstValChunk2={autoTestsBySprint}
                thirdValue={last}
                secondValue={0}
                sprintTests={sprintTests}
                total={total}
                showTotal={false}
                link={history.location.pathname}
                detailedInfo
                showLegendAlways
                secondColor="#F49530"
                secondLegendText="Автоматизировано за спринт"
              />
            )
              : (
                <StatisticChart
                  firstValue={match.params.testType === QUERIES.REGRESS ? regressPassed : iftPassed}
                  secondValue={match.params.testType === QUERIES.REGRESS ? regressFaild : iftFaild}
                  thirdValue={match.params.testType === QUERIES.REGRESS ? regressNoRun : iftNoRun}
                  fourthValue={match.params.testType === QUERIES.REGRESS ? regressInProgress : iftInProgress}
                  sprintTests={sprintTests}
                  total={match.params.testType === QUERIES.REGRESS ? regressTotal : iftTotal}
                  showTotal={false}
                  link={history.location.pathname}
                  showLegendAlways
                  firstLegendText="Пройдено успешно"
                />
              )
          )}
        </div>
        {isAutoTests(match.params.testType) && (
        <div className="row4 col-12">
          <LineChart bottomValues={sptintsNums} values={sprintInfoArray} />
        </div>
        )}
        <div className="row5 col-12">
          <TeamsContainer
            project={match.params.name}
            type={match.params.testType}
            projectKey={projectKey}
            releaseName={choosedRelease}
            cycleNum={choosenSycle}
          />
        </div>
      </div>
    );
  }
}
