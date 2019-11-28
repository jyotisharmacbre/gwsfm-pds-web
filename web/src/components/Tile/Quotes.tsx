import React, { Component } from 'react';

class Quotes extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card_outer_wrap quote_wrap">
            <div className="row pt-lg-4">
              <div className="col-lg-4 pl-md-2 pr-md-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title">Quote 01</h6>
                    <form>
                      <div className="form-group">
                        <label>Supplier's Name</label>
                        <input type="text" placeholder="Enter Name" />
                      </div>
                      <div className="form-group">
                        <label>Quote Value (&#163;)</label>
                        <input type="text" placeholder="&#163;" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pl-md-2 pr-md-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title">Quote 02</h6>
                    <form>
                      <div className="form-group">
                        <label>Supplier's Name</label>
                        <input type="text" placeholder="Enter Name" />
                      </div>
                      <div className="form-group">
                        <label>Quote Value (&#163;)</label>
                        <input type="text" placeholder="&#163;" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pl-md-2 pr-md-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title">Quote 03</h6>
                    <form>
                      <div className="form-group">
                        <label>Supplier's Name</label>
                        <input type="text" placeholder="Enter Name" />
                      </div>
                      <div className="form-group">
                        <label>Quote Value (&#163;)</label>
                        <input type="text" placeholder="&#163;" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quotes;
