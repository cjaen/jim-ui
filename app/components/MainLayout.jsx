"use client";

import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Grid,
  Image,
  Layout,
  Spin,
  theme,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LayoutMenu from "../LayoutMenu";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  AppstoreOutlined,
  ExperimentOutlined,
  LineChartOutlined,
  LoadingOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoreOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";

const { useToken } = theme;

const getItem = (label, key, icon, children, href) => {
  return {
    key,
    icon,
    children,
    label: <a href={href}>{label}</a>,
  };
};

const { useBreakpoint } = Grid;
const spinIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

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

const MainLayout = ({ children }) => {
  const { token } = useToken();
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");
  const route = ({ keyPath }) => {
    router.push(`/${keyPath.reverse().join("/")}`);
    setDrawerIsOpen(false);
  };
  const [collapsed, setCollapsed] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const { xs: isMobile } = useBreakpoint();
  const pfpItems = [
    getItem("Profile", "profile", <UserOutlined />),
    getItem("Settings", "settings", <SettingOutlined />),
    getItem(
      "Sign Out",
      "signOut",
      <LogoutOutlined />,
      null,
      "/api/auth/logout"
    ),
  ];

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
  return !isLoading && user ? (
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
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
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
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
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
          className="mat-elevation-z3"
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
              {!user.picture ? (
                <Avatar
                  src={
                    <Image
                      referrerPolicy="no-referrer"
                      src={user.picture}
                      alt="avatar"
                      preview={false}
                    />
                  }
                />
              ) : (
                <Avatar
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                  }}
                >
                  {user.name
                    .split(" ")
                    .map((name) => {
                      return name.substring(0, 1);
                    })
                    .join("")
                    .toUpperCase()}
                </Avatar>
              )}
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            top: "50px",
            backgroundColor: "#efefef",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
      <Spin indicator={spinIcon}> </Spin>
    </Layout>
  );
};

export default MainLayout;