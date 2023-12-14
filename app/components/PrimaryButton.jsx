"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import styled, { keyframes } from "styled-components";

const { useToken } = theme;

const PrimaryButton = ({
  label,
  onClick,
  color,
  mode,
  elevate,
  flex,
  loading,
}) => {
  const { token } = useToken();
  return (
    <StyledButton
      type="primary"
      className={elevate && "mat-elevation-z3"}
      $color={color ? color : token.purple}
      onClick={onClick}
      $mode={mode}
      $flex={flex}
      $loading={loading}
      disabled={loading}
    >
      {loading ? (
        <LoadingOutlined style={{ fontSize: 25, color: "#5e17eb" }} />
      ) : (
        label
      )}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  ${(props) => {
    if (props.$loading === undefined || props.$loading === false) {
      return `background-color: ${
        props.$mode === "ghost" ? "white" : props.$color
      } !important;`;
    }
  }}
  color: ${(props) => {
    return props.$mode === "ghost" ? props.$color : "white";
  }} !important;
  border: ${(props) => {
    return props.$mode === "ghost" ? `1px solid ${props.$color}` : "0px";
  }} !important;
  height: 50px;

  ${(props) => {
    if (props.$flex) return `flex: ${props.$flex}`;
  }};
`;

export default PrimaryButton;
