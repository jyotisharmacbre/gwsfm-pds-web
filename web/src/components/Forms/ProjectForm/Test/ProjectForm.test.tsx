import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectForm from '../ProjectForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
describe('ProjectForm Fields', () => {
  let wrapper: any;
  const props: any = {
    handleSubmit: jest.fn()
  };
  beforeEach(() => {
    const formatMessage = jest.mock('./../../../../Translations/connectedIntlProvider');

    jest.spyOn(connectedIntlProvider, 'formatMessage').mockImplementationOnce(() => {
      return 'intlmessage';
    });

    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <ProjectForm {...props} />
        </IntlProvider>
      </Provider>
    );
  });
  it('Defines the component', () => {

    expect(wrapper).toBeDefined();
  });

  describe('Defines the Form', () => {
    let form: ShallowWrapper;
    beforeEach(() => {
      form = wrapper.find('[form="ProjectForm"]').first();
    });
    it('Renders form component', () => {

      expect(form).toHaveLength(1);
    });
  });
});
