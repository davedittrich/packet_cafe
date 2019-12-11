import React from 'react';
import DataTable from 'react-data-table-component';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getResults } from 'domain/data';

class Table extends React.Component{
  constructor(props) {
    super(props);

  }

  renderTools = (item) => {
    const tools = item.tools;
    const id = item.id;
    return tools.map((value) => {
        const url = `/results/${this.props.sessionId}/${id}/${value}`
        return(
          <p key={id + ":" +value}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          </p>
        )
      }
    );
  }

  getTableColumns = () => {
    const tableColumns = [
      { name: 'ID', selector: 'id' },
      { name: 'Filename', selector: 'filename' },
      { name: 'Tools', className: 'text-center',
        cell: row => <div>{this.renderTools(row)}</div>,
      },
      // { title: 'Results', render: renderResultsUrl, className: 'text-center' },
      { name: 'Report', selector: 'report', cell: row => <p>{ row.report ? row.report : 'no report available' }</p> },
    ];

    return tableColumns;
  }

  render() {
    const columns = this.getTableColumns();
    const { rows, isLoading } = this.props;
    return (
        <div>
          <DataTable
            className="container"
            keyField="id"
            columns={columns}
            data={rows}
            //pagination={false}
            //initialPageLength={5}
            //initialSortBy={{ prop: 'filename', order: 'descending' }}
            progressPending={isLoading}
            //pageLengthOptions={[ 5, 20, 50 ]}
          />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  
  const results = getResults(state)
  return{
    rows: results.rows,
  }
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps) (Table);