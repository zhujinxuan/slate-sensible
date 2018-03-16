// @flow
import { type Value, type Range } from 'slate';
import { type GetMentions, type Mention } from './type';

function formatForMatcher(
    beforeFormat: RegExp,
    afterFormat: RegExp,
    cursorText: string
): string {
    return cursorText
        .replace(beforeFormat, '')
        .replace(afterFormat, '')
        .toLowerCase();
}

// edit-distance plugin for future development
// @return {Function: string=>Array(Object)}
function compileStringArrays<T: { name: string }>(
    beforeFormatMatcherRegex,
    afterFormatMatcherRegex,
    mentions: Array<T>
): string => Array<Mention<T>> {
    const formattedMentions: Array<Mention<T>> = mentions.map(mention => ({
        ...mention,
        text: formatForMatcher(
            beforeFormatMatcherRegex,
            afterFormatMatcherRegex,
            mention.name
        )
    }));
    return (text: string): Array<Mention<T>> =>
        formattedMentions.filter(
            mention => text === mention.text.slice(0, text.length)
        );
}

function compileMentions<T: { name: string }>(
    findMentionRange: Value => null | Range,
    beforeFormatMatcherRegex: RegExp,
    afterFormatMatcherRegex: RegExp,
    mentions: Array<T>
): GetMentions<T> {
    const getMentions = compileStringArrays(
        beforeFormatMatcherRegex,
        afterFormatMatcherRegex,
        mentions
    );
    return (value: Value) => {
        const range = findMentionRange(value);

        if (!range) {
            return {
                text: null,
                range: null,
                mentions: []
            };
        }

        const textNode = value.document.getDescendant(range.focusKey);

        const text = formatForMatcher(
            beforeFormatMatcherRegex,
            afterFormatMatcherRegex,
            textNode.text.substring(
                range.anchorOffset,
                value.selection.focusOffset
            )
        );
        return {
            text,
            range,
            mentions: getMentions(text)
        };
    };
}

export default compileMentions;
