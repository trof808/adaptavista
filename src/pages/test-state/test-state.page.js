import React from 'react';

import TableComponent from '../../common-components/table';

class TestStatePage extends React.PureComponent {
  handleFetchingTests = (page, perPage, searchString) => {
    this.props.fetchUpdatingStatus();
    this.props.fetchBitbucketTests(page, perPage, searchString);
  }

  handleChageSearchFilter = searchFilter => {
    this.props.setSearchFilter(searchFilter);
  }

  render() {
    const { tests, isFetchingTests, totalElements } = this.props;
    return (
      <div className="row">
        <div className="col-12">
          <TableComponent
            handleFetchingTests={this.handleFetchingTests}
            handleChageSearchFilter={this.handleChageSearchFilter}
            tests={tests}
            isFetchingTests={isFetchingTests}
            totalElements={totalElements}
          />
        </div>
      </div>
    );
  }
}

export default TestStatePage;
