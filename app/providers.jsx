"use client";
import token from "./token";
import { ConfigProvider } from "antd";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import SessionContext from "./contexts/SessionContext";
import { useState } from "react";

const Providers = ({ children }) => {
  const [activeLog, setActiveLog] = useState(null);
  const [sessionContextLoaded, setSessionContextLoaded] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        activeLog,
        setActiveLog,
        sessionContextLoaded,
        setSessionContextLoaded,
      }}
    >
      <UserProvider>
        <ConfigProvider
          theme={{
            hashed: false,
            token: token,
          }}
        >
          {children}
        </ConfigProvider>
      </UserProvider>
    </SessionContext.Provider>
  );
};

export default Providers;
