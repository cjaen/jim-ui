"use client";

import { Button, theme } from "antd";
import styled, { keyframes } from "styled-components";

const { useToken } = theme;

const PrimaryButton = ({ label, onClick, color, mode, elevate }) => {
  const { token } = useToken();
  return (
    <StyledButton
      type="primary"
      className={elevate && "mat-elevation-z3"}
      $color={color ? color : token.purple}
      onClick={onClick}
      $mode={mode}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  background-color: ${(props) => {
    return props.$mode === "ghost" ? "white" : props.$color;
  }} !important;
  color: ${(props) => {
    return props.$mode === "ghost" ? props.$color : "white";
  }} !important;
  border: ${(props) => {
    return props.$mode === "ghost" ? `1px solid ${props.$color}` : "0px";
  }} !important;
  height: 50px;
`;

export default PrimaryButton;
