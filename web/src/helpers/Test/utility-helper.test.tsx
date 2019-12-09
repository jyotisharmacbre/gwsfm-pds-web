import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectForm from '../ProjectForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import { IProjectDetailState } from '../../../../store/CustomerEnquiryForm/Types/IProjectDetailState';
import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import projectDetailReducer from '../../../../store/CustomerEnquiryForm/Reducer';
import { ActionType } from '../../../../store/CustomerEnquiryForm/Types/ActionType';
import nock from 'nock';
import { baseURL } from '../../../../client/client';
import { initialState, getprojectDetailData } from '../ProjectTestData';
import {calculateSell} from '../../helpers/utility-helper';

describe('utility helper test cases', () => {
  let wrapper: any;
  const props: any = {
    handleSubmit: jest.fn()
  };
  
  describe('discount calculation test cases', () => {
  it('sell calculaton', () => {
    let result = +calculateSell(100,20);
    expect(result).toBe(125);
  });

});
});
