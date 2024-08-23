import { DeptsEnum } from "../enums/Enums";

export type WorkerType = {
  _id: number;
  name: string;
  email: string;
  phone: string;
  dept?: string;
};

export type FollowUpType = {
    _id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    group: string;
  }

  export type TestimonyType = {
    _id: number;
    name: string;
    subject: string;
    address: string;
    phone: string;
  }

  export type PrayerRequestType = {
    _id: number;
    subject: string;
    request: string;
    phone: string;
  };

  export type HouseFellowshipType = {
    _id: number;
    center: string;
    host: string;
    host_phone: string;
    teacher: string;
    teacher_phone: string;
    address: string;
  };

  export type AttendanceType = {
    [key: string]: { dept: string; attendance: string; date: string }
  }

  export type DeptType = { 
    total: string, 
    dept: DeptsEnum, 
    male: string, 
    female: string 
  }