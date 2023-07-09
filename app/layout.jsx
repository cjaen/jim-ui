"use client";
import { Avatar, Button, Drawer, Dropdown, Grid, Layout, theme } from "antd";
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
  MenuOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import Providers from "./providers";
import token from "./token";
import styles from "./app.module.css";
import Menu from "./LayoutMenu";
import LayoutMenu from "./LayoutMenu";

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
const { useBreakpoint } = Grid;
const pfp =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");
  const route = ({ keyPath }) => {
    router.push(`/${keyPath.reverse().join("/")}`);
    setDrawerIsOpen(false);
  };
  const [collapsed, setCollapsed] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { xs: isMobile } = useBreakpoint();

  useEffect(() => {
    const result = pathname
      .split("/")
      .slice(-1)[0]
      .replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    setPageTitle(finalResult);
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) {
      setDrawerIsOpen(false);
    }
  }, [isMobile]);

  return (
    <html lang="en">
      <head>
        <title>Gymmy</title>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={inter.className}>
        <Providers>
          <Layout style={{ minHeight: "100vh" }}>
            <Drawer
              placement={"left"}
              closable={true}
              open={drawerIsOpen}
              width="100%"
              onClose={() => {
                setDrawerIsOpen(false);
              }}
            >
              <LayoutMenu
                collapsed={collapsed}
                route={route}
                items={items}
                setCollapsed={setCollapsed}
                isMobile={isMobile}
              ></LayoutMenu>
            </Drawer>
            {!isMobile && (
              <Sider
                style={{
                  background: token.colorBgBase,
                }}
                collapsible
                collapsed={collapsed}
                trigger={null}
              >
                <LayoutMenu
                  collapsed={collapsed}
                  route={route}
                  items={items}
                  setCollapsed={setCollapsed}
                  isMobile={isMobile}
                ></LayoutMenu>
              </Sider>
            )}
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
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {isMobile && (
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => {
                        setDrawerIsOpen(true);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <MenuOutlined />
                      </div>
                    </Button>
                  )}

                  <h1>{pageTitle}</h1>
                </div>

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
                Gymmy ©2023 Created by Christian and Kevin
              </Footer>
            </Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
