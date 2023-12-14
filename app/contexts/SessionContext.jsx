import { createContext } from "react";

const SessionContext = createContext({
  activeLog: null,
  setActiveLog: () => {},
  sessionContextLoaded: false,
  setSessionContextLoaded: () => {},
});

export default SessionContext;
