import React from 'react';
import { Paper, Typography, makeStyles, createStyles, Theme, Grid, TextField, Container, MenuItem, FormControl, FormLabel, Divider, withStyles } from '@material-ui/core';
import Switch, { } from '@material-ui/core/Switch';
// import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PageBtnActions } from './BtnActions';
import { IBtnActionProps, IProjectFormProps } from '../props/AppProps';
//import { CheckBox } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();

    //validateForm();

    // if (!props.form.invalidLocale && 
    //     !props.form.invalidCompany && 
    //     !props.form.invalidCustomerContract && 
    //     !props.form.invalidProjectManager && 
    //     !props.form.invalidProjectName && 
    //     !props.form.invalidProjectScope) {
    //     alert('Form is Valid');
    // }
}

const Buttons: IBtnActionProps[] = [
    {
        Title: 'Clear all',
        Color: 'back',
        HandleClick: () => {
        }
    }
    , {
        Title: 'Apply',
        Color: 'cbregreen',
        HandleClick: () => (e: React.FormEvent<Element>) => { handleSubmit(e) }
    }
];

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

export default function FilterExpansionPanel() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ marginTop: "24px" }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Filters</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography> */}
                    <Container component="main" maxWidth="md">
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="projectname"
                                                label="Project Name"
                                                name="ProjectName"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="date"
                                                label="DD"
                                                name="Date"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="month"
                                                label="MM"
                                                name="Month"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="year"
                                                label="YYYY"
                                                name="Year"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="from"
                                                label="From"
                                                name="From"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="to"
                                                label="To"
                                                name="To"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="expectedfrom"
                                                label="From"
                                                name="ExpectedFrom"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="expectedto"
                                                label="To"
                                                name="ExpectedTo"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid item xs={12} sm={4}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="owner"
                                                label="Owner"
                                                name="Owner"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="client"
                                                label="Client/Customer"
                                                name="Client"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                select
                                                fullWidth
                                                id="status"
                                                label="Status"
                                                name="Status"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="approxfrom"
                                                label="From"
                                                name="ApproxFrom"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="approxto"
                                                label="To"
                                                name="ApproxTo"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>

                                            <Checkbox
                                                id="chkJCT"
                                                value="checkedJCT"
                                                onChange={handleSubmit}
                                                // checked={state.checkedJCT}
                                                // onChange={handleChange('checkedJCT')}
                                            />
                                            <label>JCT</label>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Checkbox
                                                id="chkExternal"
                                                value="checkedExternal"
                                                onChange={handleSubmit}
                                            />
                                            <label>External</label>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="yes"
                                                label="Yes"
                                                name="Yes"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="no"
                                                label="No"
                                                name="No"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                select
                                                margin="normal"
                                                fullWidth
                                                id="soldmargin"
                                                label="Sold Margin"
                                                name="SoldMargin"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="weightedfrom"
                                                label="From"
                                                name="WeightedApproxFrom"
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="weightedto"
                                                label="To"
                                                name="WeightedTo"
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid justify="space-between" container spacing={3}>
                                <Grid item xs={12} sm={12} className='actions'>
                                    <div className='leftalign'>
                                        <PageBtnActions Actions={[Buttons[1]]} />

                                    </div>
                                    <div className='rightalign'>
                                        <PageBtnActions Actions={[Buttons[0]]} />

                                    </div>
                                </Grid>
                            </Grid>

                        </form>
                    </Container>
                    {/* <div>
              <PageBtnActions Actions={[Buttons[0], Buttons[1]]} />
          </div> */}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}