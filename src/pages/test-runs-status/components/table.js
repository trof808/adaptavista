import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import Label from '../../../common-components/label';

class TableComponent extends React.PureComponent {
  handleFilterPr = pr => {
    this.props.handleFilterPr(pr);
  }

  handleSortKey = () => {
    this.props.handleSortKey();
  }

  render() {
    const {
      items, activeRelease, activeBuildNum, prs, filters
    } = this.props;
    const concatForLink = `${activeRelease}/${activeBuildNum}`;
    return (
      <div className="table-content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="status-cell fixed-column">Статус</TableCell>
              <TableCell className="fixed-column sort-filter key-column" onClick={this.handleSortKey}>
                <span>Ключ {filters.sortKeys ? <KeyboardArrowDown /> : <KeyboardArrowUp />}</span>
              </TableCell>
              {prs.map(pr => (
                <TableCell key={pr} className="pr-column">
                  <Button value={pr} variant={filters.activePr === pr ? 'contained' : 'outlined'} onClick={() => this.handleFilterPr(pr)}>
                    {pr}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(row => (
              <TableRow key={row.id} className="tableRow">
                <TableCell className="status-cell fixed-column">
                  <Label status={row.status === 'passed' ? 'on' : 'off'} />
                </TableCell>
                <TableCell component="th" scope="row" className="key-column fixed-column">
                  <a
                    className="build-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`
                      http://sbtatlas.sigma.sbrf.ru/jenkinsint/job/sbbol/job/harvesterNtg/job/${concatForLink}/allure/#suites/${row.parentUid}/${row.uid}
                    `}
                  >
                    {row.key}
                  </a>
                </TableCell>
                {prs.map(pr => (
                  <TableCell key={pr} className="pr-column">
                    {row.prList.includes(pr)
                      ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://sbtatlas.sigma.sbrf.ru/stashdbo/projects/DBO/repos/sbbol/pull-requests/${pr}/overview`}
                        >
                          <Label status="disabled" />
                        </a>
                      ) : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default TableComponent;
