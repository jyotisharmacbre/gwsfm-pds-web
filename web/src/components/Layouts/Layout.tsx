import React from 'react';
import Nav from '../Nav/Nav';
import Body from '../Body/Body';
import { IAppProps } from '../../props/AppProps';
import ProfileMenu from '../Menu/ProfileMenu/ProfileMenu';
import { getDisplayName } from '../../helpers/auth-helper';
import { useHistory } from 'react-router-dom';


const Layout :React.FC<IAppProps> = (props:any) => {
  let history = useHistory();
  const { Theme, UseStyles } = props;
  
  const helloAuthenticatedUser = () => {
    return 'Hello, ' + getDisplayName();
  }
  return (
    <div className="wrapper">
      {(history.location.pathname != '/' && history.location.pathname!='/Pipeline')?
      <Nav Theme={Theme} UseStyles={UseStyles} />:
      null}
      <div id="content" className={history.location.pathname == '/'?"w-100":""}>
        <ProfileMenu Name={helloAuthenticatedUser()} />
        <Body Theme={Theme} UseStyles={UseStyles} />
      </div>
    </div>
  );
}

export default Layout;
