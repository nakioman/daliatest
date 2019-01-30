import moment from 'moment';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export interface IReservationSuccessProps {
  facilityName: string;
  facilityAddress: string;
  startTime: Date;
}

const ReservationSuccessComponent = (props: IReservationSuccessProps) => (
  <Card bg="success" text="white" className="text-center">
    <Card.Header>Reservation Success</Card.Header>
    <Card.Body>
      <Card.Title>Your reservation is confirmed, here are the details</Card.Title>
      <Card.Text>
        <Row>
          <Col xs={12} className="text-center">Facility:&nbsp;{props.facilityName}</Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">Address:&nbsp;{props.facilityAddress}</Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">Date:&nbsp;{moment(props.startTime).format('LLLL')}</Col>
        </Row>
      </Card.Text>
      <Link to="/" className="btn btn-link">
        Home
      </Link>
    </Card.Body>
  </Card>
);

export default ReservationSuccessComponent;
