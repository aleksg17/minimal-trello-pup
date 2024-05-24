import { useLayoutEffect } from "react";
import { useTrelloPowerupContext } from "../trello-setup/contexts/trello-powerup-context";

interface IOptions {
  heading: string;
  headingStyle: React.CSSProperties;
  imageSrc: string;
  imageStyle: React.CSSProperties;
}

function Authorize({ heading, headingStyle, imageSrc, imageStyle }: IOptions) {
  const { authorize, appName, trelloIframe } =
    useTrelloPowerupContext();

  useLayoutEffect(() => {
    trelloIframe.sizeTo("body");
  }, [trelloIframe]);

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: "216px",
      height: "216px",
    }}
    >
      <h1 style={headingStyle}>{heading}</h1>
      <img src={imageSrc} style={imageStyle} />
      <p>Please authorize to continue.</p>
      <button onClick={authorize}>
        <span>
          Authorize <b>{appName}</b>
        </span>
      </button>
    </div>
  );
}

export default Authorize;
