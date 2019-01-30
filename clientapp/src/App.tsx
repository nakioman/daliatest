import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './layout/Navbar';
import NotFoundPage from './pages/errors/404';
import ServerErrorPage from './pages/errors/500';
import HomePage from './pages/home';
import ReservationPage from './pages/reservation';

class App extends Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Container fluid={true}>
            <Row className="flex-xl-nowrap">
              <Col as="main" xs={12} style={{ padding: '2rem 4rem' }}>
                <Switch>
                  <Route exact={true} path="/" component={HomePage} />
                  <Route path="/reservation" component={ReservationPage} />
                  <Route path="/500" component={ServerErrorPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
