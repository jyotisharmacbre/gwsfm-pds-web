import React, { Component } from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { ai, getAppInsights } from './TelemetryService';
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TelemetryContext } from './TelemetryContext';

interface IProps extends RouteComponentProps {
    history: History;
    instrumentationKey: string;
    after?: () => void;
}

/**
 * This Component provides telemetry with Azure App Insights
 *
 * NOTE: the package '@microsoft/applicationinsights-react-js' has a HOC withAITracking that requires this to be a Class Component rather than a Functional Component
 */

class TelemetryProvider extends Component<IProps> {
    state = {
        initialized: false
    };

    constructor(props) {
        super(props);
        const { history } = this.props;
        const { initialized } = this.state;
        const AppInsightsInstrumentationKey = this.props.instrumentationKey; // PUT YOUR KEY HERE
        if (!Boolean(initialized) && Boolean(AppInsightsInstrumentationKey) && Boolean(history)) {
            ai.initialize(AppInsightsInstrumentationKey, history);
            this.setState({ initialized: true });
        }
        if (this.props.after)
            this.props.after();
    }

    render() {
        const { children } = this.props;
        return (
            <TelemetryContext.Provider value={getAppInsights()}>
                {children}
            </TelemetryContext.Provider>
        );
    }
}

export default withRouter(withAITracking(ai.reactPlugin, TelemetryProvider));
