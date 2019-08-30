import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsTable from '../components/ProjectsTable';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProjectsTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });