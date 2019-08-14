import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

export default function PageActions(props: {Actions: [{Title:string}]}) {
    const items = props.Actions.map((item) =>
    <Button variant="contained" color="primary">{item.Title}</Button>
    );
    return (
        {items}
    );
}



