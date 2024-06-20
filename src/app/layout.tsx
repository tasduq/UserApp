"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

interface IRootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>User List App</title>
      </head>
      <body>
        <ToastContainer />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
