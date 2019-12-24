import React from 'react';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import {findByTestAtrr} from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import configureStore from 'redux-mock-store';
import CustomModalPopup,{confirmAlert} from '../CustomModalPopup';

describe('Custom modal popup testCases', () => {
 
  const mockStore = configureStore([]);
  let store;
  let wrapper;
  const props: any = {
    intl:{
        formatMessage: ({defaultMessage}) => defaultMessage
      },
    titleKey : "test",
    contentKey: "test",
    handleConfirm:jest.fn(),
    handleReject:jest.fn(),

  }; 
  beforeEach(() => {
    store = mockStore({});
    wrapper = mount(
      <Provider store={store}>
      <IntlProvider locale="en" messages={translations['en'].messages}>
      <CustomModalPopup {...props}/>
      </IntlProvider>
      </Provider>
    );
  });

  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  }); 
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render custom modal popup', () => {
       confirmAlert(props);
       let doc:any=(document.getElementById('react-confirm-alert'));
       expect(doc.innerHTML).not.toBeNull(); 
       expect(doc.childElementCount).toBe(1);
  });
  it('should remove custom modal popup on click of reject button', () => {
    confirmAlert(props);
    let container=findByTestAtrr(wrapper,"button_reject").first();
    container.simulate('click');
    let doc:any=(document.getElementById('react-confirm-alert'));
    expect(props.handleReject.mock.calls.length).toEqual(1);   
    expect(doc).toBeNull(); 
});
it('should remove custom modal popup on click of confirm button', () => {
    confirmAlert(props);
    let container=findByTestAtrr(wrapper,"button_confirm").first();
    container.simulate('click');
    let doc:any=(document.getElementById('react-confirm-alert'));
    expect(props.handleConfirm.mock.calls.length).toEqual(1);   
    expect(doc).toBeNull(); 
});
  });
