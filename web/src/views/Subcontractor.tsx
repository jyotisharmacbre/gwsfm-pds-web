import React, { Component } from 'react';
import SubcontractorForm from '../components/Forms/Subcontractor/SubcontractorForm';
import { ISubContractor } from '../store/SubContractor/Types/ISubContractor';

interface IProps {}
const Subcontractor: React.FC<IProps> = props => {
  const handlePrevious = (data: ISubContractor) => {
    console.log('Data');
  };
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
                <p className="text-green">SUBCONTRACTORS</p>
              </div>
            <SubcontractorForm
              onSave={handlePrevious}
              onNext={handlePrevious}
              onPrevious={handlePrevious}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subcontractor;
