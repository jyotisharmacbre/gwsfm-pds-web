import React, { Component } from 'react';
import SubcontractorForm from '../components/Forms/Subcontractor/SubcontractorForm';
import { FormattedMessage } from 'react-intl';

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
                     <FormattedMessage id="TITLE_JUSTIFICATION" />
                  </span>
                  <span className="d-md-none"><FormattedMessage id="TITLE_JUSTIFICATION_SHORT" /></span>
                </h1>
                <p className="text-green"><FormattedMessage id="PAGE_SUB_TITLE" /></p>
              </div>

              <SubcontractorForm></SubcontractorForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subcontractor;
