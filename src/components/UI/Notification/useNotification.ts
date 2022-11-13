import create from "zustand";
import { immer } from "zustand/middleware/immer";
import {v4 as uuidv4} from "uuid";

export type TPosition = "top-right" | "top-left" | "bottom-left" | "bottom-right"
export type TNotification = "success" | "danger"

export interface INotification {
    id: string;
    title: string;
    body: string;
    type: TNotification;
    autoDelete: boolean;
    autoDeleteTime: number;
}

interface IAddNotific {
    title: string;
    body: string;
    type: TNotification;
    autoDelete?: boolean;
    autoDeleteTime?: number;
}

interface INotificationStore {
    notificList: Array<INotification>;
    deleteNotific: (id: string) => void;
    addNotific: (data: IAddNotific) => void;
}

export const useNotification = create(immer<INotificationStore>(((set, get) => ({
    notificList: [],
    deleteNotific: (id) => {
        set((state) => ({
            notificList: [...state.notificList.filter(item => item.id !== id)]
        }));
    },
    addNotific: (data) => {
        const newNotific = {
            id: uuidv4(),
            autoDelete: true,
            autoDeleteTime: 5000,
            ...data
        };
        set((state) => ({
            notificList: [...state.notificList, newNotific]
        }));
    }
}))));