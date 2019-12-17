import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Tile } from '../components/Tile';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

interface IProps {
  match: any;
}
const JustificationAuthorisation: React.FC<IProps> = (props: IProps) => {
  let history = useHistory();
  const redirectToPrelims = () => {
    return history.push(`/preliminaries/${props.match.params.projectId}`);
  };
  const redirectToOverview = () => {
    return history.push(`/projectoverview/${props.match.params.projectId}`);
  };
  return (
    <div className="container-fluid">
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
            <Tile></Tile>
            <div className="mr-35 three-btn mt-4">
              <button
                className="active"
                type="button"
                onClick={redirectToOverview}
              >
                {' '}
                <FormattedMessage id="BUTTON_PREVIOUS"></FormattedMessage>
              </button>
              <button
                type="button"
                name="next"
                className=""
                onClick={redirectToPrelims}
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
