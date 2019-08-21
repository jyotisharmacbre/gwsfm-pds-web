import React from 'react';
import { Paper, Typography, makeStyles, createStyles, Theme, Grid, TextField, Container, MenuItem, FormControl, FormLabel, Divider, withStyles } from '@material-ui/core';
import Switch, { } from '@material-ui/core/Switch';
import { PageBtnActions } from './BtnActions';
import { IBtnActionProps, IProjectFormProps, IProjectFormState } from '../props/AppProps';
import './ProjectForm.css';
import { connect } from 'react-redux';
import { IProjectForm } from '../session/ProjectForm/Type';
import { addFormActionCreator } from '../session/ProjectForm/Actions';
import { IApplicationState } from '../session/reducers/RootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {Validator} from "class-validator";

// Validation methods
const validator = new Validator();


const mapDispatchToProps = (dispatch: ThunkDispatch<any,any, AnyAction>) => {
    return {
        handleClick: (data: any) => {},
        addToForm: (data: IProjectForm) => dispatch(addFormActionCreator(data))
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
      form: state.projectFormState,
      isProjectNameValid: state.projectFormState.isProjectManagerValid,
      isCompanyValid: state.projectFormState.isCompanyValid,
      isProjectManagerValid: state.projectFormState.isProjectManagerValid,
      isProjectScopeValid:state.projectFormState.isProjectScopeValid,
      isLocaleValid: state.projectFormState.isLocaleValid,
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
        var data = { ...props.form, [name] : event.target.checked};
        props.addToForm(data);
    };

    const handleValueChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        var data = { ...props.form, [name] : event.target.value};
        props.addToForm(data);
    };

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
    
        //console.log(props.);
        //props.handleClick(values);
    }


    const validation = (e: React.FocusEvent<HTMLInputElement>) =>
    {
         console.log(e.target.value);
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
                                error={!props.isCompanyValid}
                                helperText={!props.isCompanyValid ?'This field is required': ''}
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
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                                value={props.form.customer_contract}
                                error={true}
                                helperText={!props.isProjectScopeValid ?'This field is required': ''}
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
                                error={!props.isProjectNameValid}
                                helperText={!props.isProjectNameValid ?'This field is required': ''}
                                value={props.form.projectname}
                                onBlur={validation}
                                onChange={handleValueChange('projectname')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={props.form.projectscope}
                                name="projectscope"
                                label="Project Scope"
                                id="projectscope"
                                multiline
                                rows="4"
                                error={!props.isProjectScopeValid}
                                helperText={!props.isProjectScopeValid ?'This field is required': ''}
                                onChange={handleValueChange('projectscope')}
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
                                id="projectmanager"
                                error={!props.isProjectManagerValid}
                                helperText={!props.isProjectManagerValid ?'Enter a valid email': ''}
                                onChange={handleValueChange('projectmanager')}
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
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-locale"
                                select
                                label="Locale"
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
                                error={!props.isLocaleValid}
                                helperText={!props.isLocaleValid ?'This field is required': ''}
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