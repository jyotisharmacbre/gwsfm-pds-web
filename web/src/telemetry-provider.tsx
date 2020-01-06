import React, { Fragment, useState, useEffect } from 'react';
import {
  withAITracking
} from '@microsoft/applicationinsights-react-js';
import { ai } from './TelemetryService';
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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
const TelemetryProvider: React.FC<IProps> = props => {
  const [initialized, setInit] = useState<boolean>(false);

  useEffect(() => {
    const { history } = props;
    const AppInsightsInstrumentationKey = props.instrumentationKey; // PUT YOUR KEY HERE
    if (
      !Boolean(initialized) &&
      Boolean(AppInsightsInstrumentationKey) &&
      Boolean(history)
    ) {
      ai.initialize(AppInsightsInstrumentationKey, history);
      setInit(true);
    }
    
    if (props.after) props.after();

  }, []);

  return <Fragment>{props.children}</Fragment>;
};

export default withRouter(withAITracking(ai.reactPlugin, TelemetryProvider));
