import React from "react";
import MentionMenuContainer from "./MentionMenuContainer.js";

function createMentionBundle(getMentions) {
  const updater = {};
  return {
    MentionMenu: props => {
      const { value, submitChange } = props;
      return (
        <MentionMenuContainer
          {...{ updater, value, submitChange, getMentions }}
        />
      );
    },
    updater
  };
}
export default createMentionBundle;
