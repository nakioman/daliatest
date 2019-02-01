import React, { Component } from 'react';

import Calendar from './components/Calendar';

interface IHomePageState {
  freeSlots: IFreeSlot[];
}

export interface IFreeSlot {
  end: Date;
  start: Date;
}

export default class HomePage extends Component<any, IHomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      freeSlots: [
        {
          end: new Date(new Date().setHours(20)),
          start: new Date(),
        },
      ],
    };
  }

  public render() {
    const { freeSlots } = this.state;
    return <Calendar freeSlots={freeSlots} />;
  }
}
