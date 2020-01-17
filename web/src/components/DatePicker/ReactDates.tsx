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

class ReactDates extends PureComponent<Props & InjectedFormProps<{}, Props>> {
  state = {
    focused: false,
    day: this.props.input.value.date(),
    month: this.props.input.value.month() + 1,
    year: this.props.input.value.year()
  };
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
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
    this.setState({ day: parseInt(value) });
  };
  changeDayEvent = (value, type) => {
    const { input } = this.props;
    if(value>31||!value||value==0)
    {
      value=new Date().getDate();
      this.setState({ day: parseInt(value) });
    }
    if(this.state.month==2)
    {
      if(this.state.year%4==0)
      {
        if(value>29)
        {
          value=new Date().getDate();
      this.setState({ day: parseInt(value) });
        }
      }
      else
      {
        if(value>28)
        {
          value=new Date().getDate();
      this.setState({ day: parseInt(value) });
        }
      }
      
    }
      input.onChange(moment(input.value).set(type, value));
  };
  handleMonth = (value, type) => {
    const { input } = this.props;
    let month = value - 1;
    this.setState({ month: parseInt(value) });
    
  };
  changeMonthEvent = (value, type) => {
    const { input } = this.props;
    if(value>12||!value||value==0)
    {
      value=(new Date().getMonth());
      this.setState({ month: parseInt(value+1) });
    }
    value=value>0?value-1:value;
      input.onChange(moment(input.value).set(type, value));
  };
  handleYear = (value, type) => {
    const { input } = this.props;
    this.setState({ year: parseInt(value) });
   
  };
  changeYearEvent = (value, type) => {
    const { input } = this.props;
    var aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 20);
    if(value.length<4||!value||(value>=aYearFromNow.getFullYear())||value<=new Date().getFullYear())
    {
      value=new Date().getFullYear();
      this.setState({ year: parseInt(value) });
    }
      input.onChange(moment(input.value).set(type, value));
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
          onBlur={event=>this.changeDayEvent(event.target.value, 'date')}
        />
        <input
          type="number"
          className="form-control"
          placeholder="MM"
          value={this.state.month}
          onChange={event => this.handleMonth(event.target.value, 'month')}
          onBlur={event=>this.changeMonthEvent(event.target.value, 'month')}
        />
        <input
          type="number"
          className="form-control"
          placeholder="YYYY"
          value={this.state.year}
          onChange={event => this.handleYear(event.target.value, 'year')}
          onBlur={event=>this.changeYearEvent(event.target.value, 'year')}
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
