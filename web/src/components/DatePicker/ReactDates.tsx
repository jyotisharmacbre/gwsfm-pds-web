import React, { PureComponent } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { InjectedFormProps } from 'redux-form';
import cal from '../../assests/images/calender.png';
import './styles.css';

interface Props {
  input: any;
  meta: any;
  placeholder: any;
  disabled: any;
  required: any;
}

const validDate = (year, month, day) =>
  moment(moment(year + '-' + month + '-' + day), 'YYYY-MM-DD', true).isValid();

class ReactDates extends PureComponent<
  Props & InjectedFormProps<{}, Props>
> {
  constructor(props) {
    super(props);
  }

  state = {
    focused: false,
    day: this.props.input.value.date(),
    month: this.props.input.value.month() + 1,
    year: this.props.input.value.year()
  };

  onFocusChange = value => {
    this.setState({ focused: !this.state.focused });
    const { input } = this.props;
    input.onFocus(value);
  };

  onChange = value => {
    this.setState({
      day: value.date(),
      month: value.month() + 1,
      year: value.year()
    });
    const { input } = this.props;
    input.onChange(value);
  };

  handleDay = (value, type) => {
    const { input } = this.props;
    if (validDate(this.state.year, this.state.month, value)) {
      input.onChange(moment(input.value).set(type, value));
      this.setState({ day: parseInt(value) });
    }
  };

  handleMonth = (value, type) => {
    const { input } = this.props;
    let month = value - 1;
    if (validDate(this.state.year, value, this.state.day)) {
      input.onChange(moment(input.value).set(type, month));
      this.setState({ month: parseInt(value) });
    }
  };

  handleYear = (value, type) => {
    const { input } = this.props;
    if (validDate(value, this.state.month, this.state.day)) {
      input.onChange(moment(input.value).set(type, value));
      this.setState({ year: parseInt(value) });
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
          className="form-control"
          placeholder="DD"
          value={this.state.day}
          onChange={event => this.handleDay(event.target.value, 'date')}
        />
        <input
          type="number"
          className="form-control"
          placeholder="MM"
          value={this.state.month}
          onChange={event => this.handleMonth(event.target.value, 'month')}
        />
        <input
          type="number"
          className="form-control"
          placeholder="YYYY"
          value={this.state.year}
          onChange={event => this.handleYear(event.target.value, 'year')}
        />
        <SingleDatePicker
          customInputIcon={<img src={cal} />}
          noBorder={true}
          numberOfMonths={1}
          date={input.value}
          onDateChange={this.onChange}
          focused={focused}
          onFocusChange={this.onFocusChange}
          id={input.name}
        />
        {error && touched && <span>{error}</span>}
      </div>
    );
  }
}

export default ReactDates;
