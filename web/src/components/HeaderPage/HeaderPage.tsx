import React from 'react';
import { MainTitle } from '../Title/Title';
import { IHeaderPageProps } from '../../props/AppProps';

class HeaderPage extends React.Component<IHeaderPageProps> {
  render() {
    const { Title } = this.props;
    return <MainTitle>{Title}</MainTitle>;
  }
}

export default HeaderPage;
