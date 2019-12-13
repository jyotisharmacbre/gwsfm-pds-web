import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Nav from '../Nav/Nav';
import Body from '../Body/Body';
import { IAppProps } from '../../props/AppProps';
import LeftMenu from '../Menu/LeftMenu';
import ProfileMenu from '../Menu/ProfileMenu/ProfileMenu';
import Translate from '../../Translations/translate';
import { getDisplayName } from '../../helpers/auth-helper';
import { useHistory } from 'react-router-dom';


const Layout :React.FC<IAppProps> = (props:any) => {
  let history = useHistory();
  const { Theme, UseStyles } = props;

  const getAuthenticatedUserName = () => {
    return getDisplayName();
  }
  return (
    <div className="wrapper">
      {history.location.pathname != '/' ?
      <Nav Theme={Theme} UseStyles={UseStyles} />:
      null}
      <div id="content">
        <ProfileMenu Name={getAuthenticatedUserName()} />
        <Body Theme={Theme} UseStyles={UseStyles} />
      </div>
    </div>
  );
}

export default Layout;
