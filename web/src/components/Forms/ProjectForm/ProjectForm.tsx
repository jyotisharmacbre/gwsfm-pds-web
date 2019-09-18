import React, { useEffect } from 'react';
import { Paper, Typography, makeStyles, createStyles, Theme, Grid, Container, MenuItem, FormControl, Divider, withStyles, InputLabel } from '@material-ui/core';
import Switch, { } from '@material-ui/core/Switch';
import { PageBtnActions } from '../../BtnActions/BtnActions';
import TextField from '@material-ui/core/TextField';
import { IBtnActionProps, IProjectFormProps } from '../../../props/AppProps';
import './ProjectForm.css';
import { connect } from 'react-redux';
import { IProjectForm } from '../../../session/ProjectForm/Type';
import { addFormActionCreator } from '../../../session/ProjectForm/Actions';
import { IApplicationState } from '../../../session/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Validator } from "class-validator";
import { toCurrency } from '../../../helpers/int-helper';
import { getLocaleActionCreator, getCustomerContractActionCreator } from '../../../session/ListItems/Actions';


// Validation methods
const validator = new Validator();

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        handleClick: () => { },
        addToForm: (data: IProjectForm) => dispatch(addFormActionCreator(data)),
        getLocales: () => dispatch(getLocaleActionCreator()),
        getCustomerContracts: (name:string) => dispatch(getCustomerContractActionCreator(name))
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
        form: state.projectFormState,
        locales: state.listState.locales,
        customerContracts: state.listState.customerContract
    }
};



const typesOfEngagement = [
    {
        name: '---Please choose an option---', value: ''
    },
    {
        name: 'Fixed Price', value: 'Fixed Price'
    },
    {
        name: 'Time and Materials', value: 'Time and Materials'
    },
    {
        name: 'Risk and Reward', value: 'Risk and Reward'
    },
    {
        name: 'Cost Plus', value: 'Cost Plus'
    }
];

const contractType = [
    {
        name: '---Please choose an option---', value: ''
    },
    {
        name: 'CT 1', value: 'CT 1'
    },
    {
        name: 'CT 2', value: 'CT 2'
    },
];

const currency = [
    {
        name: '---Please choose an option---', value: ''
    },
    {
        name: 'AED (UAE Dirham)', value: 'AED'
    },
    {
        name: 'AFN (Afghani)', value: 'AFN'
    },
    {
        name: 'ALL (Lek)', value: 'ALL'
    },
    {
        name: 'AMD (Dram)', value: 'AMD'
    },
    {
        name: 'ANG (Dutch Antilles Guilder)', value: 'ANG'
    },
    {
        name: 'AOA (Kwanza)', value: 'AOA'
    },
    {
        name: 'ARS (Peso)', value: 'ARS'
    }

];

const projectStatus = [
    {
        name: '---Please choose an option---', value: ''
    },
    {
        name: 'Initial Customer Inquiry', value: 'Initial Customer Inquiry'
    },
    {
        name: 'J&A', value: 'J&A'
    },
    {
        name: 'Archived', value: 'Archived'
    },
    {
        name: 'Lost', value: 'Lost'
    }
    ,
    {
        name: 'Order Received', value: 'Order Received'
    },
    {
        name: 'CPP', value: 'CPP'
    },
    {
        name: 'Complete', value: 'Complete'
    }


];

