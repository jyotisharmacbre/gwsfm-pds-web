import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import CardContainer from '../components/CardContainer/CardContainer';
import MultipleChart from '../components/Charts/MultipleCharts';
import PreferredChart from '../components/Charts/PreferredChart';
import RunRateChart from '../components/Charts/RunRateChart';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import Table from '../components/Table/Simple/Table';
import { IBtnActionProps } from '../props/AppProps';
import IReactIntl from '../Translations/IReactIntl';
import Translate from '../Translations/translate';
import { Link } from 'react-router-dom';
import { Tile } from '../components/Tile';
import { Row, Col } from 'react-bootstrap';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { useHistory } from 'react-router-dom';

interface IProps {
  match: any;
}
const JustificationAuthorisation: React.FC<IProps> = (props: IProps) => {
  let history = useHistory();
  const redirectToPrelims = () => {
    return history.push(`/preliminaries/${props.match.params.projectId}`);
  };
  return (
    <div className="container-fluid">
      <Row>
        <Col lg={12}>
          <div className="custom-wrap">
            <div className="heading-subtitle">
              <h1>
                <span className="d-md-block d-none">
                  Justification &amp; Authorisation
                </span>{' '}
                <span className="d-md-none">J&amp;A</span>
              </h1>
              <p>Please select the section that is relevant to your project.</p>
            </div>
            <Tile></Tile>
            <div className="mr-35 three-btn mt-4">
              <button className="active" type="button">
                {' '}
                <FormattedMessage id="BUTTON_PREVIOUS"></FormattedMessage>
              </button>
              <button type="button" name="next" className="ml-auto">
                <FormattedMessage id="BUTTON_SAVE"></FormattedMessage>
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
