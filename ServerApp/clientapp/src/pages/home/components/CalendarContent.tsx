import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { IFreeSlot, IWeekSchedule } from '../../../models/ApiInterfaces';

import { isToday } from '../../../common';
import styles from '../styles/Calendar.module.css';

interface ICalendarContentProps {
  weekSchedule: IWeekSchedule | null;
  week: Date;
  view: 'week' | 'day';
}

interface ICalendarDayProps {
  freeSlots: IFreeSlot[] | null;
  facilityId: string;
  facilityName: string;
  facilityAddress: string;
  day: number;
  week: Date;
  view: 'week' | 'day';
}

const futureSlots = (slots: IFreeSlot[]) => {
  return slots ? slots.filter(slot => slot.startTime >= new Date()) : [];
};

const hasFreeSlots = (weekSchedule: IWeekSchedule) => {
  const monday = futureSlots(weekSchedule.monday);
  const tuesday = futureSlots(weekSchedule.tuesday);
  const wednesday = futureSlots(weekSchedule.wednesday);
  const thrusday = futureSlots(weekSchedule.thrusday);
  const friday = futureSlots(weekSchedule.friday);
  const saturday = futureSlots(weekSchedule.saturday);
  const sunday = futureSlots(weekSchedule.sunday);

  return (
    monday.length ||
    tuesday.length ||
    wednesday.length ||
    thrusday.length ||
    friday.length ||
    saturday.length ||
    sunday.length
  );
};

const showDay = (view: 'week' | 'day', week: Date, day: number) => {
  return view === 'week' || moment(week).weekday() === day;
};

const CalendarContentComponent = ({ week, weekSchedule, view }: ICalendarContentProps) =>
  weekSchedule && hasFreeSlots(weekSchedule) ? (
    <tr className={styles.contentRow}>
      {showDay(view, week, 1) && (
        <CalendarDay
          freeSlots={weekSchedule.monday}
          {...weekSchedule}
          day={1}
          week={week}
          view={view}
        />
      )}
      {showDay(view, week, 2) && (
        <CalendarDay
          freeSlots={weekSchedule.tuesday}
          {...weekSchedule}
          day={2}
          week={week}
          view={view}
        />
      )}
      {showDay(view, week, 3) && (
        <CalendarDay
          freeSlots={weekSchedule.wednesday}
          {...weekSchedule}
          day={3}
          week={week}
          view={view}
        />
      )}
      {showDay(view, week, 4) && (
        <CalendarDay
          freeSlots={weekSchedule.thrusday}
          {...weekSchedule}
          day={4}
          week={week}
          view={view}
        />
      )}
      {showDay(view, week, 5) && (
        <CalendarDay
          freeSlots={weekSchedule.friday}
          {...weekSchedule}
          day={5}
          week={week}
          view={view}
        />
      )}
      {showDay(view, week, 6) && (
        <CalendarDay
          freeSlots={weekSchedule.saturday}
          {...weekSchedule}
          day={6}
          week={week}
          view={view}
        />
      )}
      {showDay(view, week, 0) && (
        <CalendarDay
          freeSlots={weekSchedule.sunday}
          {...weekSchedule}
          day={0}
          week={week}
          view={view}
        />
      )}
    </tr>
  ) : (
    <tr className={styles.contentRow}>
      <td colSpan={7}>No free slots</td>
    </tr>
  );

const setCurrentDateStyle = (date: Date, key: number) => {
  return isToday(date, key) ? styles.currentDayColumn : undefined;
};

const CalendarDay = ({
  freeSlots,
  facilityId,
  facilityAddress,
  facilityName,
  week,
  day,
  view,
}: ICalendarDayProps) =>
  freeSlots ? (
    <td className={setCurrentDateStyle(week, day)}>
      {futureSlots(freeSlots).map((slot, idx) => (
        <p className={styles.p} key={idx}>
          <Link
            to={{
              pathname: '/reservation',
              state: {
                endTime: slot.endTime,
                facilityAddress,
                facilityId,
                facilityName,
                startTime: slot.startTime,
              },
            }}
          >
            {moment(slot.startTime).format('HH:mm')}
          </Link>
        </p>
      ))}
    </td>
  ) : view === 'week' ? (
    <td />
  ) : (
    <td>No free slots</td>
  );

export default CalendarContentComponent;
