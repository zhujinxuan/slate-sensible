import createMentionBundle from "./components/createMentionBundle.js";
import createOnKeyDown from "./createOnKeyDown.js";
import compileMentions from "./compileMentions.js";
import findInsertRange from "./util/findInsertRange.js";

function createMentionPlugin({ mentions }) {
  const getMentions = compileMentions(mentions);
  const { MentionMenu, updater } = createMentionBundle(getMentions);
  return {
    onKeyDown: createOnKeyDown(updater),
    portals: { MentionMenu },
    utils: { findInsertRange }
  };
}

export default createMentionPlugin;
