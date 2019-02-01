import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { Component, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { IPatient } from '..';

library.add(faSpinner);

export interface IReservationFormProps {
  startTime: Date;
  endTime: Date;
  isSaving: boolean;
  save(patient: IPatient): void;
}

export interface IReservationFormState {
  validated: boolean;
}

export default class ReservationForm extends Component<
  IReservationFormProps,
  IReservationFormState
> {
  constructor(props: IReservationFormProps) {
    super(props);

    this.state = {
      validated: false,
    };
  }

  public render() {
    const { startTime, endTime, isSaving } = this.props;
    const { validated } = this.state;
    return (
      <Form noValidate={true} validated={validated} onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Reservation Start</Form.Label>
            <Form.Control
              plaintext={true}
              readOnly={true}
              defaultValue={moment(startTime).format('LLLL')}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Reservation End</Form.Label>
            <Form.Control
              plaintext={true}
              readOnly={true}
              defaultValue={moment(endTime).format('LLLL')}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              disabled={isSaving}
              name="firstName"
              required={true}
              autoFocus={true}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              placeholder="Doe"
              disabled={isSaving}
              required={true}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your surname.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="john@doe.com"
              disabled={isSaving}
              required={true}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="555 44 33 22"
              disabled={isSaving}
              required={true}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your phone.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Comments</Form.Label>
          <Form.Control name="comments" as="textarea" rows="3" disabled={isSaving} />
        </Form.Group>
        <Button type="submit" disabled={isSaving}>
          Create reservation {isSaving && <FontAwesomeIcon spin={true} icon="spinner" />}
        </Button>
      </Form>
    );
  }

  private handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const patient = {
        comments: form.comments.value,
        email: form.email.value,
        name: form.firstName.value,
        phone: form.phone.value,
        surname: form.surname.value,
      };
      this.props.save(patient);
    }
    this.setState({ validated: true });
  };
}
