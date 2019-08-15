import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props: any) {
    return (
        <Typography component="h2" variant="h6" style={{color: '#00684d'}} gutterBottom>
            {props.children}
        </Typography>
    );
}

export function MainTitle(props: any) {
    return (
        <div>
            <b>PROJECT DELIVERY SYSTEM</b><br />
            <Typography component="h1" variant="h5" style={{color: '#00684d'}} gutterBottom>
                {props.children}
            </Typography>
        </div>

    );
}


Title.propTypes = {
    children: PropTypes.node,
};

MainTitle.propTypes = {
    children: PropTypes.node,
};