import React from 'react';
import { Paper, Divider, Typography } from '@material-ui/core';
import { ICardComponentProps } from '../props/AppProps';

const CardContainer: React.FC<ICardComponentProps> = (props) => {

    return (
        <Paper >
            <div style={{ borderLeft: '6px solid #00684d', position: 'relative', top: '20px', marginBottom:'40px',  marginTop:'40px' }}>
                <Typography component="h1" variant="h5" style={{ color: '#00684d', marginLeft:'20px', fontWeight:500 }} gutterBottom>
                    {props.Title}
                </Typography>
            </div>
            <Divider />
            {props.children}
        </Paper>);
}

export default CardContainer;
