import React from 'react';
import ReactDOM from 'react-dom';
import ProfileMenu from '../components/ProfileMenu';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileMenu Name={ 'Test' } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });