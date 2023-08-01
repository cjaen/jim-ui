"use client";

import { Button, theme } from "antd";
import styled from "styled-components";

const { useToken } = theme;

const PrimaryButton = ({ label }) => {
  const { token } = useToken();
  return (
    <StyledButton
      type="primary"
      className="mat-elevation-z3"
      background={token.purple}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  background-color: ${(props) => {
    return props.background;
  }} !important;
`;

export default PrimaryButton;
