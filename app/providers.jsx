"use client";
import token from "./token";
import { ConfigProvider } from "antd";
export default function Providers({ children }) {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: token,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
