import React from 'react';
import Container from '@material-ui/core/Container';
import { IAppProps } from '../../props/AppProps';
import Footer from '../Footer/Footer';
import Routes from '../Routes';

class Body extends React.Component<IAppProps> {
  render() {
    const { UseStyles } = this.props;

    return (
      <main className={UseStyles.content}>
        <div className={UseStyles.appBarSpacer} />
        <Container maxWidth="lg" className={UseStyles.container}>
          <Routes></Routes>
        </Container>
        <Footer />
      </main>
    );
  }
}

export default Body;
