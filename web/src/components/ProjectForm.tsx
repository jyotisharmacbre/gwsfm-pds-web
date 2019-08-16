import React from 'react';
import { Paper, Typography, makeStyles, createStyles, Theme, Grid, TextField, Button, Checkbox, FormControlLabel, Link, Container, MenuItem, FormControl, FormGroup, Switch, FormLabel, FormHelperText, Divider } from '@material-ui/core';
import { PageBtnActions } from './BtnActions';
import { IBtnActionProps } from '../props/AppProps';
import './ProjectForm.css';

const companies = [
    {
        name: 'CBRE Managed Services', value: 'CBRE Managed Services'
    },
    {
        name: 'HSBC UK Limited', value: 'HSBC UK Limited'
    }
];

const cust_contracts = [
    {
        name: 'RS Electrical', value: 'RS Electrical'
    },
    {
        name: 'Demostics', value: 'Demostics'
    }
];

const locales = [
    {
        name: 'English', value: 'English'
    },
    {
        name: 'English (US)', value: 'English (US)'
    }
];

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
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1),
        },
        menu: {
            width: 200,
        },
    }),
);


interface State {
    company: string;
    customer_contract: string,
    pmexperience: boolean,
    locale: string
}


const ProjectForm: React.FC = () => {

    const classes = useStyles();

    const [values, setValues] = React.useState<State>({
        company: 'CBRE Managed Services',
        customer_contract: 'RS Electrical',
        pmexperience: true,
        locale: 'English'
    });



    const handleChangeCompany = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.checked });
    };

    const handleChangeCustomerContract = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.checked });
    };

    const handleChangeLocale = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.checked });
    };

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.checked });
    };

    function GetButtons() {
        const action1: IBtnActionProps = {
            Title: 'Back',
            Color: 'back',
            HandleClick: () => {

            }
        };
        const action2: IBtnActionProps = {
            Title: 'Create',
            Color: 'cbregreen',
            HandleClick: () => {

            }
        };
        return ([
            action1, action2]
        );
    }

    function GetButtonsSave() {
        const action1: IBtnActionProps = {
            Title: 'Save',
            Color: 'save',
            HandleClick: () => {

            }
        };
        return ([
            action1]
        );
    }

    return (

        <Paper className={classes.root}>
            <Container component="main" maxWidth="md">
                <form className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="outlined-select-company"
                                select
                                label="Company"
                                value={values.company}
                                onChange={handleChangeCompany('company')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                            >
                                {companies.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="outlined-select-custcontract"
                                select
                                label="Customer & Contract"
                                value={values.customer_contract}
                                onChange={handleChangeCustomerContract('customer_contract')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                            >
                                {cust_contracts.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="project-name"
                                label="Project Name"
                                name="projectname"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="projectscope"
                                label="Project Scope"
                                id="projectscope"
                                multiline
                                rows="4"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="projectmanager"
                                label="Project manager"
                                id="projectmanager"
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                {/* <FormLabel component="legend">Project manager has experience in this type of projects</FormLabel> */}
                                <FormGroup>
                                    <FormControlLabel labelPlacement="start"
                                        control={<Switch checked={values.pmexperience} onChange={handleChange('pmexperience')} />}
                                        label="Project manager has experience in this type of projects"
                                    />

                                </FormGroup>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-locale"
                                select
                                label="Locale"
                                value={values.locale}
                                onChange={handleChangeLocale('locale')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                            >
                                {locales.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid justify="space-between" container spacing={3}>
                        <Grid item xs={12} sm={12} className='actions'>
                            <div className='leftalign'>
                                <PageBtnActions Actions={GetButtonsSave()} />
                            </div><div className='rightalign'>
                                <PageBtnActions Actions={GetButtons()} />

                            </div>



                        </Grid>
                    </Grid>

                </form>
            </Container>
        </Paper>

    );
}

export default ProjectForm;