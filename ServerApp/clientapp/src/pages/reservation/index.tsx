import React, { Component } from 'react';

import ReservationForm from './components/Form';
import ReservationConflict from './components/ReservationConflict';
import ReservationSuccess from './components/ReservationSuccess';

export default class ReservationPage extends Component {
  public render() {
    // return <ReservationForm startTime={new Date()} endTime={new Date()} />
    // return <ReservationConflict />
    return (
      <ReservationSuccess
        facilityName="TEST"
        facilityAddress="TEST ADDRESS"
        startTime={new Date()}
      />
    );
  }
}
