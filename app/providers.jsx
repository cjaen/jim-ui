"use client";
import { Auth0Provider } from "@auth0/auth0-react";
import token from "./token";
import { ConfigProvider } from "antd";

export default function Providers({ children, router }) {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;

  const onRedirectCallback = (appState) => {
    router.push(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <ConfigProvider
        theme={{
          hashed: false,
          token: token,
        }}
      >
        {children}
      </ConfigProvider>
    </Auth0Provider>
  );
}
