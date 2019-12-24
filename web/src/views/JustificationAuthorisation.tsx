import React from 'react';
import { FormattedMessage } from 'react-intl';
import Tile from '../components/Tile';
import { Row, Col } from 'react-bootstrap';
import { match } from 'react-router-dom';
import { History } from 'history';

interface IProps {
  match: match<{projectId:string}>;
  history : History;
}
const JustificationAuthorisation: React.FC<IProps> = props => {
  const testData = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore';
  const redirect = (module:string) => {
    return props.history.push(`/${module}/${props.match.params.projectId}`);
  };
  return (
    <div className="container-fluid" data-test="j-a-component">
      <Row>
        <Col lg={12}>
          <div className="custom-wrap">
            <div className="heading-subtitle">
              <h1>
                <span className="d-md-block d-none">
                  <FormattedMessage id="JA_HEADER"></FormattedMessage>
                </span>{' '}
                <span className="d-md-none">J&amp;A</span>
              </h1>
              <p>
                <FormattedMessage id="JA_COMMON_TEXT"></FormattedMessage>
              </p>
            </div>
                <Row>
                <Col lg={12}>
                  <div className="card_outer_wrap">
                    <Row className="pt-lg-3">
                      <Col lg={4} className="pl-md-2 pr-md-2" data-test="preliminaries-tile" onClick={()=> redirect('preliminaries')}>
                        <Tile headingKey='PAGE_PRELIMINARY_TITLE' contentKey={testData}></Tile>
                      </Col>
                      <Col lg={4} className="pl-md-2 pr-md-2" data-test="subcontractor-tile" onClick={()=> redirect('Subcontractor')}>
                        <Tile headingKey='PAGE_SUB_TITLE' contentKey={testData}></Tile>
                      </Col>
                      <Col lg={4} className="pl-md-2 pr-md-2" data-test="discounts-tile" onClick={()=> redirect('Discounts')}>
                        <Tile headingKey='SUB_TITLE_DISCOUNTS' contentKey={testData}></Tile>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            <div className="mr-35 three-btn mt-4">
              <button
                className="active"
                type="button"
                data-test="previous-button"
                onClick={() => redirect('projectoverview')}
              >
                {' '}
                <FormattedMessage id="BUTTON_PREVIOUS"></FormattedMessage>
              </button>
              <button
                type="button"
                name="next"
                className=""
                data-test="next-button"
                onClick={() => redirect('preliminaries')}
              >
                <FormattedMessage id="BUTTON_NEXT"></FormattedMessage>
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JustificationAuthorisation;
