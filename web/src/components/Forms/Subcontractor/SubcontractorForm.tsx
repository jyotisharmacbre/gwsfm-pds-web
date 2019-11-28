import React, { Component } from 'react';
import Quotes from '../../Tile/Quotes';

class SubcontractorForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="forms_wrap">
            <div className="row">
              <div className="col-lg-8">
                <form className="custom-wrap">
                  <div className="form-group">
                    <label>ACtivity Name</label>
                    <input type="text" placeholder="Eg. Lorem Ipsum" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Existing Subcontractor
                    </label>
                    <div className="js-btn2">
                      <button type="button">YES</button>
                      <button className="active" type="button">
                        NO
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subcontractor</label>
                    <input
                      type="text"
                      placeholder="Enter Subcontractor's Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Preferred Supplier
                    </label>
                    <div className="js-btn2">
                      <button type="button">YES</button>
                      <button className="active" type="button">
                        NO
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Total Cost</label>
                    <input type="text" className="symbol_fix" placeholder="" />
                    <span>&#163;</span>
                  </div>
                  <div className="form-group">
                    <label>Gross Margin</label>
                    <input type="text" className="symbol_fix" placeholder="" />
                    <span>%</span>
                  </div>
                  <div className="form-group">
                    <label>Total Sell</label>
                    <input type="text" className="symbol_fix" placeholder="" />
                    <span>&#163;</span>
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

export default SubcontractorForm;
