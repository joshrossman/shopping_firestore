import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = {
  children: any;
};

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const domain = "dev-yrodh3rkzjlq1z0x.us.auth0.com";
  const clientId = "KzZauvl2qJnohIpbTWA8C92udLWZhdWS" ;
  const redirectUri = "http://localhost:5173/callback"; // make sure the port matches your server


  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  
  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      //defines what information is requested from Auth0 during the authentication process.
      authorizationParams={{
        redirect_uri: redirectUri,
        //specifies which user data the app wants. In this case, three pieces of use data.
        scope: "openid profile email",
      }}
      //Where t oredirect to after successful login
      onRedirectCallback={onRedirectCallback}
      //tells app to store in local storage throughout sessoin, so stays logged in after a refresh, for example.
      cacheLocation="localstorage"
    >
        
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;