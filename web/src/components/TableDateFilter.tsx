import React from 'react';
import { Grid, TextField, InputLabel, FormControlLabel, IconButton, createStyles, makeStyles, Theme, Switch, withStyles, FormGroup, Table, TableHead, TableCell, TableRow, TableBody, Checkbox, TableSortLabel, Paper, TablePagination, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { DateRange } from '@material-ui/icons';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';


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

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        spacer: {
            flex: '1 1 100%',
        },
        actions: {
            color: theme.palette.text.secondary,
        },
        title: {
            flex: '0 0 auto',
        },
    }),
);





const DateFilter: React.FC = () => {
    const classes = useStyles();
    return (<Grid container spacing={2} style={{ backgroundColor: 'rgb(235, 238, 245)' }}>
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
                            <DateRange />
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
                {/* <FormControlLabel
                    control={<Switch value="gilad" />}
                    label="All"
                /> */}
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

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): Data {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

interface HeadRow {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headRows: HeadRow[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                            {orderBy === row.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export function ETable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof Data) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event: React.MouseEvent<unknown>, name: string) {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
        setDense(event.target.checked);
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>

            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, row.name)}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                       
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />

        </div>
    );
}

const TableDateFilter: React.FC = () => {

    const classes = useStyles();

    return (
        <div >
            <DateFilter />
            <ETable />
        </div >
    );
}

export default TableDateFilter;