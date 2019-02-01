import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import { IWeekSchedule } from '../../../models/ApiInterfaces';
import CalendarContent from './CalendarContent';
import CalendarLoading from './CalendarLoading';
import CalendarTableHeader from './CalendarTableHeader';
import CalendarTitle from './CalendarTitle';
import CalendarToolbar from './CalendarToolbar';

import styles from '../styles/Calendar.module.css';
interface ICalendarProps {
  isLoading: boolean;
  weekSchedule: IWeekSchedule | null;
  week: Date;
  updateWeek(week: Date): void;
}

interface ICalendarState {
  view: 'week' | 'day';
}

export default class CalendarComponent extends Component<ICalendarProps, ICalendarState> {
  constructor(props: any) {
    super(props);

    this.state = {
      view: window.innerWidth <= 576 ? 'day' : 'week',
    };
  }

  public componentDidMount() {
    window.addEventListener('resize', this.updateCalendarView);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateCalendarView);
  }

  public render() {
    const { weekSchedule, week, updateWeek, isLoading } = this.props;
    const { view } = this.state;

    return (
      <Container>
        <CalendarToolbar
          view={view}
          isLoading={isLoading}
          week={week}
          updateWeek={updateWeek}
        />
        <CalendarTitle view={view} week={week} isLoading={isLoading} />
        <Table bordered={true} size="sm">
          <thead className={styles.header}>
            <CalendarTableHeader view={view} week={week} />
          </thead>
          <tbody>
            {isLoading ? (
              <CalendarLoading />
            ) : (
              <CalendarContent view={view} week={week} weekSchedule={weekSchedule} />
            )}
          </tbody>
        </Table>
      </Container>
    );
  }

  private updateCalendarView = () => {
    if (window.innerWidth <= 576) {
      this.setState({ view: 'day' });
    } else {
      this.setState({ view: 'week' });
    }
  };
}
