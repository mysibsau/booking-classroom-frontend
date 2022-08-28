import create from "zustand";
import { immer } from "zustand/middleware/immer";
import {v4 as uuidv4} from "uuid";

type TPosition = "top-right" | "top-left" | "bottom-left" | "bottom-right"
export type TNotification = "success" | "danger"

export interface INotification {
    id: string;
    title: string;
    description: string;
    type: TNotification;
}

interface INotificationStore {
    position: TPosition;
    autoDelete: boolean;
    autoDeleteTime: number;
    toastList: Array<INotification>;
    deleteToast: (id: string) => void;
    addNotification: (
        title: string,
        description: string,
        type: TNotification
    ) => void;
}

export const useNotification = create(immer<INotificationStore>(((set, get) => ({
    autoDelete: true,
    autoDeleteTime: 5000,
    position: "bottom-right",
    toastList: [],
    deleteToast: (id) => {
        set((state) => ({
            toastList: [...state.toastList.filter(item => item.id !== id)]
        }));
    },
    addNotification: (title, direction, type) => {
        const newToast = {
            id: uuidv4(),
            title: title,
            description: direction,
            type: type
        };
        set((state) => ({
            toastList: [...state.toastList, newToast]
        }));
    }
}))));