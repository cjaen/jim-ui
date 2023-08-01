"use client";
import token from "./token";
import { ConfigProvider } from "antd";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const Providers = ({ children }) => {
  return (
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
  );
};

export default Providers;
