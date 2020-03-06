import React from "react";
import { SeverityLevel } from "@microsoft/applicationinsights-web";
import TelemetryContext from "../../contexts/Telemetry/TelemetryContext";
import Error from '../../views/Error/Error';
import ErrorType from "../../enums/ErrorType";
import { FormattedMessage } from "react-intl";

interface IProps {
    showPage?:boolean
    onError?: any;
 }

class ErrorBoundary extends React.Component<IProps> {
    static contextType = TelemetryContext
    state = { hasError: false  };

    componentDidCatch(error, info) {
        const appInsights = this.context
        this.setState({ hasError: true });
        appInsights && appInsights.trackException({
            error: error,
            exception: error,
            severityLevel: SeverityLevel.Error,
            properties: { ...info }
        });
    }

    render() {
        if (this.state.hasError) { 
            const { showPage, onError } = this.props;
            return (showPage != undefined && showPage) ?
                <Error data-test="error_page" type={ErrorType.renderError}></Error> : onError == undefined ?
                <FormattedMessage data-test="error_message" id="MESSAGE_ERROR" />
                : typeof onError === "function"
                ? onError()
                : React.createElement(onError);
        }

        return this.props.children;
    }
}

export default ErrorBoundary