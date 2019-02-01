import moment from 'moment';

export const isToday = (week: Date, key: number) => {
  const startWeek = moment(week).startOf('week');
  const today = moment().startOf('day');
  const testDate = startWeek.add(key, 'day');

  return testDate.diff(today, 'day') === 0;
};

export const jsonParseDates = (key: any, value: any) => {
  const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
};
