import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContextProvider from "./Context/AppContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
        <Toaster position="bottom-center" />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
