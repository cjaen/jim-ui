"use client";
import { Layout } from "antd";
import "./globals.css";
import { Inter } from "next/font/google";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Content, Footer, Header } from "antd/es/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{ backgroundColor: "black" }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          ></Sider>
          <Layout style={{ backgroundColor: "white" }}>
            <Header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: "gray",
              }}
            />
            <Content style={{ top: "50px", backgroundColor: "red" }}>
              {children}
            </Content>

            <Footer style={{ textAlign: "center" }}>
              JIM ©2023 Created by Christian and Kevin
            </Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
