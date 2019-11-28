import { alphaNumeric, onlyNumber, Validate } from './fieldValidations';
import { Provider } from 'react-redux';
import { store } from '../store';
import { IntlProvider } from 'react-intl';
import translations from '../Translations/translation';
import App from '../App';
import { mount } from 'enzyme';
let wrapper: any;
const props: any = {
  intl: jest.fn()
};

describe('Validation', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <App {...props} />
         </IntlProvider> 
         </Provider>
    )
  })

  it('Required', () => {
    let result = Validate.required('Test');
    expect(result()).toBeDefined();
  });
});
