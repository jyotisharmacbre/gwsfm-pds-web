import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IAppProps, INaveState } from '../../props/AppProps';
import ProfileMenu from '../Menu/ProfileMenu/ProfileMenu';
import { getDisplayName } from '../../helpers/auth-helper';
import { Drawer, IconButton } from '@material-ui/core';
import { ChevronLeft, MenuOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import LeftMenu from '../Menu/LeftMenu';
import './style.css';
import { Link } from 'react-router-dom';

class Nav extends React.Component<IAppProps, INaveState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      open: true
    };
  }

  handleClick() {
    window.location.href = '/';
  }

  helloAuthenticatedUser() {
    return 'Hello, ' + getDisplayName();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { UseStyles } = this.props;
    return (
      <div>
        <AppBar
          position="absolute"
          className={clsx(
            UseStyles.appBar,
            this.state.open && UseStyles.appBarShift
          )}
        >
          <Toolbar className={UseStyles.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(
                UseStyles.menuButton,
                this.state.open && UseStyles.menuButtonHidden
              )}
            >
              <MenuOutlined />
            </IconButton>
            <Link to="/">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={clsx(
                  UseStyles.title,
                  this.state.open && UseStyles.titleHidden
                )}
              >
                <strong>CBRE</strong> PDS
              </Typography>
            </Link>
            <div></div>
            <ProfileMenu Name={this.helloAuthenticatedUser()} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          className={clsx('drawer', !this.state.open && 'drawerhidden')}
          classes={{
            paper: clsx(
              UseStyles.drawerPaper,
              !this.state.open && UseStyles.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div
            className={clsx('logo-hover', UseStyles.toolbarIcon)}
            style={{
              backgroundColor: '#272728',
              paddingTop: 10,
              paddingBottom: 50,
              justifyContent: 'space-between'
            }}
          >
            <Link to="/">
              <Typography
                component="h1"
                variant="h6"
                noWrap
                className={UseStyles.title}
              >
                <strong>CBRE</strong> PDS
              </Typography>
            </Link>
            <IconButton color="secondary" onClick={this.handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <LeftMenu />
        </Drawer>
      </div>
    );
  }
}

export default injectIntl(Nav);
