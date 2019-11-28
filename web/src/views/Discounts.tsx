import React, { Component } from 'react';
import DiscountTable from '../components/Table/DiscountTable';
import DiscountForm from '../components/Forms/Discount/DiscountForm';

class Discounts extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-wrap">
              <div className="heading-subtitle">
                <h1>
                  <span className="d-md-block d-none">
                    Justification &amp; Authorisation
                  </span>
                  <span className="d-md-none">J&amp;A</span>
                </h1>
                <p>DISCOUNTS</p>
              </div>
              <DiscountTable></DiscountTable>
              <DiscountForm></DiscountForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discounts;
