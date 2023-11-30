"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Menu, theme } from "antd";
import styles from "../app.module.css";
import styled, { useTheme } from "styled-components";

const LayoutMenu = ({
  items,
  collapsed,
  route,
  setCollapsed,
  isMobile,
  selectedKeys,
  setSelectedKeys,
}) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <StyledMainContainer>
      <StyledMenu
        mode="inline"
        items={items}
        onClick={route}
        onSelect={({ selectedKeys }) => {
          setSelectedKeys(selectedKeys);
        }}
        selectedKeys={selectedKeys}
        $background={token.blue}
      />
      {!isMobile && (
        <StyledButton
          type="text"
          className={styles.removeHoverHighlight}
          onClick={() => setCollapsed(!collapsed)}
        >
          <StyledButtonContainer $collapsed={collapsed}>
            {collapsed ? <StyledRightOutlined /> : <StyledLeftOutlined />}
          </StyledButtonContainer>
        </StyledButton>
      )}
    </StyledMainContainer>
  );
};

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledMenu = styled(Menu)`
  border-inline-end: 0px !important;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${(props) => props.$background};
  color: white;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: stretch;
  flex-direction: row;
  justify-content: stretch;
  flex: 1 1 auto;
  padding: 15px 22px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.$collapsed ? "start" : "end")};
  flex-direction: row;
  flex: 1 1 auto;
`;

const StyledRightOutlined = styled(RightOutlined)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1 1 auto;
`;

const StyledLeftOutlined = styled(LeftOutlined)`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: row;
  flex: 1 1 auto;
`;

export default LayoutMenu;
