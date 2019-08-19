import React from 'react';
import { Button, Box, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { IBtnActionProps } from '../props/AppProps';
import { AddCircleOutline, LibraryBooks } from '@material-ui/icons';
import { AppBarProps } from '@material-ui/core/AppBar';
import { AppTypes } from '../props/PropTypes';

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
        buttonSave: {
            margin: theme.spacing(1),
            backgroundColor: '#D3D3D3',
            color: '#000000'
        },
        buttonBack: {
            margin: theme.spacing(1),
            backgroundColor: 'white',
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

const GetButtonStyle = (type: AppTypes.Color) => {
    const styles = useStyles();
    switch (type) {
        case 'primary':
            return styles.buttonPrimary;
        case 'secondary':
            return styles.buttonSecondary;
        case 'save':
            return styles.buttonSave;
        case 'back':
            return styles.buttonBack;
        case 'cbregreen':
            return styles.buttonGreen;
        default:
            return '';
    }
}

export function PageBtnActions(props: { Actions: IBtnActionProps[] }) {
    const styles = useStyles();
    const items = props.Actions.map((item) =>
        <Button key={item.Title} variant='contained' color={(item.Color? undefined: 'primary')} className={GetButtonStyle(item.Color || undefined)} onClick={item.HandleClick}  >
            {GetIcons(item.Icon)}
            {item.Title}
        </Button>
    );

    return (
        <React.Fragment >
            {items}
        </React.Fragment>);
}



