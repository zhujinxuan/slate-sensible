// @flow
import { Value, type Node, Range } from 'slate';
import { findMentionRangeAt } from './findMentionRange';
import { type Mention } from '../type';

function getExtendedRange<T>(
    mentions: Array<Mention<T>>,
    beforeMatchRegex: RegExp,
    afterMatchRegex: RegExp
) {
    const extendRange = (node: Node, range: Range): Range => {
        const { startKey, endKey } = range;
        let { startOffset, endOffset } = range;
        const startText = node.getDescendant(startKey);
        const endText = node.getDescendant(endKey);
        if (!startText || !endText) return range;
        const startRange = findMentionRangeAt(
            beforeMatchRegex,
            afterMatchRegex,
            startText,
            startOffset
        );
        if (startRange) {
            const matchingText = startText.text.substring(
                startRange.startOffset,
                startRange.endOffset
            );
            if (mentions.find(x => x.name === matchingText)) {
                startOffset = startRange.startOffset;
            }
        }
        const endRange = findMentionRangeAt(
            beforeMatchRegex,
            afterMatchRegex,
            endText,
            endOffset
        );
        if (endRange) {
            const matchingText = endText.text.substring(
                endRange.startOffset,
                endRange.endOffset
            );
            if (mentions.find(x => x.name === matchingText)) {
                endOffset = endRange.endOffset;
            }
        }

        if (range.startOffset === startOffset && range.endOffset === endOffset)
            return range;
        if (range.isBackward) range = range.flip();
        return range
            .moveAnchorTo(startKey, startOffset)
            .moveFocusTo(endKey, endOffset);
    };

    return (node: Value | Node, range: Range): Range => {
        if (Value.isValue(node)) return extendRange(node.document, range);
        return extendRange(node, range);
    };
}

export default getExtendedRange;
