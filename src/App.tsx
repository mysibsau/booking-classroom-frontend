import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path="/" element={<p>History page</p>} />
                    <Route path="/my-profile" element={<p>Settings page</p>} />
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
