"use client";

const { createContext, useState } = require("react");

const userContext = createContext({});
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [setContextUser, setSetContextUser] = useState(() => {}, []);
  return <userContext.Provider>{children}</userContext.Provider>;
};
