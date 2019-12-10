import { Grid } from '@material-ui/core';
import React from 'react';
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

class JustificationAuthorisation extends React.Component<IReactIntl> {
  GetButtons() {
    const action1: IBtnActionProps = {
      Title: 'Create A New Project',
      Icon: 'create',
      Color: 'primary',
      LinkTo: '/Project'
    };
    const action2: IBtnActionProps = {
      Title: 'Pipeline',
      Icon: 'pipeline',
      Color: 'secondary',
      LinkTo: '/Pipeline'
    };
    return [action1, action2];
  }

  viewAll: IBtnActionProps = {
    Title: 'View All',
    Icon: '',
    Color: 'secondary',
    LinkTo: '/Pipeline'
  };

  createTableColumns() {
    return [
      {
        title: 'Name',
        field: 'name',
        customFilterAndSearch: (term: any, rowData: any) =>
          (term = rowData.name.length)
      },
      { title: 'Updated By', field: 'updatedby' },
      { title: 'Date', field: 'date', type: 'date' },
      {
        title: 'Status',
        field: 'status',
        lookup: { 1: 'Draft', 2: 'Submitted', 3: 'Completed' }
      }
    ];
  }

  getTableData() {
    return [
      {
        name: 'Russel street road works',
        updatedby: 'Stacy Salter',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        name: 'London Bridge aqueduct planning',
        updatedby: 'Hame Moore',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        name: '51 Southwark street refilling',
        updatedby: 'Lucy Benner',
        date: new Date('07/21/1987'),
        status: 2
      },
      {
        name: 'Church street reviewing',
        updatedby: 'Imran Khan',
        date: new Date('07/21/1987'),
        status: 3
      },
      {
        name: 'Russel street road works',
        updatedby: 'Jacy Lue',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        name: 'Gregory Nash approval',
        updatedby: 'Stirlin Archer',
        date: new Date('07/21/1987'),
        status: 3
      }
    ];
  }
  render() {
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
                <p>
                  Please select the section that is relevanto to your project.
                </p>
              </div>
              <Tile></Tile>
              <div className="mr-35 three-btn mt-4">
                <button className="active" type="button"> <FormattedMessage id="BUTTON_PREVIOUS"></FormattedMessage></button>
                <button type="button" name="next" className="ml-auto"><FormattedMessage id="BUTTON_SAVE"></FormattedMessage></button>
              <button type="button" name="next" className=""><FormattedMessage id="BUTTON_NEXT"></FormattedMessage></button></div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default injectIntl(JustificationAuthorisation);
