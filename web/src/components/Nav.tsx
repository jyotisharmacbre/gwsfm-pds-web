import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IAppProps } from '../props/AppProps';
import ProfileMenu from '../components/ProfileMenu';



class Nav extends React.Component<IAppProps>{
    constructor(props: IAppProps) {
        super(props);
    
    }

    render() {
        const { UseStyles } = this.props;
        return (
            <div >
                <AppBar position="absolute" className={UseStyles.appBar}>
                    <Toolbar className={UseStyles.toolbar}>

                        <Typography component="h1" variant="h6" color="inherit" noWrap className={UseStyles.title}>
                            <strong>CBRE</strong> PDS
                </Typography>
                        <ProfileMenu />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default Nav;