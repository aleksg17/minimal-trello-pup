import { useLayoutEffect } from "react";
import { useTrelloPowerupContext } from "../contexts/trello-powerup-context";

interface IOptions {
  heading: string;
  headingStyle: React.CSSProperties;
  imageSrc: string;
  imageStyle: React.CSSProperties;
}

// const Container = styled.div`
//     background: ${tokens["elevation.surface"]};
//     text-align: center;
//     padding: ${tokens["space.200"]};
//     & > *:not(:first-child) {
//         margin-top: ${tokens["space.200"]}
//     }
// `

function Authorize({ heading, headingStyle, imageSrc, imageStyle }: IOptions) {
  const { authorize, appName, trelloIframe } =
    useTrelloPowerupContext();

  useLayoutEffect(() => {
    // trelloIframe.sizeTo("body");
    trelloIframe.sizeTo(216);
  }, [trelloIframe]);

  return (
    <div
    // rowGap={4}
    // display={"flex"}
    // flexDirection={"column"}
    // alignItems={"center"}
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
