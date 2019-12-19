import { Grid } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
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
import Pipeline from './Pipeline';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { getDisplayName } from '../helpers/auth-helper';


class Dashboard extends React.Component<IReactIntl> {


  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="custom-wrap">
                <div className="row align-items-center">
                  <div className="col-xl-6">
                    <h1 className="mb-0">{formatMessage('TITLE_WELCOME')} {getDisplayName() && getDisplayName()}</h1>
                  </div>
                  <div className="col-xl-6">
                    <div className="mr-35 three-btn justify-content-xl-end justify-content-lg-start pb-0">
                      <Link to="/Pipeline">
                        <button name="save" className="active mr-3" type="button">{formatMessage('BUTTON_PIPELINE')}</button>
                      </Link>
                      <Link to="/Project">
                        <button type="button" name="next">{formatMessage('BUTTON_CREATE_NEW_PROJ')}</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pipeline></Pipeline>
          </div>
        </div>

      </div>
    );
  }
}

export default injectIntl(Dashboard);
