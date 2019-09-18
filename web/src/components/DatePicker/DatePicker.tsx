import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function DatePicker() {
    return (
        <div><TextField
            id="date"
            //label="Select dates: from"
            type="date"
            //   defaultValue="2017-05-24"
            //className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        /></div>
    )
}