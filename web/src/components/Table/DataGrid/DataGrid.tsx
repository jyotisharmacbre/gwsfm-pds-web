import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { IGridTableProps } from '../../../models/IGridTableProps';
import { CircularProgress } from '@material-ui/core';
import excelIcon from '../../../assests/images/excel_icon_white.svg';
import excelIcon2 from '../../../assests/images/excel_icon.svg';

const DataGrid: React.FC<IGridTableProps> = props => {

  const getPaginationButton = (p: any, onPageChange: any) => {
    switch (p.page) {
      case "First":
      case "Last":
      case "Back":
      case "Next":
        return <a key={p.page} className={p.disabled ? 'disabled' : ''} onClick={() => onPageChange(p.page)}></a>;
      default:
        return <a key={p.page} className={p.active ? 'active' : ''} onClick={() => {
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
      props.pagination && <div className="pagination_outer">
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
    <div className="form_style custom-size-filter">
      <div className="row align-items-center mx-1">
        <div className="col-md-4">
          <span> {props.intl.formatMessage({ id: "LABEL_GRID_TOTAL_NO_OF_RECORD" })} : {props.totalSize}</span>
        </div>
        <div className="col-md-8">
          <div className="form-group m-0 float-md-right d-flex align-items-center">
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
            {
              props.showExcel && <div className="filters_outer m-0 justify-content-between d-flex">
                <span className="m-0">
                  <button
                    className="excel_icon"
                    type="button"
                    onClick={() => props.exportToExcelPipelineData && props.exportToExcelPipelineData()}
                    disabled={props.exportLoader}
                    data-test="export_to_excel"
                  >
                    EXPORT
                    {props.exportLoader && <CircularProgress />}
                    <img className="before_hover" src={excelIcon} alt="microsoft excel icon" />
                    <img className="hover" src={excelIcon2} alt="microsoft excel icon" />
                  </button>
                </span>
              </div>
            }
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
        { text: '20', value: 20 },
        { text: '30', value: 30 },
        { text: '40', value: 40 },
        { text: '50', value: 50 }
      ]
  };

  return (

    <div>
      {
        <PaginationProvider pagination={paginationFactory(options)}>
          {

            ({ paginationProps, paginationTableProps }) => (
              <div>

                {props.pagination && <SizePerPageDropdownStandalone
                  {...paginationProps} />
                }
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
                    {...paginationTableProps}
                  />
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


