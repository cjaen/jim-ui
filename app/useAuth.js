const { useState } = require("react");

export default function useAuth() {
  const [auth, setAuth] = useState();

  return {
    auth: { ...auth, isAuthenticated: false, isLoading: true },
    setAuth,
  };
}
