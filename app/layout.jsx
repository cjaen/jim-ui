"use client";
import { Avatar, Button, Dropdown, Layout, Menu, theme } from "antd";
import "./globals.css";
import { Inter } from "next/font/google";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  TeamOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  LineChartOutlined,
  ReconciliationOutlined,
  MoreOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import Providers from "./providers";
import token from "./token";
import styles from "./app.module.css";

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

const pfp =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");
  const route = ({ keyPath }) => {
    router.push(`/${keyPath.reverse().join("/")}`);
  };
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const result = pathname
      .split("/")
      .slice(-1)[0]
      .replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    setPageTitle(finalResult);
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title>MyGymmy</title>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={inter.className}>
        <Providers>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              style={{
                background: token.colorBgBase,
              }}
              collapsible
              collapsed={collapsed}
              trigger={null}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Menu
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  items={items}
                  onClick={route}
                  style={{ borderInlineEnd: "0px" }}
                />
                <Button
                  type="text"
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    flexDirection: "row",
                    justifyContent: "stretch",
                    flex: "1 1 auto",
                    padding: "15px 22px",
                  }}
                  className={styles.removeHoverHighlight}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: collapsed ? "start" : "end",
                      flexDirection: "row",
                      flex: "1 1 auto",
                    }}
                  >
                    {collapsed ? (
                      <RightOutlined
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          flex: "1 1 auto",
                        }}
                      />
                    ) : (
                      <LeftOutlined
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          flexDirection: "row",
                          flex: "1 1 auto",
                        }}
                      />
                    )}
                  </div>
                </Button>
              </div>
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
                  flexDirection: "row",
                  justifyContent: "space-between",
                  background: token.greenBase,
                }}
              >
                <h1>{pageTitle}</h1>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button type="text" shape="circle">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <MoreOutlined />
                    </div>
                  </Button>
                  <Dropdown menu={{ items }} placement="bottomRight">
                    {pfp ? (
                      <Avatar src={<img src={pfp} alt="avatar" />} />
                    ) : (
                      <Avatar
                        style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                      >
                        U
                      </Avatar>
                    )}
                  </Dropdown>
                </div>
              </Header>
              <Content style={{ top: "50px", backgroundColor: "#efefef" }}>
                {children}
              </Content>

              <Footer
                style={{ textAlign: "center", background: token.greenBase }}
              >
                JIM ©2023 Created by Christian and Kevin
              </Footer>
            </Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
