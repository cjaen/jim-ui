"use client";

import { Card, Divider } from "antd";
import PrimaryButton from "../components/PrimaryButton";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const workouts = ["Chest Day", "Back Day", "Leg Day", "Shoulder Day"];

const Logs = () => {
  const router = useRouter();

  const startWorkout = async () => {
    const response = await (await fetch("/api/logs/startWorkout")).json();
    router.push(`/logs/${response.id}`);
  };

  return (
    <>
      <StyledContentContainer>
        {workouts.map((workout, index) => (
          <StyledCard
            bordered={false}
            hoverable
            key={index}
            title={workout}
            headStyle={{ color: "#232323" }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </StyledCard>
        ))}
      </StyledContentContainer>
      <PrimaryButton
        label="Start Workout"
        onClick={startWorkout}
        elevate
      ></PrimaryButton>
    </>
  );
};

const StyledContentContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  overflow: auto;
`;

const StyledCard = styled(Card)`
  background: white;
  color: #232323;
`;

export default Logs;
