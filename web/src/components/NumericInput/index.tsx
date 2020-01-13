import React from 'react';
import moment from 'moment';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
const normalizeNumericInput = (val, prevVal) => {
    if (val) {
        return (/^[0-9]*$/.test(val)) ? parseInt(val) : 0
    }
    else {
        return 0;
    }
};

const ValidatedNumericInput = props => {
    return (
        <div className={'form-group'}>
            <Field
                normalize={normalizeNumericInput}
                name={props.name}
                props={props}
                type={props.type}
                className={props.className}
                placeholderKey={props.placeholderKey}
                component={props.component}
                currency={props.currency}
                inputmode={props.inputmode}
                divPosition={props.divPosition}
                validate={props.validate}
            />
        </div>
    );
};

export default ValidatedNumericInput;
