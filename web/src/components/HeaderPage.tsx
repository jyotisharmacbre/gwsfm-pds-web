import React from 'react';
import { Grid } from '@material-ui/core';
import { MainTitle } from './Title';
import { PageBtnActions } from './BtnActions';
import { IHeaderPageProps } from '../props/AppProps';


class HeaderPage extends React.Component<IHeaderPageProps>
{

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

export default HeaderPage;