import { useRef } from "react";

const useComponentWillMount = (fn) => {
    const willMount = useRef(true);
    if (willMount.current) {
        willMount.current = false;
        fn();
    }
};
export default useComponentWillMount; 