import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Nav from '../Nav/Nav';
import Body from '../Body/Body';
import { IAppProps } from '../../props/AppProps';
import LeftMenu from '../Menu/LeftMenu';
import ProfileMenu from '../Menu/ProfileMenu/ProfileMenu';
import Translate from '../../Translations/translate';
import { getDisplayName } from '../../helpers/auth-helper';

class Layout extends React.Component<IAppProps> {
  helloAuthenticatedUser() {
    return 'Hello, ' + getDisplayName();
  }
  render() {
    const { Theme, UseStyles } = this.props;

    return (
      <div className="wrapper">
        {/* <LeftMenu /> */}
        <Nav Theme={Theme} UseStyles={UseStyles} />
        <div id="content">
          <ProfileMenu Name={this.helloAuthenticatedUser()} />
          <Body Theme={Theme} UseStyles={UseStyles} />
        </div>
      </div>
    );
  }
}

export default Layout;
