"use client";
import { Layout, Menu } from "antd";
import "./globals.css";
import { Inter } from "next/font/google";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  TeamOutlined,
  SettingOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  LineChartOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const inter = Inter({ subsets: ["latin"] });
const items = [
  getItem("Dashboard", "dashboard", <AppstoreOutlined />),
  getItem("Social", "social", <TeamOutlined />),
  getItem("Charts", "charts", <LineChartOutlined />),
  getItem("AI", "ai", <ExperimentOutlined />, [
    getItem("Workout Plans", "workoutPlans"),
    getItem("Projections", "projections"),
    getItem("Readiness", "readiness"),
    getItem("Nutrition", "nutrition"),
  ]),
  getItem("Logs", "logs", <ReconciliationOutlined />),
];

export default function RootLayout({ children }) {
  const router = useRouter();
  const route = ({ key }) => {
    console.log(key);
    router.push(key);
  };
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
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
              onClick={route}
            />
          </Sider>
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
