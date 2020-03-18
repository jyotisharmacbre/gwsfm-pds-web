import React from 'react';
import './App.css';
import Layout from './components/Layouts/Layout';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectIntl } from 'react-intl';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import { baseAPI } from './client';
import preval from 'preval.macro';
import useConfigContext from './hooks/useConfigContext';

const App: React.FC = (props: any) => {
	const config = useConfigContext();
	//Loading progressbar
	loadProgressBar({ showSpinner: false }, baseAPI);
	return (
		<ErrorBoundary showPage={true}> 
			<div>
				<Layout />
				<ToastContainer autoClose={config.REACT_APP_TOASTER_TIME_OUT} className="custom_toast_block" transition={Bounce} />
				<p style={{ display: 'none' }}>
					Build Date: {preval`module.exports = new Date().toLocaleString();`}.
        		</p>
			</div>
		</ErrorBoundary>
	);
};

export default injectIntl(App);