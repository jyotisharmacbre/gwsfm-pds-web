import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

window.Config = {
    REACT_APP_AUTH_INSTANCE: 'https://cbreemeaext.b2clogin.com/',
    REACT_APP_AUTH_TENANT: 'cbreemeaext.onmicrosoft.com',
    REACT_APP_AUTH_SIGNINPOLICY: 'B2C_1_emeauat',
    REACT_APP_AUTH_APPID: '5d05c670-135d-460e-8f0b-21d30daaced1',
    REACT_APP_INSIGHTS_KEY: '',
    REACT_APP_API_BASE_URL: ' https://qat-pds-middletier.azurewebsites.net',
    REACT_APP_USER_SERVICE_URL: 'https://qat-foundation-gateway.azurewebsites.net'
};

