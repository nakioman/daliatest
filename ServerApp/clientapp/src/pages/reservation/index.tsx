import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ReservationForm from './components/Form';
import ReservationConflict from './components/ReservationConflict';
import ReservationSuccess from './components/ReservationSuccess';

interface IReservationPageState {
  isSaving: boolean;
  error: boolean;
  saved: boolean;
}

export interface IPatient {
  name: string;
  comments: string;
  phone: string;
  email: string;
  surname: string;
}

export default class ReservationPage extends Component<
  RouteComponentProps,
  IReservationPageState
> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      error: false,
      isSaving: false,
      saved: false,
    };
  }

  public render() {
    const { location } = this.props;
    const { facilityAddress, facilityName, startTime, endTime } = location.state;
    const { saved, error, isSaving } = this.state;
    return saved ? (
      <ReservationSuccess
        facilityName={facilityName}
        facilityAddress={facilityAddress}
        startTime={startTime}
      />
    ) : error ? (
      <ReservationConflict />
    ) : (
      <ReservationForm
        startTime={startTime}
        endTime={endTime}
        isSaving={isSaving}
        save={this.save}
      />
    );
  }

  private save = async (patient: IPatient) => {
    this.setState({ isSaving: true });
    const { location, history } = this.props;
    const { facilityId, startTime, endTime } = location.state;
    const model = {
      comments: patient.comments,
      endTime,
      facilityId,
      patientEmail: patient.email,
      patientName: patient.name,
      patientPhone: patient.phone,
      patientSurname: patient.surname,
      startTime,
    };
    const response = await fetch('/api/reservation', {
      body: JSON.stringify(model),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    switch (response.status) {
      case 200:
        this.setState({ saved: true, isSaving: false });
        break;
      case 400:
        this.setState({ error: true, isSaving: false });
        break;
      default:
        history.replace('/500');
    }
  };
}
