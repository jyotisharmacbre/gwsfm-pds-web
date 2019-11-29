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
              DELETE
              <FontAwesomeIcon className="" icon={faTrash} />
            </span>
            <div className="row">
              <div className="col-lg-7">
                <form className="custom-wrap p-0">
                  <div className="form-group">
                    <label>ACtivity Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Eg. Lorem Ipsum"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Existing Subcontractor
                    </label>
                    <div className="js-btn2">
                      <button>YES</button>
                      <button className="active">NO</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subcontractor</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Subcontractor's Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Preferred Supplier
                    </label>
                    <div className="js-btn2">
                      <button>YES</button>
                      <button className="active">NO</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Total Cost</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">&#163;</span>
                  </div>
                  <div className="form-group">
                    <label>Gross Margin</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">%</span>
                  </div>
                  <div className="form-group">
                    <label>Total Sell</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">&#163;</span>
                  </div>
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea
                      className="form-control"
                      style={{ height: 120 }}
                      placeholder="Type in any additional comments"
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
