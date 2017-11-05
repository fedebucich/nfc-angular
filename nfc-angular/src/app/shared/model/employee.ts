export interface ScheduleWorkTime {
  dayNumber: number,
  timeFrom: Date,
  timeTo: Date
}

export interface Employee {
  _id: string;
  name: string;
  lastName: string;
  expedient: string;
  nfcTag: string;
  status: Status;
  scheduleWorkTime: ScheduleWorkTime[];
}

export type Status = "active" | "inactive" | "suspended";
