import moment from 'moment';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export interface ICalendarToolbarProps {
  isLoading: boolean;
  week: Date;
  view: 'week' | 'day';
  updateWeek(week: Date): void;
}

export default class CalendarToolbarComponent extends Component<ICalendarToolbarProps, any> {
  public render() {
    const { week, isLoading } = this.props;
    return (
      <Row>
        <Col xs="12" className="text-center">
          <Button
            size="sm"
            disabled={moment(week).diff(moment(), 'hour') < 23 || isLoading}
            variant="secondary"
            onClick={this.showPrevView}
          >
            &lt;&lt;
          </Button>
          &nbsp;
          <Button
            size="sm"
            disabled={moment(week).diff(moment(), 'hour') < 23 || isLoading}
            variant="primary"
            onClick={this.showToday}
          >
            Today
          </Button>
          &nbsp;
          <Button
            size="sm"
            disabled={isLoading}
            variant="secondary"
            onClick={this.showNextView}
          >
            &gt;&gt;
          </Button>
        </Col>
      </Row>
    );
  }

  private showPrevView = () => {
    const { updateWeek, view, week } = this.props;
    const nextDate =
      view === 'week'
        ? moment(week).subtract(1, 'weeks')
        : moment(week).subtract(1, 'days');

    updateWeek(nextDate.toDate());
  };

  private showNextView = () => {
    const { updateWeek, view, week } = this.props;
    const nextDate =
      view === 'week'
      ? moment(week).add(1, 'weeks')
      : moment(week).add(1, 'days');

    updateWeek(nextDate.toDate());
  };

  private showToday = () => {
    this.props.updateWeek(new Date());
  };
}
