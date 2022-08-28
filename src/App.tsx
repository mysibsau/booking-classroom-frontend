import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Input } from "./components/UI";
import MainPage from "./pages/MainPage";
import MyProfilePage from "./pages/MyProfilePage";


function App() {

    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/my-profile" element={<MyProfilePage />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </>
        </BrowserRouter>
    );
}

export default App;
