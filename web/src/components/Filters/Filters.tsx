import React from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  TextField,
  Container,
  MenuItem,
  Divider,
  InputLabel,
  Link
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { PageBtnActions } from '../BtnActions/BtnActions';
import { IBtnActionProps, IFilterProps } from '../../props/AppProps';
//import { CheckBox } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import { IFilter } from '../../session/Filters/Type';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IApplicationState } from '../../session/rootReducer';
import { connect } from 'react-redux';
import { addFilterActionCreator } from '../../session/Filters/Actions';
import {
  getLocaleActionCreator,
  getCustomerContractActionCreator
} from '../../session/ListItems/Actions';

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    handleClick: () => {},
    addToFilter: (data: IFilter) => dispatch(addFilterActionCreator(data)),
    getLocales: () => dispatch(getLocaleActionCreator()),
    getCustomerContracts: (name: string) =>
      dispatch(getCustomerContractActionCreator(name))
  };
};

const mapStateToProps = (state: IApplicationState) => {
  return {
    form: state.filtersState,
    locales: state.listState.locales,
    customerContracts: state.listState.customerContract
  };
};

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
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
    },
    menu: {
      width: 200
    },
    label: {
      position: 'relative',

      color: theme.palette.secondary.main,
      fontWeight: 'bold'
    },
    select: {
      //marginTop: '0px'
    }
  })
);

const status = [
  {
    name: '---Please choose an option---',
    value: ''
  },
  {
    name: 'Initial Customer Inquiry',
    value: 'Initial Customer Inquiry'
  },
  {
    name: 'J&A',
    value: 'J&A'
  },
  {
    name: 'Archived',
    value: 'Archived'
  },
  {
    name: 'Lost',
    value: 'Lost'
  },
  {
    name: 'Order Received',
    value: 'Order Received'
  },
  {
    name: 'CPP',
    value: 'CPP'
  },
  {
    name: 'Complete',
    value: 'Complete'
  }
];

const soldMargin = [
  {
    name: '---Please choose an option---',
    value: ''
  },
  {
    name: '6%',
    value: '6%'
  },
  {
    name: '10%',
    value: '10%'
  },
  {
    name: '20%',
    value: '20%'
  },
  {
    name: '35%',
    value: '35%'
  }
];

const Filters: React.FC<IFilterProps> = props => {
  const classes = useStyles();
  const Buttons: IBtnActionProps[] = [
    {
      Title: 'Clear all',
      Color: 'back',
      HandleClick: () => {}
    },
    {
      Title: 'Apply',
      Color: 'cbregreen',
      HandleClick: () => (e: React.FormEvent<Element>) => {
        handleSubmit(e);
      }
    }
  ];

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
  };

  const handleValueChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = event.target.value;
    let data = { ...props.form, [name]: val };
    props.addToFilter(data);
  };

  // const handleCheckChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     var data = { ...props.form, [name]: event.target.checked };
  //     props.addToForm(data);
  // };

  // export default function FilterExpansionPanel() {

  const [hide, setHide] = React.useState<boolean>(true);

  return (
    <div style={{ marginTop: '24px' }}>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ borderBottom: 'inset' }}
        >
          <Typography className={classes.label}>Filters</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container component="main">
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <InputLabel shrink className={classes.label}>
                        Project Name
                      </InputLabel>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="projectname"
                        label="Add project name"
                        name="ProjectName"
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel shrink className={classes.label}>
                    Owner
                  </InputLabel>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="owner"
                        label="Add the name of..."
                        name="Owner"
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} style={{ display: 'inline-grid' }}>
                  <InputLabel shrink className={classes.label}>
                    Contract type
                  </InputLabel>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Checkbox
                        id="chkJCT"
                        value="checkedJCT"
                        onChange={handleSubmit}
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
                </Grid>
              </Grid>
              <Box
                component="span"
                display={hide ? 'none' : 'block'}
                id="boxAdvanceSearch"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Last updated
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="date"
                          label="DD"
                          name="Date"
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="month"
                          label="MM"
                          name="Month"
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="year"
                          label="YYYY"
                          name="Year"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Client/Customer
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="client"
                          label="Add the name of..."
                          name="Client"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ display: 'inline-grid' }}>
                    <InputLabel shrink className={classes.label}>
                      CDM notifiable
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <Checkbox
                          id="chkCDMYes"
                          value="checkedCDMYes"
                          onChange={handleSubmit}
                        />
                        <label>Yes</label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Checkbox
                          id="chkCDMNo"
                          value="checkedCDMNo"
                          onChange={handleSubmit}
                        />
                        <label>No</label>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Prob of winning
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="from"
                          label="From"
                          name="From"
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="to"
                          label="To"
                          name="To"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Status
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-select-status"
                          select
                          onChange={handleValueChange('status')}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          className={classes.select}
                          margin="normal"
                          name="Status"
                          label="Status here"
                          variant="outlined"
                          fullWidth
                          autoFocus
                          value={props.form.status}
                        >
                          {status.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Sold margin
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          select
                          onChange={handleValueChange('status')}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          className={classes.select}
                          margin="normal"
                          fullWidth
                          id="soldmargin"
                          label="Sold Margin"
                          name="SoldMargin"
                          autoFocus
                          value={props.form.soldmargin}
                        >
                          {soldMargin.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Expected start date
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="expectedfrom"
                          label="From"
                          name="ExpectedFrom"
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="expectedto"
                          label="To"
                          name="ExpectedTo"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Approx value
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="approxfrom"
                          label="From"
                          name="ApproxFrom"
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="approxto"
                          label="To"
                          name="ApproxTo"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel shrink className={classes.label}>
                      Weighted TCV
                    </InputLabel>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="weightedfrom"
                          label="From"
                          name="WeightedApproxFrom"
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="weightedto"
                          label="To"
                          name="WeightedTo"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <br />
              <Grid justify="space-between" container spacing={1}>
                <Grid item xs={4} sm={6} className="actions">
                  <Grid justify="space-between" container spacing={1}>
                    <Grid item xs={4} sm={3} className="actions">
                      <Typography className={classes.label}>
                        Advanced search
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={9} className="actions">
                      <Link
                        component="button"
                        variant="body2"
                        className={classes.label}
                        onClick={() => {
                          if (hide) {
                            setHide(false);
                          } else {
                            setHide(true);
                          }
                        }}
                      >
                        {hide ? (
                          <AddOutlinedIcon className={classes.label} />
                        ) : (
                          <RemoveOutlinedIcon className={classes.label} />
                        )}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={6} className="actions">
                  <div className="rightalign">
                    {hide ? null : <PageBtnActions Actions={[Buttons[0]]} />}
                    <PageBtnActions Actions={[Buttons[1]]} />
                  </div>
                </Grid>
              </Grid>
            </form>
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
  // }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
// export default (Filters);
