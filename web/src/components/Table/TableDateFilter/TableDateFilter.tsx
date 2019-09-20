import React from 'react';
import { Grid, TextField, InputLabel, FormControlLabel, IconButton, createStyles, makeStyles, Theme, FormGroup, Checkbox } from "@material-ui/core";
import { DateRange } from '@material-ui/icons';
import Table from '../Simple/Table';
import { ITableFilterProps } from '../../../props/AppProps';

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

const createTableColumns = () => {
    return [
        {
            title: 'Project name',
            field: 'projectname',
            customFilterAndSearch: (term: any, rowData: any) => term == rowData.name.length
        },
        { title: 'Owner', field: 'owner' },
        { title: 'List Update', field: 'listupdate', type: 'date' },
        {
            title: 'Client/customer',
            field: 'clientcustomer',      
        },
        {
            title: 'Prob of winning',
            field: 'probofwinning',          
        },
        {
            title: 'Status',
            field: 'status',        
        },
        {
            title: 'Expected start date',
            field: 'expectedstartdate', 
            type: 'date'       
        },
        {
            title: 'Approx value',
            field: 'approxvalue',        
        },
        {
            title: 'Contract type',
            field: 'contracttype',        
        },
        {
            title: 'CMD notifiable',
            field: 'cmdnotificable',        
        },
        {
            title: 'Sold margin',
            field: 'soldmargin',        
        },
        {
            title: 'Weighted TCV',
            field: 'weightedtcv',        
        },
        {
            title: 'Rank',
            field: 'rank',        
        },
    ];
}

const getTableData = () => {
    return [
        { projectname: 'Leak detection improvement', owner: 'Stacy Salter', listupdate: new Date('07/21/2019'),clientcustomer: 'JCB', probofwinning:'25%', status: 'J&A', expectedstartdate:new Date('12/21/2019'), approxvalue: '$70,000', contracttype:'JCT', cmdnotificable:'Yes', soldmargin:'15%', weightedtcv:'$96,000',rank:'1' },
        { projectname: 'Generator replacement', owner: 'Imran Khan', listupdate: new Date('07/21/2019'),clientcustomer: 'TLD', probofwinning:'25%', status: 'J&A', expectedstartdate:new Date('1/2/2019'), approxvalue: '$50,000', contracttype:'JCT', cmdnotificable:'Yes', soldmargin:'55%', weightedtcv:'$43,000',rank:'3' },
        { projectname: 'Improvements', owner: 'Joice Ronald', listupdate: new Date('07/21/2019'),clientcustomer: 'PWC', probofwinning:'25%', status: 'J&A', expectedstartdate:new Date('9/2/2019'), approxvalue: '$660,000', contracttype:'JCT', cmdnotificable:'Yes', soldmargin:'15%', weightedtcv:'$93,000',rank:'1' },
        { projectname: 'Alteration programme', owner: 'Bevely Thomas', listupdate: new Date('07/21/2019'),clientcustomer: 'HSBC', probofwinning:'25%', status: 'CPP', expectedstartdate:new Date('12/21/2019'), approxvalue: '$67,000', contracttype:'JCT', cmdnotificable:'Yes', soldmargin:'15%', weightedtcv:'$63,000',rank:'1' },
        { projectname: 'Leak prevention', owner: 'Grace Jones', listupdate: new Date('07/21/2019'),clientcustomer: 'ING', probofwinning:'25%', status: 'J&A', expectedstartdate:new Date('4/21/2019'), approxvalue: '$90,000', contracttype:'JCT', cmdnotificable:'No', soldmargin:'35%', weightedtcv:'$843,000',rank:'2' },
        { projectname: 'Site clearance', owner: 'Stacy Salter', listupdate: new Date('07/21/2019'),clientcustomer: 'JCB', probofwinning:'25%', status: 'J&A', expectedstartdate:new Date('8/21/2019'), approxvalue: '$40,000', contracttype:'JCT', cmdnotificable:'Yes', soldmargin:'5%', weightedtcv:'$63,000',rank:'1' },
    ];
}

const TableDateFilter: React.FC<ITableFilterProps> = (props) => {


    return (
        <div >
            <DateFilter />
            <Table columns={props.columns} data={props.data} ActionList={[]} />
        </div >
    );
}

export default TableDateFilter;