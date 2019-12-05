import React from 'react';
import { mount, ShallowWrapper, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import SubContractorActivityForm from '../SubContractorActivityForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';

describe('Sub Contractor - Activity Form', () => {
  let wrapper: any;
  const props: any = {
    fields: [],
    mockHandleDelete: jest.fn()
  };
  beforeEach(() => {
    const formatMessage = jest.mock(
      './../../../../Translations/connectedIntlProvider'
    );

    jest
      .spyOn(connectedIntlProvider, 'formatMessage')
      .mockImplementationOnce(() => {
        return 'intlmessage';
      });

    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <SubContractorActivityForm {...props} />
        </IntlProvider>
      </Provider>
    );
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('should call mock function when delete button is clicked', () => {
    const tree = shallow(
      <button className="delete_text" onClick={props.mockHandleDelete} />
    );
    tree.simulate('click');
    expect(props.mockHandleDelete).toHaveBeenCalled();
  });
});
