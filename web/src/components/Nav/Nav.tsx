import React from 'react';
import { IAppProps, INaveState } from '../../props/AppProps';
import LeftMenu from '../Menu/LeftMenu';
import { injectIntl } from 'react-intl';
import IReactIntl from '../../Translations/IReactIntl';

class Nav extends React.Component<IAppProps & IReactIntl, INaveState> {
  render() {
    return <LeftMenu />;
  }
}

export default injectIntl(Nav);
