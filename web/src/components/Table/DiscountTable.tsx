import React, { Component } from 'react';

class DiscountTable extends Component {
  render() {
    return (
      <div className="col-lg-8 px-0">
        <div className="price-sumry discount_table">
          <div className="inner-block">
            <table className="price-table">
              <thead>
                <tr>
                  <th>T_HEADING_TOTAL_COST </th>
                  <th>T-HEADING_TOTAL_MARGIN </th>
                  <th>T-HEADING_GROSS_MARGIN </th>
                  <th>T-HEADING_TOTAL_SELL </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>T_DATA_CALCULATION1  </td>
                  <td>T_DATA_CALCULATION2  </td>
                  <td>T_DATA_CALCULATION3  </td>
                  <td>T_DATA_CALCULATION4  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscountTable;
