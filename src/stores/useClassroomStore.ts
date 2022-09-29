import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IClassroomStore } from "../types/classroom";


const defaultStaticData = {
    carousel_photo: [],
    spec_text: "",
    title: "",
    pseudo_text_booking: "",
    pseudo_text_equipment: ""
}

export const useClassroomStore = create<IClassroomStore>()(
    devtools(immer(
        (set, get) => ({
            loading: true,
            classroomList: [],
            count: 0,
            staticData: defaultStaticData,
            getClassroomList: async (params) => {
                set(state => {
                    state.loading = true
                })

                await axios.get("/rooms/", { params }).then((response) => {
                    const data = response.data;
                    set((state) => {
                        state.loading = false;
                        state.classroomList = data.results;
                        state.count = data.count;
                    });
                }).catch((e: AxiosError) => {
                    const error = JSON.stringify(e);
                    set((state) => {
                        state.loading = false;
                    });
                });
            },
            getStaticData: async () => {
                await axios.get("/carousel/").then((response) => {
                    const data = response.data;
                    set((state) => {
                        state.loading = false;
                        state.staticData = data[0];
                    });
                }).catch((e: AxiosError) => {
                    const error = JSON.stringify(e);
                    set((state) => {
                        state.loading = false;
                    });
                });
            }
        })
    ))
);