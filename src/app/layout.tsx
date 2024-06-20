"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../styles/globals.css";

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
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
