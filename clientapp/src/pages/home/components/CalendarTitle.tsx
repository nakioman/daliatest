import moment from 'moment';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export interface ICalendarTitleProps {
  date: Date;
  view: 'week' | 'day';
}

const CalendarTitle = (props: ICalendarTitleProps) => {
  const startOfWeek = moment(props.date).startOf('week');
  const endOfWeek = moment(props.date).endOf('week');
  return (
    <Row>
      <Col xs={12} className="text-center">
        {props.view === 'week'
          ? `${startOfWeek.format('LL')} - ${endOfWeek.format('LL')}`
          : moment(props.date).format('LL')}
      </Col>
    </Row>
  );
};

export default CalendarTitle;
