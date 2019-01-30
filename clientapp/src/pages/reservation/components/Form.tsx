import moment from 'moment';
import React, { Component, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export interface IReservationFormProps {
  startTime: Date;
  endTime: Date;
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
    const { startTime, endTime } = this.props;
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
            <Form.Control type="text" placeholder="John" required={true} autoFocus={true} />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Doe" required={true} />
            <Form.Control.Feedback type="invalid">
              Please enter your surname.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="john@doe.com" required={true} />
            <Form.Control.Feedback type="invalid">
              Please enter your email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="555 44 33 22" required={true} />
            <Form.Control.Feedback type="invalid">
              Please enter your phone.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Comments</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Button type="submit">Create reservation</Button>
      </Form>
    );
  }

  private handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  };
}
