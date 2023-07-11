"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function RootTemplate({ children }) {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "/dashboard",
        },
      });
    };

    if (!isLoading && !isAuthenticated) {
      handleLogin();
    } else if (!isLoading && isAuthenticated) {
      console.log(user);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, user]);
  return children;
}
