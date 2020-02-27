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
import preval from 'preval.macro';

const App: React.FC = (props: any) => {
	//Loading progressbar
	loadProgressBar({ showSpinner: false }, baseAPI);

	const drawerWidth = 250;

	const theme = createMuiTheme({
		palette: {
			primary: {
				// light: will be calculated from palette.primary.main,
				main: '#00684d'
				// dark: will be calculated from palette.primary.main,
				// contrastText: will be calculated to contrast with palette.primary.main
			},
			secondary: {
				light: '#19775e',
				main: '#ffffff',

				// dark: will be calculated from palette.secondary.main,
				contrastText: '#ffcc00'
			}
			// error: will use the default color
		},
		typography: {
			// Use the system font.
			fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,' + 'Roboto,"Helvetica",sans-serif'
		}
	});

	const useStyles = makeStyles((theme: any) => ({
		root: {
			display: 'flex'
		},
		toolbar: {
			paddingRight: 24 // keep right padding when drawer closed
		},
		toolbarIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			})
		},
		appBarShift: {
			// marginLeft: drawerWidth,
			// marginRight: drawerWidth,
			//width: '100%',
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		menuButton: {
			marginRight: 36
		},
		menuButtonHidden: {
			display: 'none'
		},
		title: {
			flexGrow: 1,
			color: 'white',
			fontSize: '1.8em',
			width: '100%'
		},
		titleHidden: {
			display: 'none'
		},
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			}),
			backgroundColor: '#272728'
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9)
			}
		},
		appBarSpacer: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			height: '100vh',
			overflow: 'auto',
			backgroundColor: '#f4f6fb'
		},
		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4)
		},
		paper: {
			padding: theme.spacing(2),
			display: 'flex',
			overflow: 'auto',
			flexDirection: 'column'
		},
		fixedHeight: {
			height: 240
		}
	}));

	return (
		<ErrorBoundary>
			<div>
				<Layout Theme={theme} UseStyles={useStyles()} />
				<ToastContainer autoClose={5000} className="custom_toast_block" transition={Bounce} />
				<p style={{ display: 'hidden' }}>
					Build Date: {preval`module.exports = new Date().toLocaleString();`}.
        		</p>
			</div>
		</ErrorBoundary>
	);
};

export default injectIntl(App);
