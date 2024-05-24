import React, { useCallback, useEffect, useState } from "react";
import { ITrelloIframeConfig, useTrelloIframe } from "../hooks/useTrelloIframe";
import { Trello } from "../trello-types";

type ITrelloPowerupContextValue = {
  trelloIframe: Trello.PowerUp.IFrame;
  authorize(): Promise<void>;
  revokeAuth(): Promise<void>;
  myPowerupKey: string;
  appKey: string;
  appName: string;
}

interface ITrelloPowerupContextConfig extends ITrelloIframeConfig {
  children: React.ReactNode;
  myPowerupKey: string;
}

const TrelloPowerupContext = React.createContext<
  ITrelloPowerupContextValue | undefined
>(undefined);

function useTrelloPowerupContext() {
  const context = React.useContext(TrelloPowerupContext);
  if (!context) {
    throw Error(
      "useTrelloPowerupContext() should not be used outside of TrelloPowerupProvider",
    );
  }
  return context;
}

function TrelloPowerupProvider({
  appName,
  appKey,
  children,
  // powerUpKey,
  // localization
  myPowerupKey,
}: ITrelloPowerupContextConfig) {
  const trelloIframe = useTrelloIframe({ appName, appKey });
  const [token, setToken] = useState<string | undefined>();
  // const [state, setState] = React.useState<IState>("idle");
  // const [board, setBoard] = useState();

  useEffect(() => {
    (async () => {
      try {
        const [_isAuthorized] = await Promise.all([
          trelloIframe.getRestApi().isAuthorized(),
        ]);

        if (_isAuthorized) {
          const _token = await trelloIframe.getRestApi().getToken();
          setToken(_token);
        }
      } catch (e) {
        console.error("Error while initializing TrelloPowerupProvider");
        throw e;
      }
    })();
  }, [myPowerupKey, trelloIframe, token, appKey]);

  const authorize = useCallback(async () => {
    try {
      await trelloIframe
        .getRestApi()
        .authorize({ scope: "read,write,account" });
      const _token = await trelloIframe.getRestApi().getToken();
      setToken(_token);
    } catch (e) {
      console.error(e)
    } 
  }, [trelloIframe]);

  const revokeAuth = useCallback(async () => {
    try {
      await trelloIframe.getRestApi().clearToken();
      setToken(undefined);
    } catch (e) {
      console.error(e)
    }
  }, [trelloIframe]);

  const contextValue: ITrelloPowerupContextValue = {
    trelloIframe,
    // state,
    authorize,
    revokeAuth,
    myPowerupKey,
    appName,
    appKey,
  };

  return (
    <TrelloPowerupContext.Provider
      value={contextValue}
      children={children}
    ></TrelloPowerupContext.Provider>
  );
}

export { TrelloPowerupProvider, useTrelloPowerupContext };
