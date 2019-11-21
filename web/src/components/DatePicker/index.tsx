import React from 'react';
import moment from 'moment';
import { Field } from 'redux-form';
import ReactDates from './ReactDates';
import { FormattedMessage } from 'react-intl';

const formatDates = value => (value ? moment(value) : null);

const normalizeDates = value => (value ? value.format('YYYY-MM-DD') : null);

const DatePicker = props => {
  return (
    <div className={'form-group'}>
      {props.label && (
        <label>
          <FormattedMessage id={props.label} />
        </label>
      )}
      <Field
        normalize={normalizeDates}
        format={formatDates}
        name={props.name}
        component={ReactDates}
        props={props}
      />
    </div>
  );
};

export default DatePicker;
