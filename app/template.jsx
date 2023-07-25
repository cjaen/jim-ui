"use client";

import { useEffect } from "react";
import useAuth from "./useAuth";
import { useAuth0 } from "@auth0/auth0-react";

export default function RootTemplate({ children }) {
  const auth0 = useAuth0();
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth(auth0);
  }, [setAuth, auth0]);

  return children;
}
