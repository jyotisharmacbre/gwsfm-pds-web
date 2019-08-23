import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Nav from '../components/Nav';
import Body from '../components/Body';
import { IAppProps } from '../props/AppProps';



class Layout extends React.Component<IAppProps> {

    render() {
        const { Theme, UseStyles } = this.props;

        return (
            <MuiThemeProvider theme={Theme}>
                <div className={UseStyles.root}>
                    <CssBaseline />
                    <Nav Theme={Theme} UseStyles={UseStyles} />   
                    <Body Theme={Theme} UseStyles={UseStyles} />
                  
                </div>
            </MuiThemeProvider>
        );
    }

}

export default Layout;