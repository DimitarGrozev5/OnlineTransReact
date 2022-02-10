import React from "react";

import "./App.css";
import MobilePortraitApp from "./app-layouts/MobilePortraitApp";
import useWindowSize from "./hooks/use-window-size";
import { useDispatch, useSelector } from "react-redux";
import PopUpMessage from "./components/common/Message/PopUpMessage";
import { messagesActions } from "./store/messages";
import addMessageThunk from "./store/thunks-messages/add-message";
import confirmMessageThunk from "./store/thunks-messages/confirm-message";
import DesktopLandscapeApp from "./app-layouts/DesktopLandscapeApp";

function App() {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const windowSize = useWindowSize();

  //Mobile portrait app
  let content = <MobilePortraitApp />;
  if (windowSize.isDesktop) {
    content = <DesktopLandscapeApp />;
  }

  // Setup messages
  const messages = useSelector((state) => [...state.messages.messages]);
  const currentMessage = messages.length ? messages.shift() : null;
  const confirmMessageHandler = () => {
    dispatch(confirmMessageThunk());
  };

  // Get geolocation confirmation
  // const askedForGeolocationPermission = useSelector(
  //   (state) => state.messages.askedForGeolocationPermission
  // );
  // useState(() => {
  //   if ("geolocation" in navigator && "permissions" in navigator) {
  //     navigator.permissions.query({ name: "geolocation" }).then((result) => {
  //       console.log(result.state === "prompt");
  //       console.log(!askedForGeolocationPermission)
  //       if (result.state === "prompt" && !askedForGeolocationPermission) {
  //         dispatch(messagesActions.askedForGeolocationPermission());
  //         dispatch(
  //           addMessageThunk(
  //             "Приложението ще работи по-интелигентно, ако има достъп до локацията Ви. Данните за локацията не се записват и съхраняват никъде.",
  //             () => {
  //               navigator.geolocation.getCurrentPosition(() => {});
  //             }
  //           )
  //         );
  //       }
  //     });
  //   }
  // }, []);

  return (
    <React.Fragment>
      {currentMessage && (
        <PopUpMessage
          content={currentMessage}
          confirm={confirmMessageHandler}
        />
      )}
      {content}
    </React.Fragment>
  );
}

export default App;
