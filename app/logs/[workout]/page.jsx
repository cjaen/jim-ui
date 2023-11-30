"use client";

import PrimaryButton from "@/app/components/PrimaryButton";
import { Button, Card, theme } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Workout = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const [page, setPage] = useState("exerciseCategories");

  const onSearch = (value, _e, info) => console.log(info.source, value);

  useEffect(() => {
    (async () => {
      const categories = await (await fetch("/api/exerciseCategories")).json();
      console.log(categories);
    })();
  }, []);

  switch (page) {
    case "sets":
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
              setPage("exerciseCategories");
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
    case "exerciseCategories":
      return (
        <>
          <ScrollableCard
            title="Exercise Categories"
            headStyle={{ color: "#232323" }}
            bordered={false}
            className="mat-elevation-z3"
          >
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ background: "white" }}
            />
            <ScrollableContainer></ScrollableContainer>
          </ScrollableCard>
        </>
      );
  }
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

const ScrollableCard = styled(StyledCard)`
  flex: 1;
`;

export default Workout;
