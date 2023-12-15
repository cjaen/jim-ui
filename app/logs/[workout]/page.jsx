"use client";

import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Grid, Input, List, Skeleton, theme } from "antd";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../../components/PrimaryButton";
import CardTitle from "../../components/CardTitle";
import { useParams, useRouter } from "next/navigation";
import SessionContext from "../../contexts/SessionContext";
import SessionTimer from "../../components/SessionTimer";

const { useBreakpoint } = Grid;

const toTitleCase = (string) => {
  return string
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};

const Workout = () => {
  const { useToken } = theme;
  const router = useRouter();
  const params = useParams();
  const { token } = useToken();
  const { xs: isMobile } = useBreakpoint();
  const { activeLog, sessionContextLoaded, setActiveLog } =
    useContext(SessionContext);
  const [page, setPage] = useState("sets");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(
    Array.from({ length: 8 }, () => {
      return {
        width: `${Math.floor(Math.random() * 4) + 2}0%`,
        skeleton: true,
      };
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
      filteredCategories.push({ name: value, new: true });

    setFilteredCategories(filteredCategories);
  };

  const selectCategory = async (category) => {
    if (category.new) {
      await (
        await fetch("/api/exerciseCategories", {
          method: "POST",
          body: JSON.stringify({ name: toTitleCase(category.name) }),
        })
      ).json();
    }
    setPage("exercises");
  };

  const endWorkout = async () => {
    if (activeLog.exercises === undefined || activeLog.exercises.length === 0) {
      await fetch(`/api/logs/${activeLog._id}`, { method: "DELETE" });
    } else {
    }
    router.push("/logs");
    setActiveLog(null);
  };

  useEffect(() => {
    if (
      sessionContextLoaded &&
      (!activeLog || params.workout !== activeLog._id)
    ) {
      router.replace("/logs");
    }
  }, [params, activeLog, sessionContextLoaded, router]);

  useEffect(() => {
    if (page === "exerciseCategories") {
      (async () => {
        const categories = await (
          await fetch("/api/exerciseCategories")
        ).json();
        setCategories(categories);
        setFilteredCategories(categories);
        setLoading(false);
      })();
    }
  }, [page]);

  switch (page) {
    case "sets":
      return (
        <>
          <StyledCard
            title={
              <CardTitle
                title={
                  activeLog ? (
                    <SessionTimer startTime={activeLog.startTime} />
                  ) : (
                    <Skeleton active paragraph={false} title={{ width: 55 }} />
                  )
                }
                onBack={() => router.back()}
              />
            }
            headStyle={{ color: "#232323" }}
            bordered={false}
            className="mat-elevation-z3"
            bodyStyle={{ padding: 0 }}
          ></StyledCard>
          <ScrollableContainer>
            <StyledCard
              title={<CardTitle disableBack title="Bench Press" />}
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
          <ButtonContainer>
            <PrimaryButton
              label="Add Exercise"
              onClick={() => {
                setPage("exerciseCategories");
              }}
              elevate
              flex="1"
              loading={!sessionContextLoaded}
            ></PrimaryButton>
            <PrimaryButton
              label={<CloseCircleOutlined style={{ fontSize: 25 }} />}
              onClick={endWorkout}
              elevate
              flex="0 0 75px"
              color="#ff4d4f"
              loading={!sessionContextLoaded}
            ></PrimaryButton>
          </ButtonContainer>
        </>
      );
    case "exerciseCategories":
      return (
        <>
          <ScrollableCard
            title={
              <CardTitle
                title="Exercise Categories"
                onBack={() => {
                  setPage("sets");
                }}
              />
            }
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
              style={!loading ? { background: "white" } : {}}
              disabled={loading}
            />
            <ScrollableContainer>
              <List
                dataSource={filteredCategories}
                renderItem={(item) => {
                  return (
                    <StyledItem
                      $new={item.new}
                      onClick={() => {
                        if (!item.skeleton) selectCategory(item);
                      }}
                      $skeleton={item.skeleton}
                    >
                      {item._id || item.new ? (
                        <span>
                          {item.new && (
                            <span>
                              <PlusOutlined /> Add
                            </span>
                          )}{" "}
                          {item.name}
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const ScrollableContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const StyledCard = styled(Card)`
  background: white;
  color: #232323;
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
      return `
        color: #5e17eb !important;
      `;
    }
  }}

  padding: 10px !important;
  border-radius: 3px;

  ${(props) => {
    if (!props.$skeleton) {
      return `
        cursor: pointer;

        &:hover {
          color: #5e17eb;
          background: #f4f0fe;
        }
      `;
    }
  }}
`;

export default Workout;
