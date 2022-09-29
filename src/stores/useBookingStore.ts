import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IBookingStore } from "../types/booking";


export const useBookingStore = create<IBookingStore>()(
    devtools(immer(
        (set, get) => ({
            loading: true,
            bookingList: undefined,
            count: 0,
            getBookingList: async (params) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    set(state => {
                        state.loading = true
                    })
                    const userToken = JSON.parse(authStore).state.user.token

                    await axios.get("/booking/",
                        {
                            headers: { Authorization: `Token ${userToken}` },
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
                        });
                    });
                }
            },
            createBooking: async (data) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    await axios.post("/booking/create/", data,
                        {
                            headers: { Authorization: `Token 3a874ba2fcfaed9bc62b8b220e5ba32a8fbf9508` }
                        })
                }
            }
        })
    ))
);