import moment from 'moment';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export interface ICalendarToolbarProps {
  date: Date;
  view: 'week' | 'day';
  setDate(date: Date): void;
}

export default class CalendarToolbarComponent extends Component<ICalendarToolbarProps, any> {
  public render() {
    const { date } = this.props;
    return (
      <Row>
        <Col xs="12" className="text-center">
          <Button
            size="sm"
            disabled={moment(date).diff(moment(), 'hour') < 23}
            variant="secondary"
            onClick={this.showPrevView}
          >
            &lt;&lt;
          </Button>
          &nbsp;
          <Button
            size="sm"
            disabled={moment(date).diff(moment(), 'hour') < 23}
            variant="primary"
            onClick={this.showToday}
          >
            Today
          </Button>
          &nbsp;
          <Button size="sm" variant="secondary" onClick={this.showNextView}>
            &gt;&gt;
          </Button>
        </Col>
      </Row>
    );
  }

  private showPrevView = () => {
    const { setDate, view, date } = this.props;
    const nextDate =
      view === 'week'
        ? date.setHours(date.getHours() - 24 * 7)
        : date.setHours(date.getHours() - 24);

    setDate(new Date(nextDate));
  };

  private showNextView = () => {
    const { setDate, view, date } = this.props;
    const nextDate =
      view === 'week'
        ? date.setHours(date.getHours() + 24 * 7)
        : date.setHours(date.getHours() + 24);

    setDate(new Date(nextDate));
  };

  private showToday = () => {
    this.props.setDate(new Date());
  };
}
