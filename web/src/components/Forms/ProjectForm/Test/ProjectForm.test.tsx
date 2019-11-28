import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectForm from '../ProjectForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import App from '../../../../App';
describe('ProjectOverviewForm Fields', () => {
  let wrapper: any;
  const props: any = {
    handleSubmit: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <App {...props}>
          <ProjectForm {...props} />
          </App>
        </IntlProvider>
      </Provider>
    );
  });
  xit('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Defines the Form', () => {
    let form: ShallowWrapper;
    beforeEach(() => {
      form = wrapper.find('[form="ProjectForm"]').first();
    });
    xit('Renders form component', () => {
      expect(form).toHaveLength(1);
    });
  });
});
