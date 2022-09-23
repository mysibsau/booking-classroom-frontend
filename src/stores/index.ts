import shallow from "zustand/shallow";

import { useAuthStore as useAuthStoreZus } from "./useAuthStore";
import { IAuthStore } from "../types/auth";

import { useClassroomStore as useClassroomStoreZus } from "./useClassroomStore";
import { IClassroomStore } from "../types/classroom";

import { useBookingStore as useBookingStoreZus } from "./useBookingStore";
import { IBookingStore } from "../types/booking";

const useAuthStore: <T>(selector: (s: IAuthStore) => T) =>
    T = (selector) => useAuthStoreZus(selector, shallow);

const useClassroomStore: <T>(selector: (s: IClassroomStore) => T) =>
    T = (selector) => useClassroomStoreZus(selector, shallow);

const useBookingStore: <T>(selector: (s: IBookingStore) => T) =>
    T = (selector) => useBookingStoreZus(selector, shallow)

export {
    useAuthStore,
    useClassroomStore,
    useBookingStore
};