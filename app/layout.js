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
      <head>
        <title>GYMMY</title>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={inter.className}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{ backgroundColor: "#5e17eb" }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
          ></Sider>
          <Layout>
            <Header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
              }}
            />
            <Content style={{ top: "50px", backgroundColor: "#efefef" }}>
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
