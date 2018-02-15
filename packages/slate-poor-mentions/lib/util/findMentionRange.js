// @flow
import { type Value, Range } from 'slate';

// This function determines whether to trigger a mention popup
function findMentionRange(beforeMatchRegex: RegExp, afterMatchRegex: RegExp) {
    return (value: Value): Range | void => {
        if (!value.isFocused) return null;
        if (value.isExpanded) return null;
        const text = value.focusText;
        const key = value.focusKey;
        let focusOffset = value.focusOffset;
        const beforeString = text.text.substring(0, focusOffset);
        const afterString = text.text.substring(focusOffset);
        const beforeMatch = beforeString.match(beforeMatchRegex);
        if (beforeMatch === null) {
            return null;
        }
        const anchorOffset = beforeMatch.index;
        const afterMatch = afterString.match(afterMatchRegex);
        if (afterMatch) {
            focusOffset = afterMatch[0].length + focusOffset;
        }

        return Range.create({
            anchorKey: key,
            focusKey: key,
            anchorOffset,
            focusOffset
        });
    };
}

export default findMentionRange;
