import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home';
import ReservationPage from './pages/reservation';

class App extends Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/reservation" component={ReservationPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
