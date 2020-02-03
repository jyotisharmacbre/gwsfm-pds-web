import { useContext } from "react";
import TelemetryContext from "../contexts/Telemetry/TelemetryContext";

const useTelemetryContext = () => useContext(TelemetryContext)
export default useTelemetryContext; 