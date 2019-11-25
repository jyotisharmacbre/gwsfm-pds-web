import React from 'react';
import ReactDOM from 'react-dom';
import ProfileMenu from './ProfileMenu';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={mockStore()}>
      <ProfileMenu Name={'Test'} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});