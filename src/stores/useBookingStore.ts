import create from "zustand";
import { immer } from "zustand/middleware/immer";
import axios, { AxiosError } from "axios";
import { IBookingStore } from "../types/booking";


export const useBookingStore = create<IBookingStore>()(
    immer(
        (set, get) => ({
            loading: true,
            isError: false,
            bookingList: undefined,
            count: 0,
            getBookingList: async (token, params) => {
                set(state => {
                    state.loading = true
                })

                await axios.get("/booking/",
                    {
                        headers: { Authorization: `Token ${token}` },
                        params
                    }
                ).then((response) => {
                    const data = response.data;
                    set((state) => {
                        state.loading = false;
                        state.bookingList = data.results;
                        state.count = data.count;
                    });
                }).catch((e: AxiosError) => {
                    const error = JSON.stringify(e);
                    set((state) => {
                        state.loading = false;
                        state.isError = true;
                    });
                });
            },
            createBooking: async (token, data) => {
                set(state => {
                    state.loading = true
                })

                await axios.post("/booking/create/", data,
                    {
                        headers: { Authorization: `Token ${token}` }
                    }).then(() =>
                        set(state => {
                            state.loading = false
                        })
                    )
            }

        })
    )
);