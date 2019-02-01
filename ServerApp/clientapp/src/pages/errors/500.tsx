import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ServerErrorPage = () => (
  <Card bg="danger" text="white" className="text-center">
    <Card.Header>Server error</Card.Header>
    <Card.Body>
      <Card.Text>
        There was a server error and the request could not be completed, please try again in a few minutes.
      </Card.Text>
      <Link to="/" replace={true} className="btn btn-link">Home</Link>
    </Card.Body>
  </Card>
);

export default ServerErrorPage;
