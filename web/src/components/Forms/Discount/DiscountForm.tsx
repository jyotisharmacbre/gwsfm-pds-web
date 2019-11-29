import React, { Component } from 'react';

class DiscountForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="Discountforms_wrap">
            <div className="row">
              <div className="col-lg-7">
                <form className="custom-wrap p-0">
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
                      className="width-120 form-control"
                      type="text"
                      placeholder=""
                    />
                    <span className="symbol_fix">&#163;</span>
                    <label className="w-100 mb-0 mt-3">
                      Sub-Total Discounts
                    </label>
                    <label className="m-0">&#163;2,000.00</label>
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

            <div className="hr_line"></div>

            <div className="row">
              <div className="col-lg-7">
                <form className="custom-wrap p-0">
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
                      className="width-250 form-control"
                      type="text"
                      placeholder=""
                    />
                    <span className="symbol_fix">&#163;</span>
                    <label className="w-100 mb-0 mt-3">
                      Sub-Total Discounts
                    </label>
                    <label className="m-0">&#163;2,000.00</label>
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
              </div>
            </div>

            <div className="hr_line mb-0 mt-4"></div>

            <div className="mr-35 three-btn">
              <button className="active" type="button">
                PREVIOUS
              </button>
              <button type="button" name="next" className="active ml-auto">
                SAVE
              </button>
              <button type="button" name="next">
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscountForm;
