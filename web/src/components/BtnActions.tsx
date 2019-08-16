import React from 'react';
import { Button, Box, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { IBtnActionProps } from '../props/AppProps';
import { AddCircleOutline, LibraryBooks } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonPrimary: {
            margin: theme.spacing(1),
            color: 'white',
            backgroundColor: 'black'
        },
        buttonSecondary: {
            margin: theme.spacing(1),
            borderColor: '#00684d',
            color: '#00684d'
        },
        buttonThird: {
            margin: theme.spacing(1),
            backroundColor: '#D3D3D3',
            color: '#000000'
        },
        buttonForth: {
            margin: theme.spacing(1),
            color: '#000000'
        },
        buttonGreen: {
            margin: theme.spacing(1),
            color: 'white',
            backgroundColor: '#00684d'
        },
        leftIcon: {
            marginRight: theme.spacing(1),
            fontSize: 20,
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
    }),
);

const GetIcons = (icon: string) => {
    const styles = useStyles();
    switch (icon) {
        case "create":
            return (<AddCircleOutline className={styles.leftIcon} />);
        case "pipeline":
            return (<LibraryBooks className={styles.leftIcon} />);
        default:
            return;
    }
}

const GetButtonStyle = (type: string) => {
    const styles = useStyles();
    switch (type) {
        case 'primary':
            return styles.buttonPrimary;
        case 'secondary':
            return styles.buttonSecondary;
        case 'save':
            return styles.buttonThird;
        case 'back':
            return styles.buttonForth;
        case 'cbregreen':
            return styles.buttonGreen;
        default:
            return '';
    }
}

export function PageBtnActions(props: { Actions: IBtnActionProps[] }) {
    const styles = useStyles();
    const items = props.Actions.map((item) =>
        <Button key={item.Title} variant="contained" color="primary" className={GetButtonStyle(item.Color || '')} onClick={item.HandleClick} >
            {GetIcons(item.Icon)}
            {item.Title}
        </Button>
    );

    return (
        <React.Fragment >
            {items}
        </React.Fragment>);
}



