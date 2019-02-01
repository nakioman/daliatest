import moment from 'moment';
import React, { Component } from 'react';

import { jsonParseDates } from '../../common';
import { IWeekSchedule } from '../../models/ApiInterfaces';
import Calendar from './components/Calendar';

interface IHomePageState {
  weekSchedule: IWeekSchedule | null;
  week: Date;
  isLoading: boolean;
}

export default class HomePage extends Component<any, IHomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      week: new Date(),
      weekSchedule: null,
    };
  }

  public componentDidMount() {
    this.fetchFreeSlots(this.state.week);
  }

  public render() {
    const { weekSchedule, week, isLoading } = this.state;
    return (
      <Calendar
        weekSchedule={weekSchedule}
        isLoading={isLoading}
        week={week}
        updateWeek={this.updateWeek}
      />
    );
  }

  private updateWeek = (newWeek: Date) => {
    this.setState({ week: newWeek });
    if (moment(this.state.week).isoWeek() !== moment(newWeek).isoWeek()) {
      this.fetchFreeSlots(newWeek);
    }
  };

  private fetchFreeSlots = async (date: Date) => {
    this.setState({ isLoading: true });
    const { history } = this.props;
    const uri = `/api/reservation/week/${date.toISOString()}`;
    const response = await fetch(uri);
    switch (response.status) {
      case 200:
      case 404:
        const result = await response.text();
        const weekSchedule = JSON.parse(result, jsonParseDates);
        this.setState({ weekSchedule, isLoading: false });
        break;
      default:
        history.replace('/500');
    }
  };
}