const assetsWorkedOn = [
    {
        name: '---Please choose an option---', value: ''
    },
    {
        name: 'AS 1', value: 'AS 1'
    },
    {
        name: 'AS 2', value: 'AS 2'
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
        label: {
            position: 'relative',

            color: theme.palette.secondary.main,
            fontWeight: 'bold'
        },
        select: {
            //marginTop: '0px'
        }
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

    useEffect(() => {
        props.getLocales();
        props.getCustomerContracts('');
      }, []);

    const classes = useStyles();

    const Buttons: IBtnActionProps[] = [
        {
            Title: 'Back',
            Color: 'back',
            HandleClick: () => {
                window.location.href = '/';
            }
        }
        , {
            Title: 'Create',
            Color: 'cbregreen',
            isSubmit: true,
            HandleClick: () => (e: React.FormEvent<Element>) => { handleSubmit(e) }
        }, {
            Title: 'Save',
            Color: 'save',
            HandleClick: () => {
                alert('Saving clicked.')
            }
        }
    ];


    const handleCheckChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        var data = { ...props.form, [name]: event.target.checked }
        props.addToForm(data);
    };

    const handleValueChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = event.target.value;
        let data = { ...props.form, [name]: val };
        props.addToForm(data);
    };

    const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        let validEmail = isValidEmail(e.target.value);
        let name = e.target.name;
        var data = { ...props.form, ['invalid' + name]: validEmail };
        props.addToForm(data);
    }

    const validateField = (key?: string) => (e: React.FocusEvent<HTMLInputElement>) => {
        let valid = isValid(e.target.value);
        let name = e.target.name;
        let dataType = e.target.getAttribute('dataformat');
        let val = e.target.value;

        if (key != undefined) {
            if (dataType == 'currency') {
                val = toCurrency(val);
            }
            let data = { ...props.form, ['invalid' + name]: valid, [key]: val };
            props.addToForm(data);
        } else {
            let data = { ...props.form, ['invalid' + name]: valid };
            props.addToForm(data);
        }
    }

    const isValid = (value: string | number | undefined) => {
        return validator.isEmpty(value);
    }

    const isValidEmail = (value: string) => {
        return !validator.isEmail(value);
    }


    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        var data = {
            ...props.form,
            invalidCompany: isValid(props.form.company),
            invalidCustomerContract: isValid(props.form.customer_contract),
            invalidLocale: isValid(props.form.locale),
            invalidProjectManager: isValidEmail(props.form.projectmanager),
            invalidProjectName: isValid(props.form.projectname),
            invalidProjectScope: isValid(props.form.projectscope),
            invalidHeadOfProject: isValidEmail(props.form.headofproject),
            invalidCurrency: isValid(props.form.currency),
            invalidApproxValue: isValid(props.form.approximatevalue),
            invalidAssetsWorkedOnPrimary: isValid(props.form.assetworkedonprimary),
            invalidCMDNotifiable: isValid(props.form.cdmnotifiable.toString()),
            invalidProbOfWinning: isValid(props.form.probofwinning),
            invalidContractType: isValid(props.form.contracttype)
        };

        if (
            !data.invalidCompany &&
            !data.invalidCustomerContract &&
            !data.invalidProjectManager &&
            !data.invalidProjectName &&
            !data.invalidProjectScope &&
            !data.invalidPMExperience &&
            !data.invalidHeadOfProject &&
            !data.invalidLocale &&
            !data.invalidCurrency &&
            !data.invalidApproxValue &&
            !data.invalidAssetsWorkedOnPrimary &&
            !data.invalidCMDNotifiable &&
            !data.invalidProbOfWinning) {

            props.addToForm({ ...data, validForm: true });

            alert('Form is Valid');

        } else {
            props.addToForm({ ...data, validForm: false });
            props.addToForm(data);
        }
    }

    return (
        <Paper className={classes.root}>
            <Container component="main" maxWidth="md">
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Company*
                                </InputLabel>

                                <TextField
                                    id="outlined-select-company"
                                    onChange={handleValueChange('company')}
                                    value={props.form.company}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    onBlur={validateField}
                                    error={props.form.invalidCompany}
                                    helperText={props.form.invalidCompany ? 'This field is required' : ''}>

                                </TextField>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Customer & Contract*
                                </InputLabel>
                                <TextField
                                    id="outlined-select-custcontract"
                                    select
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
                                    {props.customerContracts.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Project Name*
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    margin="normal"
                                    id="project-name"
                                    name="ProjectName"
                                    error={props.form.invalidProjectName}
                                    helperText={props.form.invalidProjectName ? 'This field is required' : ''}
                                    value={props.form.projectname}
                                    onBlur={validateField}
                                    onChange={handleValueChange('projectname')}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Project Status*
                                </InputLabel>
                                <TextField
                                    id="outlined-select-projectstatus"
                                    select
                                    onChange={handleValueChange('projectstatus')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    className={classes.select}
                                    margin="normal"
                                    name="ProjectStatus"
                                    variant="outlined"
                                    fullWidth
                                    autoFocus
                                    value={props.form.projectstatus}
                                >
                                    {projectStatus.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Project Scope*
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    required
                                    margin="normal"
                                    fullWidth
                                    value={props.form.projectscope}
                                    name="ProjectScope"

                                    id="ProjectScope"
                                    multiline
                                    rows="4"
                                    error={props.form.invalidProjectScope}
                                    helperText={props.form.invalidProjectScope ? 'This field is required' : ''}
                                    onChange={handleValueChange('projectscope')}
                                    onBlur={validateField}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Project Manager*
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    required
                                    margin="normal"
                                    fullWidth
                                    value={props.form.projectmanager}
                                    name="ProjectManager"
                                    id="ProjectManager"
                                    error={props.form.invalidProjectManager}
                                    helperText={props.form.invalidProjectManager ? 'Enter a valid email' : ''}
                                    onChange={handleValueChange('projectmanager')}
                                    onBlur={validateEmail}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                            <InputLabel shrink className={classes.label}>Project manager has experience in this type of projects?</InputLabel>
                                <br />
                                <Typography component="div" >
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Head of Project*
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    required
                                    margin="normal"
                                    fullWidth
                                    value={props.form.headofproject}
                                    name="HeadOfProject"
                                    id="HeadOfProject"
                                    error={props.form.invalidHeadOfProject}
                                    helperText={props.form.invalidHeadOfProject ? 'Enter a valid email' : ''}
                                    onChange={handleValueChange('headofproject')}
                                    onBlur={validateEmail}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Project Owner
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={props.form.projectowner}
                                    name="ProjectOwner"
                                    margin="normal"
                                    id="ProjectOwner"
                                    onChange={handleValueChange('projectowner')}
                                    error={props.form.InvalidProjectOwner}
                                    helperText={props.form.InvalidProjectOwner ? 'Enter a valid email' : ''}
                                    onBlur={validateEmail}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    CN Number
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={props.form.cnnumber}
                                    name="cnnumber"
                                    id="CNNumber"
                                    onChange={handleValueChange('cnnumber')}
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Comments
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    margin="normal"
                                    rows="4"
                                    value={props.form.comments}
                                    name="comments"
                                    id="Comments"
                                    onChange={handleValueChange('comments')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Type of Engagement
                                </InputLabel>
                                <TextField
                                    id="outlined-select-typeofengagement"
                                    select
                                    onChange={handleValueChange('typeofengagement')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                    name="TypeOfEngagement"
                                    variant="outlined"
                                    fullWidth
                                    autoFocus
                                    value={props.form.typeofengagement}
                                >
                                    {typesOfEngagement.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Country*
                                </InputLabel>
                                <TextField
                                    id="outlined-select-country"
                                    select
                                    name="Locale"
                                    value={props.form.locale}
                                    onChange={handleValueChange('locale')}
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
                                    {props.locales.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Currency*
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    name="Currency"
                                    value={props.form.currency}
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
                                    error={props.form.invalidCurrency}
                                    helperText={props.form.invalidCurrency ? 'This field is required' : ''}
                                    onBlur={validateField}
                                >
                                    {currency.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Probability of winning, %*
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={props.form.probofwinning}
                                    type="number"
                                    name="ProbOfWinning"
                                    id="ProbOfWinning"
                                    required
                                    onChange={handleValueChange('probofwinning')}
                                    error={props.form.invalidProbOfWinning}
                                    helperText={props.form.invalidProbOfWinning ? 'This field is required' : ''}
                                    onBlur={validateField}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Approximate value*
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={props.form.approximatevalue}
                                    name="ApproxValue"
                                    id="ApproximateValue"
                                    inputProps={{ 'dataformat': 'currency' }}
                                    required
                                    onChange={handleValueChange('approximatevalue')}
                                    error={props.form.invalidApproxValue}
                                    helperText={props.form.invalidApproxValue ? 'This field is required' : ''}
                                    onBlur={validateField('approximatevalue')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Contract Type*
                                </InputLabel>
                                <TextField
                                    id="outlined-select-contracttype"
                                    select
                                    name="ContractType"
                                    value={props.form.contracttype}
                                    onChange={handleValueChange('contracttype')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    className={classes.select}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    error={props.form.invalidContractType}
                                    helperText={props.form.invalidContractType ? 'This field is required' : ''}
                                    onBlur={validateField}
                                >
                                    {contractType.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <InputLabel shrink className={classes.label}>
                                    CDM Notifiable *
                                </InputLabel>

                                <br />
                                <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item>No</Grid>
                                        <Grid item>
                                            <AntSwitch
                                                checked={props.form.cdmnotifiable}
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
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Assets worked on (primary)*
                                </InputLabel>
                                <TextField
                                    id="outlined-select-asworkedprimary"
                                    select
                                    name="AssetsWorkedOnPrimary"
                                    value={props.form.assetworkedonprimary}
                                    onChange={handleValueChange('assetworkedonprimary')}
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
                                    error={props.form.invalidAssetsWorkedOnPrimary}
                                    helperText={props.form.invalidAssetsWorkedOnPrimary ? 'This field is required' : ''}
                                    onBlur={validateField}
                                >
                                    {assetsWorkedOn.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Assets worked on
                                </InputLabel>
                                <TextField
                                    id="outlined-select-asworked2"
                                    select
                                    name="AsWorked2"
                                    value={props.form.assetworkedonsecond}
                                    onChange={handleValueChange('assetworkedonsecond')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    autoFocus
                                >
                                    {assetsWorkedOn.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Assets worked on
                                </InputLabel>
                                <TextField
                                    id="outlined-select-asworked3"
                                    select

                                    name="AsWorked3"
                                    value={props.form.assetworkedonthird}
                                    onChange={handleValueChange('assetworkedonthird')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    autoFocus
                                >
                                    {assetsWorkedOn.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Sold Margin
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={props.form.soldmargin}
                                    name="SoldMargin"
                                    margin="normal"
                                    id="SoldMargin"
                                    onChange={handleValueChange('soldmargin')}
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Weighed TCV
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={props.form.weightedtcv}
                                    name="Weightedtcv"
                                    id="WeighedTCV"
                                    onChange={handleValueChange('weightedtcv')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel shrink className={classes.label}>
                                    Rank
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={props.form.rank}
                                    name="rank"
                                    id="Rank"
                                    onChange={handleValueChange('rank')}
                                />
                            </FormControl>
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