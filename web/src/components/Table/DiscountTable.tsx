import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class DiscountTable extends Component {
  render() {
    return (
      <div className="col-lg-8 px-0">
        <div className="price-sumry discount_table">
          <div className="inner-block">
            <table className="price-table">
              <thead>
                <tr>
                  <th><FormattedMessage id="T_HEADING_TOTAL_COST" /></th>
                  <th><FormattedMessage id="T_HEADING_TOTAL_MARGIN" /> </th>
                  <th><FormattedMessage id="T_HEADING_GROSS_MARGIN" /> </th>
                  <th><FormattedMessage id="T_HEADING_TOTAL_SELL" /> </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&#163;36,000,00 </td>
                  <td>25 % </td>
                  <td>&#163;40,000,00 </td>
                  <td>&#163;40,000,00 </td>
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
