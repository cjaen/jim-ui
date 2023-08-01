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
import styled from "styled-components";
import LayoutMenu from "./LayoutMenu";

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
    <StyledMainLayout>
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
        <StyledSider
          collapsible
          collapsed={collapsed}
          trigger={null}
          background={token.colorBgBase}
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
        </StyledSider>
      )}
      <Layout>
        <StyledHeader className="mat-elevation-z3" background={token.greenBase}>
          <StyledHeaderContainer>
            {isMobile && (
              <Button
                type="text"
                shape="circle"
                onClick={() => {
                  setDrawerIsOpen(true);
                }}
              >
                <StyledMenuIconContainer>
                  <MenuOutlined />
                </StyledMenuIconContainer>
              </Button>
            )}

            <h1>{pageTitle}</h1>
          </StyledHeaderContainer>

          <StyledIconsContainer>
            <Button type="text" shape="circle">
              <StyledMoreIconContainer>
                <MoreOutlined />
              </StyledMoreIconContainer>
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
                <StyledAvatar>
                  {user.name
                    .split(" ")
                    .map((name) => {
                      return name.substring(0, 1);
                    })
                    .join("")
                    .toUpperCase()}
                </StyledAvatar>
              )}
            </Dropdown>
          </StyledIconsContainer>
        </StyledHeader>
        <StyledContent>{children}</StyledContent>

        <StyledFooter background={token.greenBase}>
          Gymmy ©2023 Created by Christian and Kevin
        </StyledFooter>
      </Layout>
    </StyledMainLayout>
  ) : (
    <Layout className="spin-container">
      <Spin indicator={<LoadingOutlined spin className="loading-outlined" />} />
    </Layout>
  );
};

const StyledMainLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledSider = styled(Sider)`
  background: ${(props) => {
    return props.background;
  }} !important;
`;

const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background: ${(props) => {
    return props.background;
  }} !important;
  padding: 15px;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledMenuIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledIconsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledMoreIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledAvatar = styled(Avatar)`
  background-color: #fde3cf;
  color: #f56a00;
`;

const StyledContent = styled(Content)`
  top: 50px;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
`;

const StyledFooter = styled(Footer)`
  text-align: "center";
  background: ${(props) => {
    return props.background;
  }} !important;
`;

export default MainLayout;
