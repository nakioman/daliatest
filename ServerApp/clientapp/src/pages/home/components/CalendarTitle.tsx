import moment from 'moment';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export interface ICalendarTitleProps {
  isLoading: boolean;
  week: Date;
  view: 'week' | 'day';
}

const CalendarTitle = (props: ICalendarTitleProps) => {
  const startOfWeek = moment(props.week).startOf('week');
  const endOfWeek = moment(props.week).endOf('week');
  return (
    <Row>
      <Col xs={12} className="text-center">
        {props.isLoading
          ? 'Loading...'
          : props.view === 'week'
            ? `${startOfWeek.format('LL')} - ${endOfWeek.format('LL')}`
            : moment(props.week).format('LL')}
      </Col>
    </Row>
  );
};

export default CalendarTitle;
