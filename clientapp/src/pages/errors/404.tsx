import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Card  className="text-center">
    <Card.Header>Page Not Found</Card.Header>
    <Card.Body>
      <Card.Text>
        The page you are looking for does not exists.
      </Card.Text>
      <Link to="/" className="btn btn-link">Home</Link>
    </Card.Body>
  </Card>
);

export default NotFoundPage;
