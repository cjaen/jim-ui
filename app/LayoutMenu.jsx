"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import styles from "./app.module.css";
import { useState } from "react";

export default function LayoutMenu({
  items,
  collapsed,
  route,
  setCollapsed,
  isMobile,
  selectedKeys,
  setSelectedKeys,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Menu
        mode="inline"
        items={items}
        onClick={route}
        style={{ borderInlineEnd: "0px" }}
        onSelect={({ selectedKeys }) => {
          setSelectedKeys(selectedKeys);
        }}
        selectedKeys={selectedKeys}
      />
      {!isMobile && (
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
      )}
    </div>
  );
}
