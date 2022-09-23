import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IAuth, IAuthStore } from "../types/auth";

const user = sessionStorage.getItem('authStore')
const foundUser = user ? JSON.parse(user).user : undefined

const defaultState: IAuth = {
    token: '',
    name: 'Oleg',
    id: 0,
    password: "",
    username: "",
    ...foundUser
}

export const useAuthStore = create<IAuthStore>()(
    devtools(immer(persist(
        (set, get) => ({
            loading: false,
            user: foundUser ? foundUser : undefined,
            logIn: async (username, password) => {
                set({
                    loading: true
                })
                await axios.post('/auth/', { username: username, password: password })
                    .then((responce) => {
                        const data = responce.data
                        set(state => {
                            state.user = data 
                            state.loading = false
                        })

                    })
                    .catch((e: AxiosError) => {
                        set({
                            loading: false
                        })
                    })

                // await axios.get('/auth/')
                //     .then((responce) => {
                //         const data = responce.data
                //         set(state => {
                //             state.user = data;
                //             state.loading = false;
                //         })

                //     })
                //     .catch((e: AxiosError) => {
                //         set(state => {
                //             state.loading = false;
                //             state.user = defaultState;
                //         })
                //     })
            },
            logOut: () => {
                set({
                    user: undefined
                })
                sessionStorage.clear()
            }
        }),
        {
            name: "authStore",
            getStorage: () => sessionStorage
        }
    )))
);