import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { NotificationContainer } from "./components/UI";
import MainPage from "./pages/MainPage";
import MyProfilePage from "./pages/MyProfilePage";
import { useAuthStore } from "./stores";


function App() {

    const { user } = useAuthStore(state => state)

    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    {user &&
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
