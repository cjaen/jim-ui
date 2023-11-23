"use client";

import PrimaryButton from "@/app/components/PrimaryButton";
import { Button, Card, theme } from "antd";
import styled from "styled-components";

const Workout = () => {
  const { useToken } = theme;
  const { token } = useToken();
  return (
    <>
      <ScrollableContainer>
        <StyledCard
          title="Bench Press"
          headStyle={{ color: "#232323" }}
          bordered={false}
          className="mat-elevation-z3"
        >
          <Sets>
            <PrimaryButton
              label="Add Set"
              color={token.purple}
              mode="ghost"
            ></PrimaryButton>
          </Sets>
        </StyledCard>
      </ScrollableContainer>
      <PrimaryButton
        label="Add Exercise"
        onClick={() => {
          router.push("/logs/somethingRandom");
        }}
        elevate
      ></PrimaryButton>
      <PrimaryButton
        label="End Workout"
        onClick={() => {
          router.push("/logs/somethingRandom");
        }}
        elevate
      ></PrimaryButton>
    </>
  );
};

const ScrollableContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const StyledCard = styled(Card)`
  background: white;
  color: #232323;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Sets = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 60px;
`;

const AddButton = styled(Button)``;

export default Workout;
