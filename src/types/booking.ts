import { IBookingDates } from "./classroom";

export type TUserStatus = 0 | 1;
export type TBookingStatus = 0 | 1 | 2;

export interface IRoom {
    address: string;
    admin_contact_info: string;
    admin: string;
}

export interface ICreateBooking {
    booking_date_time: IBookingDates[];
    contact_info: string;
    equipment: string;
    description: string;
    personal_status: TUserStatus;
    position: string;
    room: string;
}

export interface IMyBooking {
    id: number;
    booking_date_time: IBookingDates[];
    contact_info: string;
    equipment: string;
    description: string;
    status: TBookingStatus;
    comment: string;
    personal_status: TUserStatus;
    position: string;
    room: IRoom;
}

export interface IBookingStore {
    loading: boolean;
    bookingList?: IMyBooking[];
    getBookingList: () => void;
    createBooking: (data: ICreateBooking) => void;
}