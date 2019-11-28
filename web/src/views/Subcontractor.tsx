import React, { Component } from 'react';
import DiscountTable from '../components/Table/DiscountTable';
import SubcontractorForm from '../components/Forms/Subcontractor/SubcontractorForm';

class Subcontractor extends Component {
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
                <p>SUBCONTRACTORS</p>
              </div>
              <DiscountTable></DiscountTable>
              <SubcontractorForm></SubcontractorForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subcontractor;
