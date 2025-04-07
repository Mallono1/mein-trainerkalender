export interface ISchedule {
  _id: string;
  coachId: string;
  studentId: string;
  hour: number; // 0-23 for hour of the day
  day: number; // 0-6 for day of the week (Sunday is 0)
  month: number; // 0-11 for month (January is 0)
  year: number; // e.g., 2025
  expiresAt: string;
  date?: Date; // For easier date handling
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  postalCode: string;
  phoneNumber: string;
  houseNumber: string;
  country: string;
  city: string;
  street: string;
  role: 'student' | 'coach';
  createdAt: Date;
  updatedAt: Date;
}

export interface Coach {
  _id: string;
  name: string;
}

export interface Student {
  _id: string;
  name: string;
}

export interface NewScheduleData {
  coachId: string;
  studentId: string;
  hour: number;
  date: Date;
}
