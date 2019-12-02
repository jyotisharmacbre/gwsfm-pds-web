import React, { Component } from 'react';

class Quotes extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card_outer_wrap quote_wrap">
            <div className="row">
              <div className="col-lg-4 pl-md-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title">TITLE_QUOTE1</h6>
                    <form>
                      <div className="form-group">
                        <label>LABEL_SUPPLIER1</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="PLACEHOLDER_QUOTE_SUPPLIER1"
                        />
                      </div>
                      <div className="form-group">
                        <label>LABEL_QUOTE1</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="PLACEHOLDER_QUOTE_SYMBOL"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pl-md-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title">TITLE_QUOTE2</h6>
                    <form>
                      <div className="form-group">
                        <label>LABEL_SUPPLIER2</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="PLACEHOLDER_QUOTE_SUPPLIER1"
                        />
                      </div>
                      <div className="form-group">
                        <label>LABEL_QUOTE2</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="PLACEHOLDER_QUOTE_SYMBOL"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pl-md-2 pr-lg-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title">TITLE_QUOTE3</h6>
                    <form>
                      <div className="form-group">
                        <label>LABEL_SUPPLIER3</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="PLACEHOLDER_QUOTE_SUPPLIER2"
                        />
                      </div>
                      <div className="form-group">
                        <label>LABEL_QUOTE3</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="PLACEHOLDER_QUOTE_SYMBOL"
                        />
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
