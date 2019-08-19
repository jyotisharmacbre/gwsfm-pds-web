import React from 'react';
import { Button, Box, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { IBtnActionProps } from '../props/AppProps';
import { Add, Backspace, LibraryBooks, ViewList } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonPrimary: {
            margin: theme.spacing(1),
            color: 'white',
            backgroundColor: 'black'
        },
        buttonSecondary: {
            margin: theme.spacing(1),
            borderColor: 'green',
            color: '#ffffff',
            backgroundColor: '#00684d'
        },
        leftIcon: {
            marginRight: theme.spacing(1),

        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
    }),
);

function GetIcons(icon: string) {
    const styles = useStyles();
    switch (icon) {
        case "create":
            return (<Add className={styles.leftIcon} />);
        case "pipeline":
            return (<LibraryBooks className={styles.leftIcon} />);
        case "backspace":
            return (<Backspace className={styles.leftIcon} />);
            case "viewall":
                return (<ViewList className={styles.leftIcon} />)
    }
}

export function PageBtnActions(props: { Actions: IBtnActionProps[] }) {
    const styles = useStyles();
    const items = props.Actions.map((item) =>
        <Button key={item.Title} variant="contained" color="primary" className={item.Icon == 'create' ? styles.buttonPrimary : styles.buttonSecondary} onClick={item.HandleClick} >
            {GetIcons(item.Icon)}
            {item.Title}
        </Button>
    );

    return (
        <React.Fragment >
            {items}
        </React.Fragment>);
}



