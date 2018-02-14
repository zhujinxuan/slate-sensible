import findInsertRange from "./util/findInsertRange.js";

function formatForMatcher(cursorText) {
  return cursorText
    .replace(/^ *{ *\$ */, "")
    .replace(/ *} *$/, "")
    .toLowerCase();
}

// edit-distance plugin for future development
// Meow~
// @param {Array(Object)} mentions
// @param {String} mentions[index].name
// @return {Function: string=>Array(Object)}
function compileStringArrays(mentions) {
  const formattedMentions = mentions.map(mention => {
    return {
      ...mention,
      text: formatForMatcher(mention.name)
    };
  });
  return text => {
    return formattedMentions.filter(mention => {
      for (let index = 0; index < text.length; index++) {
        if (mention.text.charAt(index) !== text.charAt(index)) {
          return false;
        }
      }
      return true;
    });
  };
}

function compileMentions(mentions) {
  const mentionsStringArray = mentions.filter(
    mention => typeof mention.name === "string"
  );
  // Only compile mentions type formatted with
  // @param {Array(Object)} mentions
  // @param {String} mentions[index].name
  const getMentions = compileStringArrays(mentionsStringArray);
  return value => {
    const rangeJSON = findInsertRange(value);

    if (!rangeJSON) {
      return {
        text: null,
        rangeJSON: null,
        mentions: []
      };
    }

    const textNode = value.document.getDescendant(rangeJSON.focusKey);

    const text = formatForMatcher(
      textNode.text.substring(
        rangeJSON.anchorOffset,
        value.selection.focusOffset
      )
    );
    return {
      text,
      rangeJSON,
      mentions: getMentions(text)
    };
  };
}

export default compileMentions;
