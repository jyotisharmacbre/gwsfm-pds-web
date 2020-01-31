import React from "react";
import { SeverityLevel } from "@microsoft/applicationinsights-web";
import TelemetryContext from "../../contexts/Telemetry/TelemetryContext";

interface IProps {
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
            const { onError } = this.props;
            return onError == undefined ? <h1>Something went wrong</h1>
                : typeof onError === "function"
                ? onError()
                : React.createElement(onError);
        }

        return this.props.children;
    }
}

export default ErrorBoundary