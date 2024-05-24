import { Trello } from "./trello-types";

interface ICapabilityConfig {
  appName: string;
  boardButtons?: {
    iconDarkUrl: string;
    iconLightUrl: string;
  };
}

export const capabilities = (
  options: ICapabilityConfig,
): Trello.PowerUp.CapabilityHandlers => ({
  "board-buttons": async (t) => {
    const isAuthorized = await t.getRestApi().isAuthorized();

    if (!isAuthorized) {
      return [
        {
          text: `Authorize ${options.appName}`,
          icon: {
            dark: import.meta.env.VITE_BASE_URL + "/test_icon.svg",
            light: import.meta.env.VITE_BASE_URL + "/test_icon.svg",
          },
          //   callback: async () => {
          //     const signed = t.isMemberSignedIn();
          //     const jwt = await t.jwt({
          //       state: JSON.stringify({ hello: "world" }),
          //     });
          //     console.log("board-buttons", signed, jwt);
          //   },
          callback: async (x) => {
            x.popup({
              title: `Authorize ${options.appName}`,
              url: `/authorize`,
              height: 240,
            });
          },
        },
      ];
    }

    return [
      {
        text: options.appName,
        icon: {
          dark: import.meta.env.VITE_BASE_URL + "/test_icon.svg",
          light: import.meta.env.VITE_BASE_URL + "/test_icon.svg",
        },
        callback: async (x) => {
          const signed = t.isMemberSignedIn();
          const jwt = await t.jwt({
            state: JSON.stringify({ hello: "world" }),
          });
          console.log("board-buttons", signed, jwt);
          x.modal({
            title: `Authorized!`,
            url: `/authorized`,
            fullscreen: true,
          });
        },
      },
    ];
  },
});
