import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { MainTitle } from './Title';
import PageActions from './BtnActions';
import { IHeaderPage } from '../props/AppProps';


class HeaderPage extends React.Component<IHeaderPage>
{
    constructor(props: IHeaderPage)
    {
     super(props);
     
    }

    render()
    {
        const { ActionList, Title} = this.props;
        return(
            <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <MainTitle>{Title}</MainTitle>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <PageActions Actions={ActionList || []} />
                        </Grid>
                    </Grid>
        );
    }
}

export default HeaderPage;