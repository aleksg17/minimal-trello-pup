import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { capabilities } from './trello-setup/capabilities';
import IFrameConnector from './trello-setup/components/iframe-connector';
import { TrelloPowerupProvider } from './trello-setup/contexts/trello-powerup-context';
import Authorize from './trello-setup/components/authorize';
import MainModal from './screens/main-modal';

function TrelloWrapper({ children }: { children: React.ReactElement }) {
  return (
    <TrelloPowerupProvider
      appKey={import.meta.env.VITE_TRELLO_API_KEY}
      appName={import.meta.env.VITE_TRELLO_APP_NAME}
      myPowerupKey="TestPUP"
    >
      {children}
    </TrelloPowerupProvider>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route
        path="/iframeConnector"
        element={
          <IFrameConnector
            appKey={import.meta.env.VITE_TRELLO_API_KEY}
            appName={import.meta.env.VITE_TRELLO_APP_NAME}
            trelloCapabilities={capabilities({
              appName: import.meta.env.VITE_TRELLO_APP_NAME,
              boardButtons: {
                iconDarkUrl: import.meta.env.VITE_BASE_URL + "/test_icon.svg",
                iconLightUrl: import.meta.env.VITE_BASE_URL + "/test_icon.svg",
              },
            })}
          />
        }
      ></Route>,
      <Route
        path="/authorize"
        element={
          <TrelloWrapper>
                <Authorize
      heading="Test PowerUp"
      headingStyle={{
        fontSize: "16px",
      }}
      imageSrc={import.meta.env.VITE_BASE_URL + "/test_icon.svg"}
      imageStyle={{
        maxWidth: "80px",
        maxHeight: "80px",
      }}
    />
          </TrelloWrapper>
        }
      ></Route>,
      <Route
        path="/authorized"
        element={
          <TrelloWrapper>
            <MainModal />
          </TrelloWrapper>
        }
      ></Route>,
      <Route path="/" element={<p>Hello World!</p>}></Route>,
    ]),
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
