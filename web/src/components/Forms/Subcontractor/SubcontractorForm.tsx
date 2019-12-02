import React, { Component } from 'react';
import DiscountTable from '../../Table/DiscountTable';
import SubContractorActivityForm from './SubContractorActivityForm';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class SubcontractorForm extends Component {
  render() {
    return (
      <form className="subcontractor_form">
        <DiscountTable></DiscountTable>
        <SubContractorActivityForm></SubContractorActivityForm>
        <div className="newActiv_btn">
          <button type="button" className="active">
            <FontAwesomeIcon className="" icon={faPlusCircle} />
            BUTTON_NEW_ACTIVITY
          </button>
        </div>

        <div className="mr-35 three-btn">
          <button className="active" type="button">
          BUTTON_PREVIOUS
          </button>
          <button type="button" name="next" className="active ml-auto">
          BUTTON_SAVE
          </button>
          <button type="button" name="next" className="">
          BUTTON_NEXT
          </button>
        </div>
      </form>
    );
  }
}

export default SubcontractorForm;
