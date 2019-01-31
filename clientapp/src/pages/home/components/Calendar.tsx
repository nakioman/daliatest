import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import { IFreeSlot } from '..';

import CalendarTableHeader from './CalendarTableHeader';
import CalendarTitle from './CalendarTitle';
import CalendarToolbar from './CalendarToolbar';

interface ICalendarProps {
  freeSlots: IFreeSlot[];
}

interface ICalendarState {
  view: 'week' | 'day';
  date: Date;
}

export default class CalendarComponent extends Component<ICalendarProps, ICalendarState> {
  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
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
    const { freeSlots } = this.props;
    const { date, view } = this.state;

    return (
      <Container>
        <CalendarToolbar view={view} date={date} setDate={this.setDate} />
        <CalendarTitle view={view} date={date} />
        <Table bordered={true} size="sm">
          <CalendarTableHeader view={view} date={date}/>
        </Table>
      </Container>
    );
  }

  private setDate = (date: Date) => {
    this.setState({ date });
  };

  private updateCalendarView = () => {
    if (window.innerWidth <= 576) {
      this.setState({ view: 'day' });
    } else {
      this.setState({ view: 'week' });
    }
  };
}
