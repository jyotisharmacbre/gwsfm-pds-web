import React, { Component } from 'react';

class DiscountForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <div className="forms_wrap">
            <form className="custom-wrap">
              <h2>SubContractor Discount</h2>
              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter supplier name"
                />
              </div>
              <div className="form-group">
                <label>State Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter state details"
                />
              </div>
              <div className="form-group">
                <label>Total Discount</label>
                <input
                  className="symbol_fix width-120 form-control"
                  type="text"
                  placeholder="Enter state details"
                />
                <span>&#163;</span>
                <label>Sub-Total Discounts</label>
                <label>&#163;2,000.00</label>
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
            <div className="hr_line"></div>
            <form className="custom-wrap">
              <h2>Client Discount</h2>
              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter client name"
                />
              </div>
              <div className="form-group">
                <label>State Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter state details"
                />
              </div>
              <div className="form-group">
                <label>Discount Type</label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Percentage"
                    id="1"
                  />
                  <label className="form-check-label" htmlFor="1">
                    Percentage (%)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Value"
                    id="2"
                  />
                  <label className="form-check-label" htmlFor="2">
                    Value (#)
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Discount</label>
                <input
                  className="symbol_fix width-120 form-control"
                  type="text"
                  placeholder="Enter value"
                />
                <span>&#163;</span>
                <label>Sub-Total Discounts</label>
                <label>&#163;2,000.00</label>
              </div>

              <div className="form-group">
                <label>Comments</label>
                <textarea
                  className="form-control"
                  style={{ height: 100 }}
                  placeholder="Type in any additional comments"
                ></textarea>
              </div>
            </form>
            <div className="hr_line"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscountForm;
