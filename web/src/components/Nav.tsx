import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IAppProps } from '../props/AppProps';
import ProfileMenu from '../components/ProfileMenu';
import { getDisplayName } from '../helpers/auth-helper';



class Nav extends React.Component<IAppProps>{

    handleClick(){
        window.location.href='/';
    }

    helloAuthenticatedUser(){
        return "Hello, " + getDisplayName();
    }

    render() {
        const { UseStyles } = this.props;
        return (
            <div >
                <AppBar position="absolute" className={UseStyles.appBar}>
                    <Toolbar className={UseStyles.toolbar}>

                        <Typography component="h1" variant="h6" color="inherit" noWrap className={UseStyles.title} onClick={this.handleClick}>
                        <strong>CBRE</strong> PDS
                </Typography>
                        <ProfileMenu Name={this.helloAuthenticatedUser()}/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default Nav;