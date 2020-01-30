import { createContext } from 'react';
import { ai } from './TelemetryService';

const TelemetryContext = createContext(ai.appInsights);



export default TelemetryContext;

