import { IBookingDates } from "./classroom";

export type TUserStatus = 0 | 1;
export type TBookingStatus = 0 | 1 | 2;

export interface IRoom {
    address: string;
    admin_contact_info: string;
    admin: string;
}

export interface ICreateBooking {
    title: string;
    booking_date_time: IBookingDates[];
    contact_info: string;
    equipment: string;
    description: string;
    personal_status: number;
    position: string;
    room: string;
}

export interface IMyBooking {
    id: number;
    title: string;
    booking_date_time: IBookingDates[];
    contact_info: string;
    equipment: string;
    description: string;
    status: TBookingStatus;
    comment: string;
    personal_status: number;
    position: string;
    room: IRoom;
}

export interface IBookingStore {
    loading: boolean;
    isError: boolean;
    bookingList?: IMyBooking[];
    count: number;
    getBookingList: (token: string, params?: Record<string, string | number>) => void;
    createBooking: (token: string, data: ICreateBooking) => void;
}