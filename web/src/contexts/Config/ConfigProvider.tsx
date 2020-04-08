import React, { Component } from 'react';
import ConfigContext from './ConfigContext';
import IConfig from '../../models/IConfig';
import appConfig from '../../helpers/config-helper';

class ConfigProvider extends Component {

    config: IConfig = {} as IConfig;
    constructor(props) {
        super(props);
        let appconfigObj = appConfig();
        this.config = {
            REACT_APP_AUTHORITY: appconfigObj.REACT_APP_AUTHORITY,
            REACT_APP_CLIENT_ID: appconfigObj.REACT_APP_CLIENT_ID,
            REACT_APP_INSIGHTS_KEY: appconfigObj.REACT_APP_INSIGHTS_KEY,
            REACT_APP_MIDDLETIER_URL: appconfigObj.REACT_APP_MIDDLETIER_URL,
            REACT_APP_GATEWAY_URL: appconfigObj.REACT_APP_GATEWAY_URL,
            REACT_APP_DATE_FORMAT: appconfigObj.REACT_APP_DATE_FORMAT,
            REACT_APP_TOASTER_TIME_OUT: parseInt(appconfigObj.REACT_APP_TOASTER_TIME_OUT),
            REACT_APP_SHOW_PCIP: JSON.parse(appconfigObj.REACT_APP_SHOW_PCIP)
        }
    }

    render() {
        const { children } = this.props;
        return (
            <ConfigContext.Provider value={this.config}>
                {children}
            </ConfigContext.Provider>
        );
    }
}

export default ConfigProvider;
