"use client";

import PrimaryButton from "../components/PrimaryButton";

const Logs = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch",
        padding: "10px",
        flexGrow: "1",
      }}
    >
      <div style={{ flexGrow: 1 }}></div>
      <PrimaryButton label="Start Workout"></PrimaryButton>
    </div>
  );
};

export default Logs;
