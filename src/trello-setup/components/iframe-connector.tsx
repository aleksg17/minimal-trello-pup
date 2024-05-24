import { useEffect } from "react";
import type { Trello } from "../trello-types";

function IFrameConnector(props: {
  trelloCapabilities: Trello.PowerUp.CapabilityHandlers;
  appKey: string;
  appName: string;
}) {
  const { trelloCapabilities, appKey, appName } = props;
  useEffect(() => {
    console.log(trelloCapabilities, appKey, appName);
    window.TrelloPowerUp.initialize(trelloCapabilities, {
      appKey,
      appName,
    });
  }, [appKey, appName, trelloCapabilities]);

  return <div>IFrame connector loaded</div>;
}

export default IFrameConnector;
