import isHotkey from "is-hotkey";
// import { Range } from "slate";

function createOnKeyDown(updater) {
  return (event, change) => {
    if (!updater.isActive()) {
      return null;
    }
    if (isHotkey("down", event)) {
      event.preventDefault();
      updater.next();
      return true;
    }
    if (isHotkey("up", event)) {
      event.preventDefault();
      updater.previous();
      return true;
    }
    if (isHotkey("enter", event)) {
      const changeHOF = updater.changeHOF();
      if (!changeHOF) {
        return null;
      }
      event.preventDefault();
      changeHOF(change);
      return true;
    }
    return null;
  };
}
export default createOnKeyDown;
