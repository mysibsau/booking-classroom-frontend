import create from "zustand";
import { immer } from "zustand/middleware/immer";
import axios, { AxiosError } from "axios";
import { IAuthStore } from "../types/auth";

const user = sessionStorage.getItem('authStore')
const foundUser = user ? JSON.parse(user).user : undefined

export const useAuthStore = create<IAuthStore>()(
    immer(
        (set, get) => ({
            loading: false,
            user: foundUser ? foundUser : undefined,
            error: undefined,
            setLogIn: (data) => {
                set({
                    user: data
                })
            },
            logIn: async (username, password) => {
                set({
                    error: undefined,
                    loading: true
                })
                await axios.post('/auth/', { username: username, password: password })
                    .then((responce) => {
                        const data = responce.data
                        set(state => {
                            state.user = data
                        })

                    })
                    .catch((e: AxiosError) => {
                        set({
                            error: "Неверный логин или пароль"
                        })
                    })
                    .finally(() => {
                        set({
                            loading: false
                        })
                    })
            },
            logOut: () => {
                set({
                    user: undefined
                })
                sessionStorage.clear()
            }
        })
    )
);