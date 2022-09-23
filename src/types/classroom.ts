export interface IBookingDates {
    date: string;
    start_time: string;
    end_time: string;
}

interface IEquipment {
    id: string;
    equipment: string;
    description: string;
    cound: number;
}

interface IPhoto {
    id: string;
    photo: string;
}

export interface IClassroom {
    id: string;
    room_photo: IPhoto[];
    description: string;
    address: string;
    capacity: number;
    equipment: IEquipment[];
    booking_dates?: IBookingDates[];
    admin: string;
    admin_contact_info: string;
}

export interface ICarousel {
    photo: string;
    address: string;
    event: string;
}

export interface IStaticData {
    carousel_photo: ICarousel[];
    spec_text: string;
}

export interface IClassroomStore {
    loading: boolean;
    count: number;
    classroomList: IClassroom[];
    staticData?: IStaticData;
    getClassroomList: (params?: Record<string, string | number>) => void;
    getStaticData: () => void;
}