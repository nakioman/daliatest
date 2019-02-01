import moment from 'moment';
import React from 'react';

import { isToday } from '../../../common';
import styles from '../styles/Calendar.module.css';

export interface ICalendarTableHeaderProps {
  view: 'week' | 'day';
  week: Date;
}

const setCurrentDateStyle = (date: Date, key: number) => {

  return isToday(date, key) ? styles.currentDate : undefined;
};

const CalendarTableHeader = (props: ICalendarTableHeaderProps) => {
  const date = moment(props.week);
  const weekHeader = [
    <td className={setCurrentDateStyle(props.week, 1)} key={1}>
      Mon
    </td>,
    <td className={setCurrentDateStyle(props.week, 2)} key={2}>
      Tue
    </td>,
    <td className={setCurrentDateStyle(props.week, 3)} key={3}>
      Wed
    </td>,
    <td className={setCurrentDateStyle(props.week, 4)} key={4}>
      Thu
    </td>,
    <td className={setCurrentDateStyle(props.week, 5)} key={5}>
      Fri
    </td>,
    <td className={setCurrentDateStyle(props.week, 6)} key={6}>
      Sat
    </td>,
    <td className={setCurrentDateStyle(props.week, 0)} key={0}>
      Sun
    </td>,
  ];
  const dayHeader = (
    <td className={setCurrentDateStyle(props.week, date.weekday())}>{date.format('ddd')}</td>
  );
  return <tr className="text-center">{props.view === 'week' ? weekHeader : dayHeader}</tr>;
};

export default CalendarTableHeader;
