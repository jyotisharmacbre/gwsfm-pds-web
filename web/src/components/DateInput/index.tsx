import React from 'react';
import './style.css';
import DatePicker from 'react-datepicker';
import { IconButton } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';


const DateInput: React.FC = () => {
    const [startDate, setStartDate] = React.useState(new Date());
    var calendar:any  = null;
    return (<label>
        <DatePicker   dateFormat="dd/MM/yyyy" selected={startDate} onChange={date => setStartDate(date == undefined ? new Date() : date)} ref={(c) => calendar = c}></DatePicker><IconButton color="primary" onClick={()=>calendar.setOpen(true)}><CalendarToday /></IconButton>
    </label>
    )
}

export default DateInput;