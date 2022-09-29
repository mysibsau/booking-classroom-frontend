export interface IBookingDates {
    date_start: string;
    date_end: string;
    start_time: string | null;
    end_time: string | null;
}

interface IEquipment {
    id: string;
    equipment: string;
    description: string;
    cound: number;
    is_spec_equip: boolean;
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
    bookings_in_room?: IBookingDates[];
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
    title: string;
    pseudo_text_booking: string;
    pseudo_text_equipment: string;
}

export interface IClassroomStore {
    loading: boolean;
    count: number;
    classroomList: IClassroom[];
    staticData: IStaticData;
    getClassroomList: (params?: Record<string, string | number>) => void;
    getStaticData: () => void;
}