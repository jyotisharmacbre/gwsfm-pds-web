import React from 'react';
import './App.css';
import Layout from './components/Layouts/Layout';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectIntl } from 'react-intl';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import { baseAPI } from './client';

const App: React.FC = (props: any) => {
	//Loading progressbar
	loadProgressBar({ showSpinner: false }, baseAPI);
	return (
		<ErrorBoundary>
			<div>
				<Layout />
				<ToastContainer autoClose={5000} className="custom_toast_block" transition={Bounce} />
			</div>
		</ErrorBoundary>
	);
};

export default injectIntl(App);