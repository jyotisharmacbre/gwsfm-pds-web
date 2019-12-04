import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage } from '../../Translations/connectedIntlProvider';

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
                    <h6 className="title"><FormattedMessage id="TITLE_QUOTE1" /> </h6>
                    <form>
                      <div className="form-group">
                        <label><FormattedMessage id="LABEL_SUPPLIER1" /></label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder={formatMessage('PLACEHOLDER_QUOTE_SUPPLIER1')}
                        />
                      </div>
                      <div className="form-group">
                        <label><FormattedMessage id="LABEL_QUOTE1" /> (&#163;)</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="$"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pl-md-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title"><FormattedMessage id="TITLE_QUOTE2" /></h6>
                    <form>
                      <div className="form-group">
                        <label><FormattedMessage id="LABEL_SUPPLIER2" /></label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder={formatMessage('PLACEHOLDER_QUOTE_SUPPLIER1')}
                        />
                      </div>
                      <div className="form-group">
                        <label><FormattedMessage id="LABEL_QUOTE2" /> (&#163;)</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="$"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 pl-md-2 pr-lg-2">
                <div className="card_wrap">
                  <div className="card">
                    <h6 className="title"><FormattedMessage id="TITLE_QUOTE3" /></h6>
                    <form>
                      <div className="form-group">
                        <label><FormattedMessage id="LABEL_SUPPLIER3" /></label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="&#163;"
                        />
                      </div>
                      <div className="form-group">
                        <label><FormattedMessage id="LABEL_QUOTE3" /> (&#163;)</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="$"
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
