import React from 'react';
import { Grid, TextField, InputLabel, FormControlLabel, IconButton, createStyles, makeStyles, Theme, FormGroup, Checkbox } from "@material-ui/core";
import { DateRange } from '@material-ui/icons';
import Table from '../components/Table';
import { ITableFilterProps } from '../props/AppProps';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
        },
        label: {
            position: 'relative',

            color: theme.palette.secondary.main,
            fontWeight: 'bold'
        },
        table: {
            minWidth: 650,
        },
        input: {
            backgroundColor: 'white'
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        tableWrapper: {
            overflowX: 'auto',
        },
    }),
);

const DateFilter: React.FC = () => {
    const classes = useStyles();
    return (<Grid container spacing={2} style={{ backgroundColor: 'rgb(235, 238, 245)', zIndex: 999, position: 'relative'  }}>
        <Grid item xs={12} sm={9}>
            <Grid container spacing={1}>
                <Grid item md={3} xs={2}>
                    <div style={{ padding: '15px', float: 'right', width: '100%' }}>
                        <span style={{ float: "left" }}>Select dates:</span>
                        <span style={{ float: "right" }}> from:</span>
                    </div>
                </Grid>
                <Grid item md={1} xs={3}>
                    <TextField
                        id="from-dd"
                        margin="normal"
                        variant="outlined"
                        label="DD"
                        type="number"
                        fullWidth
                        className={classes.input}
                        autoFocus>
                    </TextField>
                </Grid>
                <Grid item md={1} xs={3}>
                    <TextField
                        id="from-mm"
                        margin="normal"
                        variant="outlined"
                        label="MM"
                        type="number"
                        className={classes.input}
                        fullWidth
                        autoFocus>
                    </TextField>
                </Grid>
                <Grid item md={1} xs={3}>
                    <TextField
                        id="from-yy"
                        margin="normal"
                        variant="outlined"
                        label="YYYY"
                        type="number"
                        className={classes.input}
                        fullWidth
                        autoFocus>
                    </TextField>
                </Grid>
                <Grid item md={1} xs={1}>
                    <div style={{ width: '50%', padding: '15px' }}>
                        <IconButton color="inherit"  >
                            <DateRange  color="secondary"/>
                        </IconButton></div>
                </Grid>
                <Grid item md={1} xs={1}>
                    <div></div>
                    <div style={{ padding: '15px', float: 'right' }}>
                        to:
                    </div>
                </Grid>
                <Grid item md={1} xs={3}>
                    <TextField
                        id="to-dd"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        label="DD"
                        type="number"
                        className={classes.input}
                        autoFocus>
                    </TextField>
                </Grid>
                <Grid item md={1} xs={3}>
                    <TextField
                        id="to-mm"
                        margin="normal"
                        variant="outlined"
                        label="MM"
                        type="number"
                        className={classes.input}
                        fullWidth
                        autoFocus>
                    </TextField>
                </Grid>
                <Grid item md={1} xs={3}>
                    <TextField
                        id="to-yy"
                        margin="normal"
                        label="YYYY"
                        variant="outlined"
                        type="number"
                        className={classes.input}
                        fullWidth
                        autoFocus>
                    </TextField>
                </Grid>
                <Grid item md={1} xs={1}>
                    <div style={{ width: '50%', padding: '15px' }}>
                        <IconButton color="inherit"  >
                            <DateRange color="secondary" />
                        </IconButton></div>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
            <FormGroup  style={{padding: '15px', left: '20%', position: 'relative'}}>
                <InputLabel className={classes.label}>
                    Project Owner
                        </InputLabel>
                <FormControlLabel
                    control={
                        <Checkbox value="all" />
                    }
                    label="All"
                />
            </FormGroup>
        </Grid>

    </Grid>);
}

const TableDateFilter: React.FC<ITableFilterProps> = (props) => {

    return (
        <div >
            <DateFilter />
            <Table columns={props.columns} data={props.data} ActionList={props.ActionList} />
        </div >
    );
}

export default TableDateFilter;