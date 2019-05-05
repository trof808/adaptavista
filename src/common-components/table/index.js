import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import LoaderComponent from '../../components/loader';
import SearchField from '../search-field';

import Label from '../label';

class TableComponent extends React.PureComponent {
  state = {
    page: 0,
    perPage: 30,
    search: ''
  }

  componentDidMount = () => {
    this.props.handleFetchingTests(0, this.state.perPage, '');
  }

  handleSearch = e => {
    this.setState({ search: e.target.value, page: 0 });
    this.props.handleFetchingTests(0, this.state.perPage, e.target.value);
  }

  handleChangePage = (e, page) => {
    this.setState({ page });
    this.props.handleFetchingTests(page, this.state.perPage, this.state.search);
  }

  handleChangePerPage = e => {
    const { value } = e.target;
    this.setState({ perPage: value, page: 0 });
    this.props.handleFetchingTests(this.state.page, value, this.state.search);
  }

  render() {
    const { tests, isFetchingTests, totalElements } = this.props;
    const { page, perPage } = this.state;
    return (
      <Paper className="paper-table">
        {isFetchingTests && <div className="dimmer"><LoaderComponent /></div> }
        <Toolbar className="toolbar">
          <div className="toolbar-title">
            <SearchField onChange={this.handleSearch} placeholder="Ключ, имя теста, имя функционала ..." />
            <span>Ветка - release-33.000.00</span>
          </div>
        </Toolbar>
        <div className="table-content">
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell className="status-cell">В тестовом прогоне</TableCell> */}
                <TableCell className="status-cell">Harvester enabled</TableCell>
                {/* <TableCell className="status-cell">PR check enabled</TableCell> */}
                <TableCell>Ключ</TableCell>
                <TableCell>Имя теста</TableCell>
                <TableCell>Имя функционала</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map(row => (
                <TableRow key={row.testKey} className="tableRow">
                  {/* <TableCell className="status-cell">
                      <Label status={row.testRunInclude ? "on" : "disabled"} />
                    </TableCell> */}
                  <TableCell className="status-cell">
                    <Label status={row.harvesterEnabled ? 'on' : 'off'} />
                  </TableCell>
                  {/* <TableCell className="status-cell">
                      <Label status={row.prChackEnabled ? "on" : "off"} />
                    </TableCell> */}
                  <TableCell component="th" scope="row">
                    {row.testKey}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.functionalName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 30, 100]}
          className="table-footer"
          component="div"
          count={totalElements}
          rowsPerPage={perPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangePerPage}
        />
      </Paper>
    );
  }
}

export default TableComponent;
