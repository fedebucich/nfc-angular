export interface ScheduleWorkTime {
  dayNumber: number,
  timeFrom: number,
  timeTo: number
}

export interface Employee {
  _id: string;
  name: string;
  lastName: string;
  expedient: string;
  nfcTag: string;
  status: string;
  scheduleWorkTime: ScheduleWorkTime[];
}
