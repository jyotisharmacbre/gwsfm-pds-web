import React from 'react';
import LeftMenu from '../Menu/LeftMenu';
import { injectIntl } from 'react-intl';
import IReactIntl from '../../Translations/IReactIntl';

class Nav extends React.Component<IReactIntl> {
    render() {
        return <LeftMenu />;
    }
}

export default injectIntl(Nav);