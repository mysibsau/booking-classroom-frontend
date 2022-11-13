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
                            state.isError = true;
                        });
                    });
                }
            },
            createBooking: async (data) => {
                const authStore = sessionStorage.getItem('authStore')

                if (authStore) {
                    set(state => {
                        state.loading = true
                    })
                    const userToken = JSON.parse(authStore).state.user.token

                    await axios.post("/booking/create/", data,
                        {
                            headers: { Authorization: `Token ${userToken}` }
                        }).then(() =>
                            set(state => {
                                state.loading = false
                            })
                        )
                }
            }
        })
    )
);