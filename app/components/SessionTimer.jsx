import { Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";

const pad = (number) => {
  return number.length === 1 ? `0${number}` : number;
};

const SessionTimer = ({ startTime }) => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const updateTime = setInterval(() => {
      const sElapsed = Math.floor(
        (new Date().getTime() - new Date(startTime).getTime()) / 1000
      );
      const seconds = sElapsed % 60;
      const mElapsed = Math.floor(sElapsed / 60);
      const minutes = mElapsed % 60;
      const hElapsed = Math.floor(mElapsed / 60);
      setTime(
        `${pad(hElapsed.toString())}:${pad(minutes.toString())}:${pad(
          seconds.toString()
        )}`
      );
    }, 1000);

    return () => clearInterval(updateTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return time ? (
    <Time>{time}</Time>
  ) : (
    <Skeleton active paragraph={false} title={{ width: 55 }} />
  );
};

const Time = styled.span`
  color: #13b38b;
  font-size: 24px;
`;

export default SessionTimer;
