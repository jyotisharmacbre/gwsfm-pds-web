import React from 'react';
import injectIntl from 'react-intl/dist/components/injectIntl';
import { Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export function Tile(props: any) {
  return (
    <Row>
      <Col lg={12}>
        <div className="card_outer_wrap">
          <Row className="pt-lg-4">
            <Col lg={4} className="pl-md-2 pr-md-2">
              <div className="card_wrap">
                <span className="tick_wrap active">
                  <FontAwesomeIcon className="" icon={faCheck} />
                </span>
                <div className="card">
                  <h4 className="title">Preliminaries</h4>
                  <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} className="pl-md-2 pr-md-2">
              <div className="card_wrap">
                <span className="tick_wrap">
                  <FontAwesomeIcon className="" icon={faCheck} />
                </span>
                <div className="card">
                  <h4 className="title">Subcontractors</h4>
                  <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} className="pl-md-2 pr-md-2">
              <div className="card_wrap">
                <span className="tick_wrap">
                  <FontAwesomeIcon className="" icon={faCheck} />
                </span>
                <div className="card">
                  <h4 className="title">Discounts</h4>
                  <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default injectIntl(Tile);
