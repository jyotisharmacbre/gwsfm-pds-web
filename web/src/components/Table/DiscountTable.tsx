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
                  <th>Total Cost</th>
                  <th>Total Margin</th>
                  <th>Gross Margin</th>
                  <th>Total Sell</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&#163;36,000,00</td>
                  <td>25 %</td>
                  <td>&#163;40,000,00</td>
                  <td>&#163;40,000,00</td>
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
