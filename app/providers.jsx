"use client";
import token from "./token";
import { ConfigProvider } from "antd";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Providers({ children, userCallback }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    userCallback(user);
  }, [user, userCallback]);
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
}
