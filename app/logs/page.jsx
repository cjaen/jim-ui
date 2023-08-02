"use client";

import { Card, Divider } from "antd";
import PrimaryButton from "../components/PrimaryButton";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const workouts = ["Chest Day", "Back Day", "Leg Day", "Shoulder Day"];

const Logs = () => {
  const router = useRouter();

  return (
    <>
      <StyledContentContainer>
        {workouts.map((workout, index) => (
          <StyledCard
            bordered={false}
            hoverable
            key={index}
            title={workout}
            className="mat-elevation-z3"
            headStyle={{ color: "#232323" }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </StyledCard>
        ))}
      </StyledContentContainer>
      <Divider></Divider>
      <PrimaryButton
        label="Start Workout"
        onClick={() => {
          router.push("/logs/somethingRandom");
        }}
      ></PrimaryButton>
    </>
  );
};

const StyledContentContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  overflow: auto;
  height: 1px;

  @media only screen and (min-width: 576px) {
    --gap: 10px;
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
    width: calc(100% + var(--gap));
    gap: 0px;
  }
`;

const StyledCard = styled(Card)`
  margin: var(--gap) 0 0 var(--gap);
  width: 100%;
  background: white;
  color: #232323;

  @media only screen and (min-width: 576px) {
    width: calc(50% - 10px);
  }
`;

export default Logs;
