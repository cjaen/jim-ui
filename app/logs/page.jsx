"use client";

import PrimaryButton from "../components/PrimaryButton";
import styled from "styled-components";

const Logs = () => {
  return (
    <StyledMainContainer>
      <StyledContentContainer></StyledContentContainer>
      <PrimaryButton label="Start Workout"></PrimaryButton>
    </StyledMainContainer>
  );
};

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  padding: 10px;
  flex-grow: 1;
`;

const StyledContentContainer = styled.div`
  flex-grow: 1;
`;

export default Logs;
