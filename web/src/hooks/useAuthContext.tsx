import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider/AuthContext";

const useAuthContext = () => useContext(AuthContext)
export default useAuthContext; 