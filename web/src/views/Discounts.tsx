import React, { Component } from 'react';
import CalculationsSummaryTable from '../components/Table/CalculationsSummaryTable';
import DiscountForm from '../components/Forms/Discount/DiscountForm';
import CalculationsSummaryType from '../enums/CalculationsSummaryType'; 

class Discounts extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-wrap discount_wrap">
              <div className="heading-subtitle">
                <h1>
                  <span className="d-md-block d-none">
                  TITLE_JUSTIFICATION
                  </span>
                  <span className="d-md-none">TITLE_JUSTIFICATION_SHORT</span>
                </h1>
                <p className="text-green">SUB_TITLE_DISCOUNTS</p>
              </div>
              <CalculationsSummaryTable name={CalculationsSummaryType.subContractor}></CalculationsSummaryTable>
              <DiscountForm></DiscountForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discounts;
