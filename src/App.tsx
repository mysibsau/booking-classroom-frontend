import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { NotificationContainer, useNotification } from "./components/UI";
import useCookie from "./hooks/useCookie";
import MainPage from "./pages/MainPage";
import MyProfilePage from "./pages/MyProfilePage";
import { useAuthStore } from "./stores";


function App() {
    const { user, setLogIn, error } = useAuthStore(state => state);
    const { addNotific } = useNotification()
    const { getCookie, setCookie } = useCookie()

    let logIn = getCookie("user") || user ? true : false;

    useEffect(() => {
        if (error) {
            addNotific({
                title: "Ошибка авторизации",
                body: error,
                type: "danger"
            })
        }
    }, [error])

    useEffect(() => {
        if (user) {
            setCookie("user", JSON.stringify(user))
        } else {
            const cookieUser = getCookie("user")
            if (cookieUser) {
                setLogIn(JSON.parse(cookieUser))
            }
        }
    }, [user])

    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    {logIn &&
                        <Route path="/my-profile" element={<MyProfilePage />} />
                    }
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
                <NotificationContainer />
            </>
        </BrowserRouter>
    );
}

export default App;
