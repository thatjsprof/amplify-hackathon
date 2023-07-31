export interface ICreateEvent {
  title: string;
  location?: string;
  description: string;
  startDate: string | Date;
  startTimezone: string;
  endDate: string | Date;
  endTimezone: string;
  emails: string[];
  linkedToTask: boolean;
}

export interface ICheckFree {
  startDate: Date | string;
  endDate: Date | string;
}
