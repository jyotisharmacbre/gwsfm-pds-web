import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout'

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';



const App: React.FC = () => {
  const drawerWidth = 240;

  const theme = createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#ffffff',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#00684d',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      // error: will use the default color
    },
    typography: {
      // Use the system font.
      fontFamily:
        '-apple-system,system-ui,BlinkMacSystemFont,' +
        'Roboto,"Helvetica",sans-serif',
    },
    
  });

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
     // marginLeft: drawerWidth,
      //marginRight: drawerWidth,
     // width: `calc(100% - ${drawerWidth}px - ${drawerWidth}px)`,
     width: '100%',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
      color: '#00684d',
      fontSize: '1.8em'
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      backgroundColor: 'rgb(235, 238, 245)'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));
  return (
    <div>
      <Layout Theme={theme} UseStyles={useStyles()} />
      <p>
    <FormattedHTMLMessage id="app.text"
                      defaultMessage="Translations with values {what}!"
                      description="Welcome header on app main page"
                      values={{what: 'Pass values to Translations' }}/>
</p>
<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    <FormattedMessage id="app.learn-react-link"
                      defaultMessage="Learn React"
                      description="Link on react page"/>
</a>
    </div>
  );
}


export default App;
