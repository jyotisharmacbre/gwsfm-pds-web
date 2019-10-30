import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  makeStyles,
  createStyles,
  Theme,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem
} from '@material-ui/core';
import { PageBtnActions } from '../../BtnActions/BtnActions';
import { IBtnActionProps } from '../../../props/AppProps';
import SquareRadio from '../../Buttons/SquareRadio';
import { ISquareRadioProps } from '../../Buttons/SquareRadio/props';
import DateContainerForm from '../DateContainerForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    textField: {
      backgroundColor: 'white'
    },
    menu: {
      width: 200
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
      margin: theme.spacing(3)
    }
  })
);

const workTypes = [
  { name: 'Select', value: '' },
  { name: 'val 1', value: 'val1' }
];
const projectBudget = [
  { name: 'Select', value: '' },
  { name: 'Up to £3 million', value: '3million' }
];
const radio: ISquareRadioProps[] = [
  { value: 'true', label: 'Yes', id: 'cmdyes' },
  { value: 'false', label: 'No', id: 'cmdno' }
];
const radioProject: ISquareRadioProps[] = [
  { value: 'true', label: 'Yes', id: 'plyes' },
  { value: 'false', label: 'No', id: 'plno' }
];

const Buttons: IBtnActionProps[] = [
  {
    Title: 'Previous',
    Color: 'back',
    HandleClick: () => {
      window.location.href = '/';
    }
  },
  {
    Title: 'Next',
    Color: 'cbregreen',
    isSubmit: true,
    HandleClick: () => {
      window.location.href = '/';
    }
  }
];

const ProjectOverviewForm: React.FC = (props: any) => {
  const classes = useStyles();

  const handleValueChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = event.target.value;
    let data = { ...props.form, [name]: val };
    console.log(data);
  };

  return (
    <React.Fragment>
      <Grid spacing={3} container>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Main Contractor
            </InputLabel>

            <TextField
              id="main-contractor"
              inputProps={{
                className: classes.textField
              }}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Enquiry Received Form
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Potential Customer
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset" fullWidth>
            <InputLabel shrink className={classes.label}>
              Types of Enquiry
            </InputLabel>
            <RadioGroup aria-label="gender" name="gender2">
              <FormControlLabel
                value="written"
                control={<Radio color="primary" />}
                label="Written"
              />
              <FormControlLabel
                value="verbal"
                control={<Radio color="primary" />}
                label="Verbal"
              />
              <FormControlLabel
                value="enquiryspecificationorgs"
                control={<Radio color="primary" />}
                label="Full tender enquiry with specifications &amp; orgs"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Project Manager
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Credit Check Result
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset" fullWidth>
            <InputLabel shrink className={classes.label}>
              CMD Notifiable
            </InputLabel>
            <SquareRadio Radios={radio} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Form of Contract
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Retention
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Liquidated Damages
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Insurance
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Work Type
            </InputLabel>
            <TextField
              id="outlined-select-worktype"
              select
              className={classes.textField}
              onChange={handleValueChange('worktype')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              name="WorkType"
              variant="outlined"
              required
              fullWidth
              autoFocus
              // value={props.form.customer_contract}
              //error={props.form.invalidCustomerContract}
              //helperText={props.form.invalidCustomerContract ? 'This field is required' : ''}
            >
              {workTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Project Plan
            </InputLabel>
            <DateContainerForm
              dateOneLabel="Commence Date"
              dateTwoLabel="Completion Date"
            >
              <FormControl fullWidth>
                <InputLabel shrink className={classes.label}>
                  Project Milestone
                </InputLabel>

                <TextField
                  id="main-contractor"
                  multiline
                  rows={4}
                  className={classes.textField}
                  onChange={handleValueChange('maincontractor')}
                  value={''}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  error={false}
                ></TextField>
              </FormControl>
            </DateContainerForm>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Project Plan
            </InputLabel>
            <DateContainerForm
              dateOneLabel="First Valuation Date"
              dateTwoLabel="Final Account Date"
            >
              <FormControl fullWidth>
                <InputLabel shrink className={classes.label}>
                  Valuation Intervals
                </InputLabel>

                <TextField
                  id="main-contractor"
                  className={classes.textField}
                  onChange={handleValueChange('maincontractor')}
                  value={''}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  error={false}
                ></TextField>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel shrink className={classes.label}>
                  Payment Terms
                </InputLabel>

                <TextField
                  id="main-contractor"
                  className={classes.textField}
                  onChange={handleValueChange('maincontractor')}
                  value={''}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  error={false}
                ></TextField>
              </FormControl>
            </DateContainerForm>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Authorised By
            </InputLabel>

            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
            <br />
            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
            <br />
            <TextField
              id="main-contractor"
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Project Budget
            </InputLabel>
            <TextField
              id="outlined-select-worktype"
              select
              className={classes.textField}
              onChange={handleValueChange('worktype')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              name="WorkType"
              variant="outlined"
              required
              fullWidth
              autoFocus
              // value={props.form.customer_contract}
              //error={props.form.invalidCustomerContract}
              //helperText={props.form.invalidCustomerContract ? 'This field is required' : ''}
            >
              {projectBudget.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset" fullWidth>
            <InputLabel shrink className={classes.label}>
              Project Is Live
            </InputLabel>
            <SquareRadio Radios={radioProject} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel shrink className={classes.label}>
              Comments
            </InputLabel>

            <TextField
              id="main-contractor"
              multiline
              rows={4}
              className={classes.textField}
              onChange={handleValueChange('maincontractor')}
              value={''}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              autoFocus
              error={false}
            ></TextField>
          </FormControl>
        </Grid>

        <Grid justify="space-between" container spacing={3}>
          <Grid item xs={12} sm={12} className="actions">
            <div className="leftalign">
              <PageBtnActions Actions={[Buttons[0]]} />
            </div>
            <div className="rightalign">
              <PageBtnActions Actions={[Buttons[1]]} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProjectOverviewForm;
