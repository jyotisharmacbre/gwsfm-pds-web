import React from 'react';
import { MainTitle } from '../Title/Title';
import { IHeaderPageProps } from '../../props/AppProps';
import { injectIntl } from 'react-intl';
import IReactIntl from '../../Translations/IReactIntl';

class HeaderPage extends React.Component<IHeaderPageProps& IReactIntl> {
  render() {
    const { Title } = this.props;
    return <MainTitle>{Title}</MainTitle>;
  }
}

export default  injectIntl(HeaderPage);
