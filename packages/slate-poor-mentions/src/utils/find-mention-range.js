// @flow
import { type Value, Range, type Text } from 'slate';

// This function determines whether to trigger a mention popup
function findMentionRange(beforeMatchRegex: RegExp, afterMatchRegex: RegExp) {
    return (value: Value): Range | void => {
        if (!value.isFocused) return null;
        if (value.isExpanded) return null;
        return findMentionRangeAt(
            beforeMatchRegex,
            afterMatchRegex,
            value.focusText,
            value.focusOffset
        );
    };
}

function findMentionRangeAt(
    beforeMatchRegex: RegExp,
    afterMatchRegex: RegExp,
    text: Text,
    offset: Number
): Range | void {
    const beforeString = text.text.substring(0, offset);
    const afterString = text.text.substring(offset);
    const beforeMatch = beforeString.match(beforeMatchRegex);
    if (beforeMatch === null) {
        return null;
    }
    const anchorOffset = beforeMatch.index;
    let focusOffset = offset;
    const afterMatch = afterString.match(afterMatchRegex);
    if (afterMatch) {
        focusOffset = afterMatch[0].length + focusOffset;
    }

    return Range.create({
        anchorKey: text.key,
        focusKey: text.key,
        anchorOffset,
        focusOffset
    });
}

export default findMentionRange;
export { findMentionRangeAt };
