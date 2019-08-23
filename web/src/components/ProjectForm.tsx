import React from 'react';
import { Paper, Typography, makeStyles, createStyles, Theme, Grid, TextField, Container, MenuItem, FormControl, FormLabel, Divider, withStyles } from '@material-ui/core';
import Switch, { } from '@material-ui/core/Switch';
import { PageBtnActions } from './BtnActions';
import { IBtnActionProps, IProjectFormProps } from '../props/AppProps';
import './ProjectForm.css';
import { connect } from 'react-redux';
import { IProjectForm } from '../session/ProjectForm/Type';
import { addFormActionCreator } from '../session/ProjectForm/Actions';
import { IApplicationState } from '../session/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Validator } from "class-validator";

// Validation methods
const validator = new Validator();

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        handleClick: (data: any) => { },
        addToForm: (data: IProjectForm) => dispatch(addFormActionCreator(data))
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
        form: state.projectFormState
    }
};

/* Dummy Data Set up */
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



const ProjectForm: React.FC<IProjectFormProps> = (props) => {

    const classes = useStyles();

    const Buttons: IBtnActionProps[] = [
        {
            Title: 'Back',
            Color: 'back',
            HandleClick: () => {
            }
        }
        , {
            Title: 'Create',
            Color: 'cbregreen',
            HandleClick: () => (e: React.FormEvent<Element>) => { handleSubmit(e) }
        }, {
            Title: 'Save',
            Color: 'save',
            HandleClick: () => {

            }
        }
    ];


    const handleCheckChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        var data = { ...props.form, [name]: event.target.checked };
        props.addToForm(data);
    };

    const handleValueChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        var data = { ...props.form, [name]: event.target.value };
        props.addToForm(data);
    };


    const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        let validEmail = isValidEmail(e.target.value);
        var data = { ...props.form, invalidProjectManager: validEmail };
        props.addToForm(data);
    }

    const validateField = (e: React.FocusEvent<HTMLInputElement>) => {
        let valid = isValid(e.target.value);
        let name = e.target.name;
        let data = { ...props.form, ['invalid' + name]: valid };
        props.addToForm(data);
    }

    const isValid = (value: string) => {
        return validator.isEmpty(value);
    }

    const isValidEmail = (value: string) => {
        return !validator.isEmail(value);
    }

    const validateForm = () => {
        var data = { ...props.form, invalidProjectManager: isValidEmail(props.form.projectmanager), invalidCompany: isValid(props.form.company), invalidCustomerContract: isValid(props.form.customer_contract), invalidLocale: isValid(props.form.locale), invalidProjectName: isValid(props.form.projectname), invalidProjectScope: isValid(props.form.projectscope) };
        props.addToForm(data);
    }

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();

        validateForm();

        if (!props.form.invalidLocale &&
            !props.form.invalidCompany &&
            !props.form.invalidCustomerContract &&
            !props.form.invalidProjectManager &&
            !props.form.invalidProjectName &&
            !props.form.invalidProjectScope) {
            alert('Form is Valid');
        }
    }


    return (
        <Paper className={classes.root}>
            <Container component="main" maxWidth="md">
                <form className={classes.form} noValidate onSubmit={handleSubmit}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>

                            <TextField
                                id="outlined-select-company"
                                select
                                label="Company"
                                onChange={handleValueChange('company')}
                                value={props.form.company}
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
                                onBlur={validateField}
                                error={props.form.invalidCompany}
                                helperText={props.form.invalidCompany ? 'This field is required' : ''}
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
                                onChange={handleValueChange('customer_contract')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                name="CustomerContract"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                                value={props.form.customer_contract}
                                onBlur={validateField}
                                error={props.form.invalidCustomerContract}
                                helperText={props.form.invalidCustomerContract ? 'This field is required' : ''}
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
                                name="ProjectName"
                                error={props.form.invalidProjectName}
                                helperText={props.form.invalidProjectName ? 'This field is required' : ''}
                                value={props.form.projectname}
                                onBlur={validateField}
                                onChange={handleValueChange('projectname')}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={props.form.projectscope}
                                name="ProjectScope"
                                label="Project Scope"
                                id="ProjectScope"
                                multiline
                                rows="4"
                                error={props.form.invalidProjectScope}
                                helperText={props.form.invalidProjectScope ? 'This field is required' : ''}
                                onChange={handleValueChange('projectscope')}
                                onBlur={validateField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={props.form.projectmanager}
                                name="projectmanager"
                                label="Project manager"
                                id="ProjectManager"
                                error={props.form.invalidProjectManager}
                                helperText={props.form.invalidProjectManager ? 'Enter a valid email' : ''}
                                onChange={handleValueChange('projectmanager')}
                                onBlur={validateEmail}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Project manager has experience in this type of projects?</FormLabel>
                                <br />
                                <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item>No</Grid>
                                        <Grid item>
                                            <AntSwitch
                                                checked={props.form.pmexperience}
                                                onChange={handleCheckChange('pmexperience')}
                                                value="pmexperience"
                                            />
                                        </Grid>
                                        <Grid item>Yes</Grid>
                                    </Grid>
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={props.form.projectmanager}
                                name="headofproject"
                                label="Head of Project"
                                id="ProjectManager"
                                error={props.form.invalidProjectManager}
                                helperText={props.form.invalidProjectManager ? 'Enter a valid email' : ''}
                                onChange={handleValueChange('projectmanager')}
                                onBlur={validateEmail}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="outlined-select-projectstatus"
                                select
                                label="Project Status"
                                onChange={handleValueChange('projectstatus')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                name="ProjectStatus"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                                value={props.form.customer_contract}
                                onBlur={validateField}
                                error={props.form.invalidCustomerContract}
                                helperText={props.form.invalidCustomerContract ? 'This field is required' : ''}
                            >
                                {cust_contracts.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.form.projectmanager}
                                name="cnnumber"
                                label="CN Number"
                                id="CNNumber"
                                onChange={handleValueChange('cnnumber')}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                value={props.form.projectmanager}
                                name="comments"
                                label="Comments"
                                id="Comments"
                                onChange={handleValueChange('comments')}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="outlined-select-typeofengagement"
                                select
                                label="Type of Engagement"
                                onChange={handleValueChange('typeofengagement')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                name="ProjectStatus"
                                variant="outlined"
                                fullWidth
                                autoFocus
                                value={props.form.customer_contract}
                            >
                                {cust_contracts.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-select-country"
                                select
                                label="Country"
                                name="Locale"
                                value={props.form.locale}
                                onChange={handleValueChange('country')}
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
                                error={props.form.invalidLocale}
                                helperText={props.form.invalidLocale ? 'This field is required' : ''}
                                onBlur={validateField}
                            >
                                {locales.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Currency"
                                name="Currency"
                                value={props.form.locale}
                                onChange={handleValueChange('currency')}
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
                                error={props.form.invalidLocale}
                                helperText={props.form.invalidLocale ? 'This field is required' : ''}
                                onBlur={validateField}
                            >
                                {locales.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.form.projectmanager}
                                name="projectowner"
                                label="Project Owner"
                                id="ProjectOwner"
                                onChange={handleValueChange('projectowner')}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.form.projectmanager}
                                type="number"
                                name="probofwinning"
                                label="Probability of winning, %"
                                id="ProbOfWinning"
                                required
                                onChange={handleValueChange('probofwinning')}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.form.projectmanager}
                                type="number"
                                name="approximatevalue"
                                label="Approximate value"
                                id="ApproximateValue"
                                required
                                onChange={handleValueChange('approximatevalue')}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-select-contracttype"
                                select
                                label="Contract Type"
                                name="ContractType"
                                value={props.form.locale}
                                onChange={handleValueChange('contracttype')}
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
                                error={props.form.invalidLocale}
                                helperText={props.form.invalidLocale ? 'This field is required' : ''}
                                onBlur={validateField}
                            >
                                {locales.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">CDM Notifiable</FormLabel>
                                <br />
                                <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item>No</Grid>
                                        <Grid item>
                                            <AntSwitch
                                                checked={props.form.pmexperience}
                                                onChange={handleCheckChange('cdmnotifiable')}
                                                value="cdmnotifiable"
                                            />
                                        </Grid>
                                        <Grid item>Yes</Grid>
                                    </Grid>
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-select-asworkedprimary"
                                select
                                label="Assets worked on (primary)"
                                name="AsWorkedPrimary"
                                value={props.form.locale}
                                onChange={handleValueChange('asworkedprimary')}
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
                                error={props.form.invalidLocale}
                                helperText={props.form.invalidLocale ? 'This field is required' : ''}
                                onBlur={validateField}
                            >
                                {locales.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-select-asworked2"
                                select
                                label="Assets worked on"
                                name="AsWorked2"
                                value={props.form.locale}
                                onChange={handleValueChange('asworked2')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"

                                fullWidth
                                autoFocus
                                error={props.form.invalidLocale}
                                helperText={props.form.invalidLocale ? 'This field is required' : ''}
                                onBlur={validateField}
                            >
                                {locales.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-select-asworked3"
                                select
                                label="Assets worked on"
                                name="AsWorked3"
                                value={props.form.locale}
                                onChange={handleValueChange('asworked3')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"

                                fullWidth
                                autoFocus
                                error={props.form.invalidLocale}
                                helperText={props.form.invalidLocale ? 'This field is required' : ''}
                                onBlur={validateField}
                            >
                                {locales.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.form.projectmanager}
                                name="soldmargin"
                                label="Sold Margin"
                                id="SoldMargin"

                                onChange={handleValueChange('soldmargin')}
                            />

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.form.projectmanager}
                                name="weighedTCV"
                                label="Weighed TCV"
                                id="WeighedTCV"

                                onChange={handleValueChange('weighedTCV')}
                            />

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={props.form.projectmanager}
                                name="rank"
                                label="Rank"
                                id="Rank"

                                onChange={handleValueChange('rank')}
                            />

                        </Grid>
                    </Grid>
                    <br />
                    <Divider />
                    <Grid justify="space-between" container spacing={3}>
                        <Grid item xs={12} sm={12} className='actions'>
                            <div className='leftalign'>
                                <PageBtnActions Actions={[Buttons[2]]} />

                            </div>
                            <div className='rightalign'>
                                <PageBtnActions Actions={[Buttons[0], Buttons[1]]} />

                            </div>
                        </Grid>
                    </Grid>

                </form>
            </Container>
        </Paper>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);