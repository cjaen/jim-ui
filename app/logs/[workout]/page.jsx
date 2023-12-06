"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Card, Input, List, Skeleton, theme } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../../components/PrimaryButton";

const Workout = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const [page, setPage] = useState("sets");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(
    Array.from({ length: 8 }, () => {
      return { width: `${Math.floor(Math.random() * 4) + 2}0%` };
    })
  );
  const [loading, setLoading] = useState(true);

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

  const selectCategory = (category) => {
    setPage("exercises");
  };

  useEffect(() => {
    (async () => {
      const categories = await (await fetch("/api/exerciseCategories")).json();
      setCategories(categories);
      setFilteredCategories(categories);
      setLoading(false);
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
                    <StyledItem
                      $new={item.new}
                      onClick={() => selectCategory(item)}
                    >
                      {item._id || item.new ? (
                        <span>
                          {item.new && <PlusOutlined />} {item.name}
                        </span>
                      ) : (
                        <Skeleton
                          loading={loading}
                          active
                          paragraph={false}
                          title={item}
                        />
                      )}
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

  cursor: pointer;
  padding: 10px !important;
  border-radius: 3px;

  &:hover {
    color: #5e17eb;
    background: #f4f0fe;
  }
`;

export default Workout;
