import { alphaNumeric, onlyNumber, Validate } from './fieldValidations';
import { Provider } from 'react-redux';
import { store } from '../store';
import { IntlProvider } from 'react-intl';
import translations from '../Translations/translation';
import App, { globalIntl } from '../App';
import { mount } from 'enzyme';
let wrapper: any;
const props: any = {
  handleSubmit: jest.fn()
};

describe('Validation', () => {
  jest.mock('../App');   
    globalIntl.formatMessage = jest.fn().mockImplementation(() => {
      return 'intlmessage';
    });
  it('Required', () => {
    let result = Validate.required('Test');
    expect(result()).toBeDefined();
  });
});
