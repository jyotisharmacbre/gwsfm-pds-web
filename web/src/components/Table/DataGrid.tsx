import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { IGridTableProps } from '../../props/AppProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const DataGrid: React.FC<IGridTableProps> = props => {

  const getPaginationButton = (p: any, onPageChange: any) => {
    switch (p.page) {
      case "First":
      case "Last":
      case "Back":
      case "Next":
        return <a key={p.page} className={p.disabled ? 'disabled' : ''} onClick={(e) => { console.log(`${p.page} pressed1`); e.preventDefault(); onPageChange(p.page); e.stopPropagation(); }}></a>;
      default:
        return <a key={p.page} className={p.active ? 'active' : ''} onClick={(e) => {
          if (props.onTableChange)
            props.onTableChange('pagination', {
              page: p.page,
              sizePerPage: props.queryParams?.pagingParams?.pageSize,
              sortField: props.queryParams?.sortingParams?.sortColumnName,
              sortOrder: props.queryParams?.sortingParams?.sortOrder
            });
        }}>
          {p.page}
        </a>;
    }
  }

  const pageListRenderer = ({
    pages,
    onPageChange
  }) => {
    return (
      <div className="pagination_outer">
        <div>
          {
            pages.map(p => {
              return getPaginationButton(p, onPageChange);
            })
          }
        </div>
      </div>
    );
  };

  const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="form_style py-2 custom-size-filter">
      <div className="row align-items-center mx-1">
        <div className="col-sm-6">
          <span> {props.intl.formatMessage({ id: "LABEL_GRID_TOTAL_NO_OF_RECORD" })} : {props.totalSize}</span>
        </div>
        <div className="col-sm-6">
          <div className="form-group m-0 float-sm-right d-flex align-items-center">
            <span>{props.intl.formatMessage({ id: "LABEL_GRID_RESULT_PER_PAGE" })}:</span>
            <div className="select-wrapper record-select">
              <select className="form-control"
                onChange={(event) => onSizePerPageChange(event.target.value)}
                value={props.queryParams?.pagingParams?.pageSize}>
                {
                  options.map((option) => (
                    <option key={option.text} className="form-control" >
                      {option.text}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  const emptyDataIndication = () => {
    return (<div className="record_outer">
      <span className="recordNot_found">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        {props.intl.formatMessage({ id: "LABEL_GRID_NO_RECORD_FOUND" })}.
      </span>
    </div>);
  }

  const options = {
    sizePerPageRenderer,                                   // For page size dropdown 
    pageListRenderer,                                      // For pagination list

    page: props.queryParams?.pagingParams?.pageIndex,
    sizePerPage: props.queryParams?.pagingParams?.pageSize,
    totalSize: props.totalSize,
    paginationSize: 5,

    alwaysShowAllBtns: true,
    withFirstAndLast: true,
    hidePageListOnlyOnePage: true,

    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',

    sizePerPageList:
      [
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 }
      ]
  };

  return (

    <div>
      {
        <PaginationProvider pagination={paginationFactory(options)}>
          {

            ({ paginationProps, paginationTableProps }) => (
              <div>
                <SizePerPageDropdownStandalone
                  {...paginationProps} />
                <div className="overflowX-show">
                  <BootstrapTable
                    remote
                    keyField="projectId"
                    data={props.data}
                    columns={props.columns}
                    classes={`${props.className} table_responsive`}
                    onTableChange={props.onTableChange}
                    noDataIndication={emptyDataIndication}
                    sort={{
                      dataField: props.queryParams?.sortingParams?.sortColumnName,
                      order: props.queryParams?.sortingParams?.sortOrder
                    }}
                    {...paginationTableProps} />
                </div>
              </div>
            )
          }
        </PaginationProvider>
      }
    </div>
  );
}

export default DataGrid


