import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IBookingStore } from "../types/booking";


export const useBookingStore = create<IBookingStore>()(
    devtools(immer(
        (set, get) => ({
            loading: false,
            bookingList: undefined,
            getBookingList: async () => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    set(state => {
                        state.loading = true
                    })
                    const userToken = JSON.parse(authStore).state.user.token

                    await axios.get("/bookings/my/",
                        {
                            headers: { Authorization: `Token ${userToken}` }
                        }
                    ).then((response) => {
                        const data = response.data;
                        set((state) => {
                            state.loading = false;
                            state.bookingList = data;
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
                await axios.post("/bookings/", data,
                    {
                        headers: { Authorization: `Token 3a874ba2fcfaed9bc62b8b220e5ba32a8fbf9508` }
                    })
            }
        })
    ))
);