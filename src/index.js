import React from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { CartContextProvider } from "./context/CartContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
