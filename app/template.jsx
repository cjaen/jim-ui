"use client";

import "./globals.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Drawer, Dropdown, Grid, Layout, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LayoutMenu from "./LayoutMenu";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  AppstoreOutlined,
  ExperimentOutlined,
  LineChartOutlined,
  LoadingOutlined,
  MenuOutlined,
  MoreOutlined,
  ReconciliationOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import token from "./token";

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const menuItems = [
  getItem("Dashboard", "dashboard", <AppstoreOutlined />),
  getItem("Logs", "logs", <ReconciliationOutlined />),
  getItem("AI", "ai", <ExperimentOutlined />, [
    getItem("Workout Plans", "workoutPlans"),
    getItem("Projections", "projections"),
    getItem("Readiness", "readiness"),
    getItem("Nutrition", "nutrition"),
  ]),
  getItem("Charts", "charts", <LineChartOutlined />),
  getItem("Social", "social", <TeamOutlined />),
];

const pfpItems = [
  getItem("Profile", "profile", <ReconciliationOutlined />),
  getItem("Settings", "settings", <AppstoreOutlined />),
  getItem("Sign Out", "signOut", <TeamOutlined />),
];

const { useBreakpoint } = Grid;
const spinIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

export default function RootTemplate({ children }) {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
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

  useEffect(() => {
    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "/dashboard",
        },
      });
    };

    if (!isLoading && !isAuthenticated) {
      handleLogin();
    } else if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
      console.log(user);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, user, router]);

  return !(isAuthenticated && !isLoading) ? (
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
          items={menuItems}
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
            items={menuItems}
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
            <Dropdown menu={{ items: pfpItems }} placement="bottomRight">
              {user && user.picture ? (
                <Avatar src={<img src={user.picture} alt="avatar" />} />
              ) : (
                <Avatar
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                  }}
                >
                  {user?.given_name.substring(0, 1)}
                </Avatar>
              )}
            </Dropdown>
          </div>
        </Header>
        <Content style={{ top: "50px", backgroundColor: "#efefef" }}>
          {children}
        </Content>

        <Footer style={{ textAlign: "center", background: token.greenBase }}>
          Gymmy ©2023 Created by Christian and Kevin
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <Layout
      style={{
        minHeight: "100vh",
        background: token.offWhite,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin indicator={spinIcon} />
    </Layout>
  );
}
