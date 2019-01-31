import moment, { Moment } from 'moment';
import React from 'react';

import '../styles/calendarTableHeader.css';

export interface ICalendarTableHeaderProps {
  view: 'week' | 'day';
  date: Date;
}

const setCurrentDateStyle = (date: Moment, key: number) => {
  const today = moment().startOf('day');
  const testDate = moment(date).add(key, 'day');

  return testDate.diff(today, 'day') === 0 ? 'current-date' : undefined;
};

const CalendarTableHeader = (props: ICalendarTableHeaderProps) => {
  const date = moment(props.date);
  const startWeek = moment(props.date).startOf('week');
  const weekHeader = [
    <td className={setCurrentDateStyle(startWeek, 1)} key={1}>
      Mon
    </td>,
    <td className={setCurrentDateStyle(startWeek, 2)} key={2}>
      Tue
    </td>,
    <td className={setCurrentDateStyle(startWeek, 3)} key={3}>
      Wed
    </td>,
    <td className={setCurrentDateStyle(startWeek, 4)} key={4}>
      Thu
    </td>,
    <td className={setCurrentDateStyle(startWeek, 5)} key={5}>
      Fri
    </td>,
    <td className={setCurrentDateStyle(startWeek, 6)} key={6}>
      Sat
    </td>,
    <td className={setCurrentDateStyle(startWeek, 0)} key={0}>
      Sun
    </td>,
  ];
  const dayHeader = (
    <td className={setCurrentDateStyle(startWeek, date.weekday())}>{date.format('ddd')}</td>
  );
  return (
    <thead className="calendar-header">
      <tr className="text-center">{props.view === 'week' ? weekHeader : dayHeader}</tr>
    </thead>
  );
};

export default CalendarTableHeader;
