import React from 'react';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';

import Select from '../../common-components/select';
import LoaderComponent from '../../components/loader';
import SearchField from '../../common-components/search-field';
import { TableComponent } from './components';

class TestRunsStatusPage extends React.PureComponent {
  state = {
    firstSelect: '',
    secondSelect: '',
    activeRelease: ''
  }

  componentDidMount = async () => {
    await this.props.fetchReleases();
    const { releases } = this.props;
    this.setState({ activeRelease: releases[releases.length - 1] }, () => {
      this.handleFetchBuildsAndSetTests(this.state.activeRelease);
    });
  }

  handleFetchBuildsAndSetTests = async releaseName => {
    await this.props.fetchBuilds(releaseName);
    const { firstSelectValue, secondSelectValue } = this.props;
    this.setState({
      firstSelect: firstSelectValue.parsedValue,
      secondSelect: secondSelectValue.parsedValue
    }, this.handleFetchTests);
  }

  handleFetchTests = () => {
    const { firstSelect, secondSelect, activeRelease } = this.state;
    this.props.fetchDataForPage(firstSelect, secondSelect, activeRelease);
  }

  changeActiveFirst = e => {
    this.setState({ firstSelect: e.target.value });
  }

  changeActiveSecond = e => {
    this.setState({ secondSelect: e.target.value });
  }

  changeReleaseBranch = async e => {
    this.setState({ activeRelease: e.target.value });
    this.handleFetchBuildsAndSetTests(e.target.value);
  }

  handleChangeFailedFilter = () => {
    this.props.setFailedFilter();
  }

  handleChangeSuccessFilter = () => {
    this.props.setSuccessFilter();
  }

  handleChangeSearchField = e => {
    this.props.setSearchField(e.target.value);
  }

  handleFilterPr = pr => {
    this.props.handleFilterPr(pr);
  }

  render() {
    const { firstSelect, secondSelect, activeRelease } = this.state;
    const {
      isFetching, buildsNumsAndDates, firstSelectValue, secondSelectValue,
      tests, filters, prs, releases, setSortKeyFilter
    } = this.props;
    const secondActiveBuildNum = secondSelect.split(' / ')[0];
    return (
      <div className="row runs-status-page">
        <div className="col-12">
          <div className="row">
            <Paper>
              {isFetching && <div className="dimmer"><LoaderComponent /></div> }
              <Toolbar className="toolbar">
                <Select items={releases} activeValue={activeRelease} onChange={this.changeReleaseBranch} label="Ветка релиза" />
                <Select items={buildsNumsAndDates} activeValue={firstSelect} onChange={this.changeActiveFirst} label="Первый билд" />
                <Select items={buildsNumsAndDates} activeValue={secondSelect} onChange={this.changeActiveSecond} label="Второй билд" />
                <IconButton className="search-button" color="primary" onClick={this.handleFetchTests}>
                  <Search />
                </IconButton>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={filters.showSuccess}
                      onChange={this.handleChangeSuccessFilter}
                      color="primary"
                    />
                  )}
                  label="Success"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={filters.showFailed}
                      onChange={this.handleChangeFailedFilter}
                      color="primary"
                    />
                  )}
                  label="Failed"
                />
                <SearchField placeholder="Ключ теста..." onChange={this.handleChangeSearchField} value={filters.search} />
              </Toolbar>
              <div className="table-title">
                <span className="test-runs-title">
                  {'Тесты с изменившимся статусом между запуском '}
                  <a target="_blank" rel="noopener noreferrer" href={firstSelectValue.link} className="build-link">
                    {firstSelectValue.parsedValue}
                  </a>
                  {' и '}
                  <a target="_blank" rel="noopener noreferrer" href={secondSelectValue.link} className="build-link">
                    {secondSelectValue.parsedValue}
                  </a>
                </span>
                <div className="badge">{tests.length}</div>
              </div>
              <TableComponent
                items={tests}
                prs={prs}
                handleFilterPr={this.handleFilterPr}
                handleSortKey={setSortKeyFilter}
                filters={filters}
                activeRelease={activeRelease}
                activeBuildNum={secondActiveBuildNum}
              />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default TestRunsStatusPage;
