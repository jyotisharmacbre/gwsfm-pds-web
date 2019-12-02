import { alphaNumeric, onlyNumber, Validate } from './fieldValidations';
import { Provider } from 'react-redux';
import { store } from '../store';
import { IntlProvider } from 'react-intl';
import translations from '../Translations/translation';
import * as connectedIntlProvider from './../Translations/connectedIntlProvider';
import { mount } from 'enzyme';
let wrapper: any;
const props: any = {
  handleSubmit: jest.fn()
};

describe('Validation', () => {
  const formatMessage = jest.mock('./../Translations/connectedIntlProvider');

  jest.spyOn(connectedIntlProvider, 'formatMessage').mockImplementationOnce(() => {
    return 'intlmessage';
  });
  xit('Required', () => {
    let result = Validate.required('Test');
    expect(result(0)).toBeDefined();
  });
});
