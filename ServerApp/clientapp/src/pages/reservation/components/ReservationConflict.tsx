import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ReservationConflictComponent = () => (
  <Card bg="warning" text="white" className="text-center">
    <Card.Header>Reservation Error</Card.Header>
    <Card.Body>
      <Card.Title>Reservation slot already booked</Card.Title>
      <Card.Text>
        The reservation slot was already booked by another pacient, please choose another time
        slot.
      </Card.Text>
      <Link to="/" replace={true} className="btn btn-link">Home</Link>
    </Card.Body>
  </Card>
);

export default ReservationConflictComponent;
