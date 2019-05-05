import * as React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PROJECT_TYPES, CHART_TYPES, QUERIES } from '../../utils/constants';

import Paginator from '../paginator';
import Statistic from '../statistic';
import SelectComponent from '../../common-components/select';
import LoaderComponent from '../loader';


class ProjectCard extends React.PureComponent {
  componentDidMount() {
    const { disabled, type, projectKey } = this.props;
    if (!disabled && type === PROJECT_TYPES.SPRINT) {
      return this.props.fetchProjectByKey(projectKey);
    }
    if (!disabled && type === PROJECT_TYPES.RELEASE) {
      return this.props.fetchReleases(projectKey);
    }
    return null;
  }

  handleChangeSprint = (e, offset) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.changeSprint(this.props.projectKey, offset);
  }

  handleChangeRelease = e => {
    this.props.handleChageRelease(e.target.value, this.props.projectKey);
  }

  handleCloseSprintInfo = () => {
    this.props.changeSprint(this.props.projectKey);
  }

  handleChangeCycle = e => {
    this.props.changeCycle(e.target.value, this.props.choosedRelease, this.props.projectKey);
  }

  render() {
    const {
      expanded, name, sprints, disabled, weekProgress, type,
      automated, total, last, automatedPercent, activeSprintId,
      releasesNames, choosedRelease, sprintTests, link, runDate,
      runPassed, runFaild, runNoRun, runTotal, choosenSycle, cyclesNames,
      secondChartName, firstChartName, iftPassed, iftFaild, iftNoRun,
      regressPassed, regressFaild, regressNoRun, iftTotal, regressTotal,
      isFetching, isFetchingRelease, iftInProgress, runInProgress,
      regressInProgress
    } = this.props;

    const isRelease = type === PROJECT_TYPES.RELEASE;

    return (
      <ExpansionPanel defaultExpanded={expanded} disabled={disabled} className="card">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className="expansion-panel">
          <span className="card-title">{name}</span>
        </ExpansionPanelSummary>
        {isFetching && <LoaderComponent />}
        {!disabled && !isFetching && (
        <ExpansionPanelDetails className="card-panel" onClick={this.handleCloseSprintInfo}>
          {!isRelease
            && (
            <Paginator
              items={sprints}
              onClick={this.handleChangeSprint}
              activeItemId={activeSprintId}
            />
            )}
          {isRelease
            && (
            <div className="card-filters">
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
          {isRelease && isFetchingRelease
            ? <LoaderComponent />
            : (
              <>
                <Statistic
                  weekProgress={weekProgress}
                  automated={firstChartName === CHART_TYPES.PROGRESS ? automated : iftPassed}
                  total={firstChartName === CHART_TYPES.PROGRESS ? total : iftTotal}
                  last={firstChartName === CHART_TYPES.PROGRESS ? last : iftNoRun}
                  faild={firstChartName === CHART_TYPES.IFT ? iftFaild : 0}
                  fourthValue={firstChartName === CHART_TYPES.IFT ? iftInProgress : 0}
                  automatedPercent={automatedPercent}
                  sprintTests={sprintTests}
                  title={firstChartName}
                  link={`project/${link}/type/${firstChartName === CHART_TYPES.IFT ? QUERIES.IFT : QUERIES.AUTO}`}
                  showTitle
                  firstLegendText={firstChartName === CHART_TYPES.IFT ? 'Пройдено успешно' : 'Автоматизировано'}
                />
                <Statistic
                  weekProgress={weekProgress}
                  automated={secondChartName === CHART_TYPES.REGRESS ? regressPassed : runPassed}
                  total={secondChartName === CHART_TYPES.REGRESS ? regressTotal : runTotal}
                  last={secondChartName === CHART_TYPES.REGRESS ? regressNoRun : runNoRun}
                  fourthValue={
                    secondChartName === CHART_TYPES.REGRESS ? regressInProgress : runInProgress}
                  automatedPercent={automatedPercent}
                  sprintTests={sprintTests}
                  title={secondChartName}
                  runDate={runDate}
                  faild={secondChartName === CHART_TYPES.REGRESS ? regressFaild : runFaild}
                  link={`project/${link}/type/${secondChartName === CHART_TYPES.REGRESS ? QUERIES.REGRESS : QUERIES.AUTO}`}
                  showTitle
                  firstLegendText="Пройдено успешно"
                />
              </>
            )
          }
        </ExpansionPanelDetails>
        )}
      </ExpansionPanel>
    );
  }
}

ProjectCard.propTypes = {
  expanded: PropTypes.bool,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sprints: PropTypes.number,
  disabled: PropTypes.bool,
  weekProgress: PropTypes.number,
  automated: PropTypes.number,
  total: PropTypes.number,
  last: PropTypes.number,
  automatedPercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeSprintId: PropTypes.number,
  releasesNames: PropTypes.arrayOf(PropTypes.string),
  changeSprint: PropTypes.func,
  choosedRelease: PropTypes.string,
  link: PropTypes.string.isRequired,
};
ProjectCard.defaultProps = {
  expanded: false,
  disabled: false,
  weekProgress: 0,
  sprints: 0,
  automated: 0,
  automatedPercent: '',
  last: 0,
  total: 0,
  activeSprintId: 1,
  releasesNames: [],
  choosedRelease: '',
  changeSprint: () => {},
};

export default ProjectCard;
