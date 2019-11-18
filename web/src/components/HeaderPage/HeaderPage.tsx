import React from 'react';
import { Grid } from '@material-ui/core';
import { MainTitle } from '../Title/Title';
import { PageBtnActions } from '../BtnActions/BtnActions';
import { IHeaderPageProps } from '../../props/AppProps';
import { injectIntl } from 'react-intl';
import IReactIntl from '../../Translations/IReactIntl';

class HeaderPage extends React.Component<IHeaderPageProps& IReactIntl> {
  render() {
    const { ActionList, Title } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <MainTitle>{Title}</MainTitle>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PageBtnActions Actions={ActionList || []} />
        </Grid>
      </Grid>
    );
  }
}

export default  injectIntl(HeaderPage);
