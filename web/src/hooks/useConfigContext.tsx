import { useContext } from "react";
import ConfigContext from "../contexts/Config/ConfigContext";

const useConfigContext = () => useContext(ConfigContext)
export default useConfigContext; 