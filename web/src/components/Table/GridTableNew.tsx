import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { IGridTableProps } from '../../props/AppProps';
const GridTableNew: React.FC<IGridTableProps> = props => {

  useEffect(
    () => {
      let element = document.querySelectorAll('.react-bootstrap-table-pagination .customSizeFilter')
      if (element.length > 0) {
        element[0]['style'].display = "none";
      }
    }, []
  );

  const getPaginationButton = (p: any, onPageChange: any) => {
    switch (p.page) {
      case "First":
      case "Last":
      case "Back":
      case "Next":
        return <a className={p.disabled ? "disabled" : ""} onClick={() => onPageChange(p.page)}></a>;
      // case "Last":
      //   return <a className="" onClick={() => onPageChange(p.page)}></a>;
      // case "Back":
      //   return <a className="" onClick={() => onPageChange(p.page)}></a>;
      // case "Next":
      //   return <a className="" onClick={() => onPageChange(p.page)}></a>;
      default:
        return <a className={p.active ? "active" : ""} onClick={() => onPageChange(p.page)}>{p.page}</a>;
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
    <form>
      <div className="customSizeFilter form-group">
        <div className="select-wrapper record-select">
          <select className="form-control">
            {
              options.map((option) => (
                <option className="form-control" onClick={() => onSizePerPageChange(option.page)}>{option.text}
                </option>

              ))
            }
          </select>
        </div>
      </div>
    </form>
  );

  const options = {
    // custom: true,  // For standalone components
    sizePerPageRenderer,// For page size dropdown 
    pageListRenderer, // for pagination list
    page: props.page,
    sizePerPage: props.sizePerPage,
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
      <PaginationProvider pagination={paginationFactory(options)}>
        {
          ({ paginationProps, paginationTableProps }) => (
            <div>
              <SizePerPageDropdownStandalone
                {...paginationProps} />
              <BootstrapTable
                remote
                keyField="projectId"
                data={props.data}
                columns={props.columns}
                // defaultSorted={props.defaultSorted}
                classes={`${props.className} table_responsive`}
                // onTableChange={props.onTableChange}
                {...paginationTableProps}
              />
            </div>
          )
        }
      </PaginationProvider>
    </div>
  );
}

export default GridTableNew


