export interface IFreeSlot {
  startTime: Date;
  endTime: Date;
}

export interface IWeekSchedule {
  facilityId: string;
  facilityName: string;
  facilityAddress: string;
  monday: IFreeSlot[];
  tuesday: IFreeSlot[];
  wednesday: IFreeSlot[];
  thrusday: IFreeSlot[];
  friday: IFreeSlot[];
  saturday: IFreeSlot[];
  sunday: IFreeSlot[];
}
