import React, { useEffect } from "react";

import "./App.css";
import MobilePortraitApp from "./app-layouts/MobilePortraitApp";
import useWindowSize from "./hooks/use-window-size";
import { useDispatch, useSelector } from "react-redux";
import PopUpMessage from "./components/common/Message/PopUpMessage";
import addMessageThunk from "./store/thunks-messages/add-message";
import confirmMessageThunk from "./store/thunks-messages/confirm-message";
import DesktopLandscapeApp from "./app-layouts/DesktopLandscapeApp";
import cancelMessageThunk from "./store/thunks-messages/cancel-message";

function App() {
  const dispatch = useDispatch();

  // Hook that watches for window size changes
  const windowSize = useWindowSize();

  // Mobile portrait layout
  let content = <MobilePortraitApp />;

  // Desktop landscape layout
  if (windowSize.isDesktop) {
    content = <DesktopLandscapeApp />;
  }

  // Setup messages pop-up
  const messages = useSelector((state) => [...state.messages.messages]);
  const currentMessage = messages.length ? messages.shift() : null;
  const confirmMessageHandler = () => {
    dispatch(confirmMessageThunk());
  };
  const cancelMessageHandler = () => {
    dispatch(cancelMessageThunk());
  };

  // Ask for cookie approval
  useEffect(() => {
    const saveCookiePreference = () => {
      localStorage.setItem("Cookie confirmed", "confirmed");
    };

    if (localStorage.getItem("Cookie confirmed") !== "confirmed") {
      // If the cookie confirmation is not set, dispatch a prompt
      dispatch(
        addMessageThunk({
          msg: "Този сайт използва курабийки, за да запазва потребителски настройки",
          action: saveCookiePreference,
          cancelable: true,
        })
      );
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      {currentMessage && (
        <PopUpMessage
          content={currentMessage}
          confirm={confirmMessageHandler}
          cancel={cancelMessageHandler}
        />
      )}
      {content}
    </React.Fragment>
  );
}

export default App;
