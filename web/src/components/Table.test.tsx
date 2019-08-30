
import React from 'react';
import ReactDOM from 'react-dom';
import Table from './TestTable';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table IsSuperManager={ true } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });