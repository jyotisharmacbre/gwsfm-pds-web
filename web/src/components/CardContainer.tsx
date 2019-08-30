import React from 'react';
import { Paper, Divider, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { ICardComponentProps } from '../props/AppProps';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
        },
        container:{
            padding: '8px 8px',
        }
    }),
);

const CardContainer: React.FC<ICardComponentProps> = (props) => {

    const classes = useStyles();
    return (
        <Paper>
            <div style={{ borderLeft: '6px solid #00684d', position: 'relative', top: '20px', marginBottom: '40px', marginTop: '40px' }}>
                <Typography component="h1" variant="h5" style={{ color: '#00684d', marginLeft: '20px', fontWeight: 500 }} gutterBottom>
                    {props.Title}
                </Typography>
            </div>
            <Divider />
            <div className={classes.container} >
                {props.children}
            </div>

        </Paper>);
}

export default CardContainer;
