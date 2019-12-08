import React, { Component } from 'react';
import DiscountTable from '../components/Table/DiscountTable';
import DiscountForm from '../components/Forms/Discount/DiscountForm';
import DiscountTableType from '../enums/DiscountTableType'; 

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
              <DiscountTable name={DiscountTableType.subContractor}></DiscountTable>
              <DiscountForm></DiscountForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discounts;
