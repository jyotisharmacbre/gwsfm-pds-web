import React from "react";
import { SeverityLevel } from "@microsoft/applicationinsights-web";
import TelemetryContext from "../../contexts/Telemetry/TelemetryContext";
import Error from '../../views/Error/Error';
import ErrorType from "../../enums/ErrorType";
import { History, Location } from 'history';

interface IProps {
    showPage?:boolean
    onError?: any;
    history: History;
    location: Location
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
            return (showPage != undefined && showPage) ? <Error history={this.props.history} location={this.props.location} type={ErrorType.warning}></Error> : onError == undefined ? <h1>Something went wrong</h1>
                : typeof onError === "function"
                ? onError()
                : React.createElement(onError);
        }

        return this.props.children;
    }
}

export default ErrorBoundary