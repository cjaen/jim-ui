"use client";

import { Button, theme } from "antd";

const { useToken } = theme;

const PrimaryButton = ({ label, style }) => {
  const { token } = useToken();
  return (
    <Button
      type="primary"
      style={{ backgroundColor: token.purple, ...style }}
      className="mat-elevation-z3"
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
