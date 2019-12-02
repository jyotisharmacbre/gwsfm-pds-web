import React, { Component } from 'react';
import Quotes from '../../Tile/Quotes';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class SubContractorActivityForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="forms_wrap">
            <span className="delete_text">
              BUTTON_DELETE 
              <FontAwesomeIcon className="" icon={faTrash} />
            </span>
            <div className="row">
              <div className="col-lg-7">
                <form className="custom-wrap p-0">
                  <div className="form-group">
                    <label>LABEL_ACTIVITY_NAME </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="PLACEHOLDER_EG_LOREM"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      LABEL_EXISTING_SUBCONTRACTOR
                    </label>
                    <div className="js-btn2">
                      <button> BUTTON_YES</button>
                      <button className="active">BUTTON_NO</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>LABEL_SUBCONTRACTOR</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="PLACEHOLDER_ENTER_SUBCONTRACTOR'S_NAME "
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      LABEL_PREFERRED_SUPPLIER  Preferred Supplier
                    </label>
                    <div className="js-btn2">
                      <button>BUTTON_YES</button>
                      <button className="active">BUTTON_NO</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>T_HEADING_TOTAL_COST</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">PLACEHOLDER_QUOTE_SYMBOL</span>
                  </div>
                  <div className="form-group">
                    <label>T-HEADING_GROSS_MARGIN</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">SYMBOL_PERCENT</span>
                  </div>
                  <div className="form-group">
                    <label>T-HEADING_TOTAL_SELL</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">PLACEHOLDER_QUOTE_SYMBOL</span>
                  </div>
                  <div className="form-group">
                    <label>LABEL_COMMENTS</label>
                    <textarea
                      className="form-control"
                      style={{ height: 120 }}
                      placeholder="PLACEHOLDER_TYPE_IN_ANY_ADDITIONAL_COMMENTS"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
            <Quotes></Quotes>
          </div>
        </div>
      </div>
    );
  }
}

export default SubContractorActivityForm;
