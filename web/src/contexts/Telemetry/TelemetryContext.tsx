import { createContext, useContext } from 'react';
import { ai } from './TelemetryService';

const TelemetryContext = createContext(ai.appInsights);

const useTelemetryContext = () => useContext(TelemetryContext)

export { TelemetryContext, useTelemetryContext };

