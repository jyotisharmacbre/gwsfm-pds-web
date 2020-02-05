import React from 'react';
import Nav from '../Nav/Nav';
import Body from '../Body/Body';
import { IAppProps } from '../../props/AppProps';
import ProfileMenu from '../Menu/ProfileMenu/ProfileMenu';
import { getDisplayName } from '../../helpers/auth-helper';
import { useHistory } from 'react-router-dom';


const Layout: React.FC<IAppProps> = (props: any) => {
  let history = useHistory();
  const { Theme, UseStyles } = props;

  const showNav = () => {
    return history.location.pathname != '/' &&
      history.location.pathname != '/Pipeline' &&
      history.location.pathname != '/Error'
  }

  const addClassW100 = () => {
    return history.location.pathname == '/' ||
      history.location.pathname == '/Pipeline' ||
      history.location.pathname == '/Error'
  }



  return (
    <div className="wrapper">
      {showNav() ?
        <Nav Theme={Theme} UseStyles={UseStyles} /> :
        null}
      <div id="content" className={addClassW100()
        ? "w-100" : ""}>
        <ProfileMenu />
        <Body Theme={Theme} UseStyles={UseStyles} />
      </div>
    </div>
  );
}

export default Layout;
