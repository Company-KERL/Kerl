import React from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
