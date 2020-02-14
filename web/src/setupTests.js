import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

window.Config = {
    REACT_APP_AUTHORITY:"REACT_APP_AUTHORITY",
    REACT_APP_CLIENT_ID:"REACT_APP_CLIENT_ID",
    REACT_APP_INSIGHTS_KEY:"REACT_APP_INSIGHTS_KEY",
    REACT_APP_MIDDLETIER_URL: 'REACT_APP_MIDDLETIER_URL',
    REACT_APP_GATEWAY_URL: 'REACT_APP_GATEWAY_URL' 
};