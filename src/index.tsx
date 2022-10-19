import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_API_HEROCU_URL;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <App />
);
