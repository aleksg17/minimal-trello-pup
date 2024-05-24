import { useState } from "react";
import { Trello } from "../trello-types";

export type ITrelloIframeConfig = Required<
  Pick<Trello.PowerUp.PluginOptions, "appKey" | "appName">
>;

export function useTrelloIframe(options: ITrelloIframeConfig) {
  const [iframe] = useState(window.TrelloPowerUp.iframe(options));
  return iframe;
}
