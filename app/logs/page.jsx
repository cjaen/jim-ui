"use client";

import { Card } from "antd";
import PrimaryButton from "../components/PrimaryButton";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import SessionContext from "../contexts/SessionContext";

const workouts = ["Chest Day", "Back Day", "Leg Day", "Shoulder Day"];

const Logs = () => {
  const router = useRouter();
  const [nextPage, setNextPage] = useState(null);

  const { activeLog, setActiveLog, sessionContextLoaded } =
    useContext(SessionContext);

  const startWorkout = async () => {
    if (activeLog) {
      setNextPage("continue");
      router.push(`/logs/${activeLog._id}`);
    } else {
      setNextPage("start");
      const response = await (await fetch("/api/logs/startWorkout")).json();
      router.push(`/logs/${response._id}`);
      setActiveLog(response);
    }
  };

  const endWorkout = async () => {
    if (activeLog.exercises === undefined || activeLog.exercises.length === 0) {
      await fetch(`/api/logs/${activeLog._id}`, { method: "DELETE" });
    } else {
    }
    router.push("/logs");
    setActiveLog(null);
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
      <ButtonContainer>
        <PrimaryButton
          label={activeLog ? "Continue Workout" : "Start Workout"}
          onClick={startWorkout}
          elevate
          flex="1"
          loading={!sessionContextLoaded || nextPage !== null}
        ></PrimaryButton>
        {activeLog && (!activeLog || nextPage !== "start") && (
          <PrimaryButton
            label={<CloseCircleOutlined style={{ fontSize: 25 }} />}
            onClick={endWorkout}
            elevate
            flex="0 0 75px"
            color="#ff4d4f"
            loading={nextPage !== null}
          ></PrimaryButton>
        )}
      </ButtonContainer>
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

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
