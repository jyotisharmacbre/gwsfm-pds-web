import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './components/Layout'
import { create } from "react-test-renderer";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
