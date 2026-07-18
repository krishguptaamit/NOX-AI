import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 2500,
    style: {
      background: "#14101D",
      color: "#fff",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: "16px",
    },
  }}
/>
  </React.StrictMode>
);