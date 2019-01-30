import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default class NavbarLayout extends Component {
  public render() {
    return (
      <Navbar bg="dark" as="header" role="banner" variant="dark">
        <Navbar.Brand>
          <Link to="/" className='navbar-brand'>Site reservation</Link>
        </Navbar.Brand>
      </Navbar>
    );
  }
}
