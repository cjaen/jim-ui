"use client";

import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../components/PrimaryButton";
import { Button, Card, Input, List, theme } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Workout = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const [page, setPage] = useState("exerciseCategories");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const onChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    let exactHit = false;

    const filteredCategories = categories.filter((category) => {
      const name = category.name.toLowerCase();
      if (value === name) exactHit = true;

      if (!value) return true;

      return name.includes(value);
    });

    if (!exactHit && value !== "")
      filteredCategories.push({ name: `Add ${value}`, new: true });

    setFilteredCategories(filteredCategories);
  };

  useEffect(() => {
    (async () => {
      const categories = await (await fetch("/api/exerciseCategories")).json();
      setCategories(categories);
      setFilteredCategories(categories);
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
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 1,
              overflow: "hidden",
            }}
          >
            <Input
              placeholder="Exercise category..."
              allowClear
              onChange={onChange}
              style={{ background: "white" }}
            />
            <ScrollableContainer>
              <List
                dataSource={filteredCategories}
                renderItem={(item) => {
                  return (
                    <StyledItem $new={item.new}>
                      {item.new && <PlusOutlined />} {item.name}
                    </StyledItem>
                  );
                }}
              />
            </ScrollableContainer>
          </ScrollableCard>
        </>
      );
  }
};

const ScrollableContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const StyledCard = styled(Card)`
  background: white;
  color: #232323;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
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

const StyledItem = styled(List.Item)`
  ${(props) => {
    if (props.$new) {
      return "color: #5e17eb !important;";
    }
  }}
`;

export default Workout;
