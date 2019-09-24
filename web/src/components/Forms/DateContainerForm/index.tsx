import React from 'react';
import { Grid, InputLabel, Container, makeStyles, createStyles, Theme } from '@material-ui/core';
import DateInput from '../../DateInput';
import './style.css';
import { IDateContainerProps } from './props';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        textField: {
            backgroundColor: 'white'
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1),
        },
        menu: {
            width: 200,
        },
        label: {
            position: 'relative',
            color: '#5b5b5b',
            fontWeight: 'bold'
        },
        select: {
            //marginTop: '0px'
        },
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);

const DateContainerForm: React.FC<IDateContainerProps> = (props) => {
    const classes = useStyles();
    return (<React.Fragment>
        <div className="date-container">

            <Grid container spacing={3} >
                <Grid item md={6}>
                <InputLabel shrink className={classes.label}>{props.dateOneLabel}</InputLabel>
                    <DateInput></DateInput>
                </Grid>
                <Grid item md={6}>
                <InputLabel shrink className={classes.label}>{props.dateTwoLabel}</InputLabel>
                    <DateInput></DateInput>
                </Grid>
                <Grid item md={12}>
                    {props.children}
                </Grid>
            </Grid>
        </div>
    </React.Fragment>);
}

export default DateContainerForm;