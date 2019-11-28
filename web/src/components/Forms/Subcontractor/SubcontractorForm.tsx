import React, { Component } from 'react';
import DiscountTable from '../../Table/DiscountTable';
import SubContractorActivityForm from './SubContractorActivityForm';

class SubcontractorForm extends Component {

  render() {
    return (
      <form className="subcontractor_form">
        <DiscountTable></DiscountTable>
        <SubContractorActivityForm></SubContractorActivityForm>
        <div className="newActiv_btn">
              <button>New Activity</button>
          </div>
          <div className="hr_line"></div>
          <div className="mr-35 d-flex justify-content-between mb-4">
            <button className="active mb-4 mt-5" type="button">PREVIOUS</button>
            <button type="button" name="next" className="mb-4 mt-5 text-right mr-0">SAVE</button>
          <button type="button" name="next" className="mb-4 mt-5 text-right mr-0">NEXT</button>
          </div>
      </form>

    );
  }
}

export default SubcontractorForm;