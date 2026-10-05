import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import React from 'react';

import './style.scss';

const UCalendar = ({
    yearValue,
    monthValue,
    dateValue,
    onYearChange,
    onMonthChange,
    onDateChange
}) => {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="calendar-wrapper">
                <YearCalendar
                    value={yearValue}
                    onChange={onYearChange}
                    autoFocus
                />
                <MonthCalendar
                    value={monthValue}
                    onChange={onMonthChange}
                    autoFocus
                />
                <DateCalendar
                    value={dateValue}
                    onChange={onDateChange}
                />
            </div>
        </LocalizationProvider>
    )
}

export default UCalendar