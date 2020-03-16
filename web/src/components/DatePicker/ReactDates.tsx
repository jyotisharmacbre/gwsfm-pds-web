import React, { PureComponent, Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';
import moment from 'moment';
import { InjectedFormProps } from 'redux-form';
import cal from '../../assests/images/calender.svg';
import cal2 from '../../assests/images/focus_calander.svg';
import './styles.css';

interface Props {
  input: any;
  meta: any;
  placeholder: any;
  disabled: any;
  required?: any;
  enablePastDate?: boolean;
}

export const validDate = (year, month, day) => {
  if (!year || !month || !day) {
    return false;
  }
  var selectedDate = new Date(year, (month - 1), day);
  var todaysDate = new Date();
  if (selectedDate && selectedDate < todaysDate) {
    return false;
  }
  return true;
}
export const isOutsideRange = (enablePastDate, day) => {
  return enablePastDate ? false :
    !isInclusivelyAfterDay(day, moment());
}
class ReactDates extends PureComponent<Props & InjectedFormProps<{}, Props>>
{
  state = {
    focused: false,
    day: this.props.input.value?.date(),
    month: this.props.input.value?.month() + 1,
    year: this.props.input.value?.year()
  };

  reset() {
    this.setState({
      day: '',
      month: '',
      year: ''
    });
  }
  constructor(props) {
    super(props);
    let value: string = this.props.input.name;
    window[value] = this;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.input.value)
      this.setState({
        day: newProps.input.value.date(),
        month: newProps.input.value.month() + 1,
        year: newProps.input.value.year()
      });
  }

  onFocusChange = value => {
    this.setState({ focused: !this.state.focused });
    const { input } = this.props;
    input.onFocus(value);
  };
  setDateState = () => {
    this.setState({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    });
  }
  onChange = value => {
    this.setState({
      day: value?.date(),
      month: value?.month() + 1,
      year: value?.year()
    });
    const { input } = this.props;
    input.onChange(value);
  };

  handleDay = (value, type) => {
    const { input } = this.props;
    this.setState({ day: parseInt(value) });
  };
  changeDayEvent = (value, type) => {
    const { input } = this.props;
    if (validDate(this.state.year, this.state.month, this.state.day)) {
      input.onChange(moment(input.value).set(type, value));
    }
    else {
      this.setDateState();
      input.onChange(moment(new Date()));

    }
  };
  handleMonth = (value, type) => {
    const { input } = this.props;
    let month = value - 1;
    this.setState({ month: parseInt(value) });

  };
  changeMonthEvent = (value, type) => {
    const { input } = this.props;
    if (validDate(this.state.year, this.state.month, this.state.day)) {
      input.onChange(moment(input.value).set(type, (value - 1)));
    }
    else {
      this.setDateState();
      input.onChange(moment(new Date()));

    }

  };
  handleYear = (value, type) => {
    const { input } = this.props;
    this.setState({ year: parseInt(value) });
  };
  changeYearEvent = (value, type) => {
    const { input } = this.props;
    if (validDate(this.state.year, this.state.month, this.state.day)) {
      input.onChange(moment(input.value).set(type, value));
    }
    else {
      this.setDateState();
      input.onChange(moment(new Date()));

    }

  };


  render() {
    const {
      input,
      meta: { touched, error, warning },
      placeholder,
      disabled,
      required
    } = this.props;
    const { focused } = this.state;
    const invalid = error !== undefined && error !== null;

    return (
      <div className="date-picker-wrap">
        <input


          type="number"
          id="date"
          className="form-control"
          placeholder="DD"
          value={this.state.day}
          onChange={event => this.handleDay(event.target.value, 'date')}
          onBlur={event => this.changeDayEvent(event.target.value, 'date')}
        />
        <input
          type="number"
          className="form-control"
          id="month"
          placeholder="MM"
          value={this.state.month}
          onChange={event => this.handleMonth(event.target.value, 'month')}
          onBlur={event => this.changeMonthEvent(event.target.value, 'month')}
        />
        <input
          type="number"
          className="form-control"
          id="year"
          placeholder="YYYY"
          value={this.state.year}
          onChange={event => this.handleYear(event.target.value, 'year')}
          onBlur={event => this.changeYearEvent(event.target.value, 'year')}
        />
        <SingleDatePicker
          customInputIcon={focused ? <img src={cal2} /> : <img src={cal} />}
          noBorder={true}
          numberOfMonths={1}
          date={input.value}
          onDateChange={this.onChange}
          focused={focused}
          isInsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          onFocusChange={this.onFocusChange}
          id={input.name}
          isOutsideRange={(day) => isOutsideRange(this.props.enablePastDate, day)}
        />

        {error && touched && <span>{error}</span>}
      </div>
    );
  }
}

export default ReactDates;
