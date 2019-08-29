import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Input, FormHelperText, FormControlLabel, IconButton, createStyles, makeStyles, Theme, Switch, withStyles, Typography, FormGroup } from "@material-ui/core";
import { DateRange } from '@material-ui/icons';


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
    }),
);

const AntSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            color: theme.palette.secondary.main,
            '& + $track': {
                opacity: 0.5,
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);


const TableDateFilter: React.FC = () => {

    const classes = useStyles();

    return (
        <div >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                    <Grid container spacing={1}>
                        <Grid item md={3} xs={2}>
                            <div>
                                Select dates:
                            </div>
                            <div style={{ padding: '15px', float: 'right' }}>
                                from:
                            </div>
                        </Grid>
                        <Grid item md={1} xs={2}>
                            <TextField
                                id="from-dd"
                                margin="normal"
                                variant="outlined"
                                label="DD"
                                type="number"
                                fullWidth
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid item md={1} xs={2}>
                            <TextField
                                id="from-mm"
                                margin="normal"
                                variant="outlined"
                                label="MM"
                                type="number"
                                fullWidth
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid item md={1} xs={2}>
                            <TextField
                                id="from-yy"
                                margin="normal"
                                variant="outlined"
                                label="YYYY"
                                type="number"
                                fullWidth
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <div style={{ width: '50%', padding: '15px' }}>
                                <IconButton color="inherit"  >
                                    <DateRange />
                                </IconButton></div>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <div></div>
                            <div style={{ padding: '15px', float: 'right' }}>
                                to:
                            </div>
                        </Grid>
                        <Grid item md={1} xs={2}>
                            <TextField
                                id="to-dd"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                label="DD"
                                type="number"
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid item md={1} xs={2}>
                            <TextField
                                id="to-mm"
                                margin="normal"
                                variant="outlined"
                                label="MM"
                                type="number"
                                fullWidth
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid item md={1} xs={2}>
                            <TextField
                                id="to-yy"
                                margin="normal"
                                label="YYYY"
                                variant="outlined"
                                type="number"
                                fullWidth
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <div style={{ width: '50%', padding: '15px' }}>
                                <IconButton color="inherit"  >
                                    <DateRange />
                                </IconButton></div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormGroup >
                        <InputLabel className={classes.label}>
                            Project Owner
                                </InputLabel>
                        <FormControlLabel
                            control={<Switch value="gilad" />}
                            label="All"
                        />
                    </FormGroup>
                </Grid>
                {/* <Grid item xs={12} sm={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={3} sm={2} md={1} style={{}}>
                        <div style={{ margin: 'auto', width: '50%', padding: '20px' }}>
                                    Select dates:</div>
                        </Grid>
                        <Grid container item xs={3} sm={2} md={2}>
                            <Grid item md={6} xs={6} >
                                <div style={{ margin: 'auto', width: '50%', padding: '20px' }}>
                                    from:</div>
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <TextField
                                    id="from-dd"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} sm={2} md={1}>
                            <TextField
                                id="from-mm"
                                margin="normal"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid container item xs={3} sm={2} md={2}>
                            <Grid item md={6}>
                                <TextField
                                    id="from-dd"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus>
                                </TextField>
                            </Grid>
                            <Grid item md={6}>
                                <div style={{ width: '50%', padding: '15px' }}>
                                    <IconButton color="inherit"  >
                                        <DateRange />
                                    </IconButton></div>
                            </Grid>
                        </Grid>
                        <Grid container item xs={3} sm={2} md={2}>
                            <Grid item md={6}>
                                <div style={{ margin: 'auto', width: '50%', padding: '20px' }}>
                                    to:</div>
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    id="from-dd"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} sm={2} md={1}>
                            <TextField
                                id="from-mm"
                                margin="normal"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus>
                            </TextField>
                        </Grid>
                        <Grid container item xs={3} sm={2} md={2}>
                            <Grid item md={6}>
                                <TextField
                                    id="from-dd"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus>
                                </TextField>
                            </Grid>
                            <Grid item md={6}>
                                <div style={{ width: '50%', padding: '15px' }}>
                                    <IconButton color="inherit"  >
                                        <DateRange />
                                    </IconButton></div>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} sm={2} md={1}>
                            Select Date
                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </div >
    );
}

export default TableDateFilter;